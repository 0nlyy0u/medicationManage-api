import { AuthModel } from '*/models/user.model'
const bcrypt = require('bcryptjs')
import { v4 as uuidv4 } from 'uuid'
import { pick } from 'lodash'
import { SendInBlueProvider } from '*/providers/sendInBlueProvider.js'
const jwt = require('jsonwebtoken')
import { env } from '*/config/environtment'
import { WebsiteDomain } from '*/utilities/constants'
import { pickUser } from '../utilities/transform'
import { JwtProvider } from '*/providers/JwtProvider'
import { CloudinaryProvider } from '../providers/CoudinaryProvider'
import { RedisQueueProvider } from '../providers/redisQueueProvider'


const register = async (data) => {
    try {
        const existUser = await AuthModel.findOneByEmail(data.email)
        if (existUser) {
            throw new Error('Email already exists')
        }
        //const nameFromEmail = data.email.split('@')[0] || ''
        const newData = {
            email: data.email,
            userName: data.userName,
            password: await bcrypt.hashSync(data.password, 10),
            displayName: data.userName,
            verifyToken: uuidv4()
        }
        // transaction mongodb
        const createdUser = await AuthModel.register(newData)
        const getUser = await AuthModel.findOneById(createdUser.insertedId.toString())

        //Gửi email xác thực người dùng
        // const verifyLocationLink = `${WebsiteDomain}/verify?email=${getUser.email}&verifyToken=${getUser.verifyToken}`
        // await SendInBlueProvider.sendEmailVerify(
        //     data.email,
        //     'Confirm trello account registration',
        //     `
        //         <h1>Finish creating your account</h1>
        //         <div style="margin-bottom: 30px">Hey there</div>
        //         <div style="margin-bottom: 30px">Your email address has been registered with Sendinblue. To validate your account and activate your ability to send email campaigns, please complete your profile by clicking the link below: web browser.</div>
        //         <div style="margin: 30px auto">
        //             <a style="display:inline-block;font-size:18px;font-family:'Open Sans','Arial',Helvetica,sans-serif;color:#ffffff;font-weight:normal;padding: 10px 20px;background-color:#0092ff;border-radius:15px;color:#ffffff;font-weight:normal" href="${verifyLocationLink}">Confirm my email address</a>
        //         </div>
        //     `
        // )
        return pick(getUser, ['email', 'username', 'displayName', 'updatedAt', 'createdAt', 'avatar', 'role', 'isActive'])
    } catch (error) {
        throw new Error(error)
    }
}

const verifyToken = async (data) => {
    try {
        const user = await AuthModel.findOneByEmail(data.email)
        if (!user) {
            return {
                stt: false,
                msg: 'Account not found'
            }
        }
        if (user.isActive) {
            return {
                stt: false,
                msg: 'Account has been activated'
            }
        }
        if (user.verifyToken !== data.verifyToken) {
            return {
                stt: false,
                msg: 'Verify token is invalid'
            }
        }

        await AuthModel.update(user._id.toString(), { isActive: true, verifyToken: null })

        return {
            stt: true,
            msg: 'Verify token is success'
        }
    } catch (error) {
        throw new Error(error)
    }
}

const login = async (data) => {
    try {
        const user = await AuthModel.findOneByUsername(data.userName)
        if (!user) {
            throw new Error('Incorrect username or password')
            //return { stt: false, msg: 'Incorrect username or password' }
        }
        const isCheckPassword = await bcrypt.compareSync(data.password, user.password)
        if (!isCheckPassword) {
            throw new Error('Incorrect username or password')
            //return { stt: false, msg: 'Incorrect username or password' }
        }
        if (!user.isActive) {
            throw new Error('Account is not active')
            //return { stt: false, msg: 'Account is not active' } 
        }
        //return accessToken and refreshToken
        const accessToken = await JwtProvider.generateToken(env.ACCESS_TOKEN_PRIVATE_KEY, env.ACCESS_TOKEN_LIFE, { _id: user._id, email: user.email })
        const refreshToken = await JwtProvider.generateToken(env.REFRESH_TOKEN_PRIVATE_KEY, env.REFRESH_TOKEN_LIFE, { _id: user._id, email: user.email })
        if (user.currentAccessToken) {
            user.currentAccessToken.push(accessToken)
        }
        else {
            user.currentAccessToken = [accessToken]
        }
        if (user.currentRefreshToken) {
            user.currentRefreshToken.push(refreshToken)
        }
        else {
            user.currentRefreshToken = [refreshToken]
        }

        await AuthModel.update(user._id, { currentRefreshToken: user.currentRefreshToken, currentAccessToken: user.currentAccessToken })

        user.accessToken = accessToken
        user.refreshToken = refreshToken
        return { stt: true, msg: 'Login success', data: pickUser(user) }
    } catch (error) {
        throw new Error(error)
    }
}

const refreshToken = async (data) => {
    const clientAccessToken = data.cookies?.accessToken
    const clientRefreshToken = data.cookies?.refreshToken
    try {
        const user = await AuthModel.findOneById(data.jwtDecoded._id)
        if (!user) {
            throw new Error('Account not found')
        }

        let infoUser = { _id: user._id.toString(), email: user.email }
        //return accessToken and refreshToken
        const accessToken = await JwtProvider.generateToken(env.ACCESS_TOKEN_PRIVATE_KEY, env.ACCESS_TOKEN_LIFE, infoUser)
        const refreshToken = await JwtProvider.generateToken(env.REFRESH_TOKEN_PRIVATE_KEY, env.REFRESH_TOKEN_LIFE, infoUser)

        user.currentAccessToken.splice(user.currentAccessToken.indexOf(clientAccessToken), 1)
        user.currentRefreshToken.splice(user.currentRefreshToken.indexOf(clientRefreshToken), 1)
        user.currentAccessToken.push(accessToken)
        user.currentRefreshToken.push(refreshToken)

        await AuthModel.update(user._id, { currentRefreshToken: user.currentRefreshToken, currentAccessToken: user.currentAccessToken })

        user.accessToken = accessToken
        user.refreshToken = refreshToken
        return { stt: true, msg: 'Refresh Token Success', data: pickUser(user) }
    } catch (error) {
        throw new Error(error)
    }
}

export const AuthService = {
    register,
    verifyToken,
    login,
    refreshToken,
}
