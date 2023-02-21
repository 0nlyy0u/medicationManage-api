import { HttpStatusCode } from '*/utilities/constants'
import { AuthService } from '*/services/auth.service'
import { AuthModel } from '*/models/user.model'
import ms from 'ms'

const register = async (req, res) => {
    try {
        const checkUserName = await AuthModel.findOneByUsername(req.body.userName)
        if (checkUserName !== null) {
            return res.status(HttpStatusCode.OK).json({ stt: false, msg: 'Username already in use' })
        }
        const checkEmail = await AuthModel.findOneByEmail(req.body.email)
        if (checkEmail !== null) {
            return res.status(HttpStatusCode.OK).json({ stt: false, msg: 'Email already in use' })
        }
        const result = await AuthService.register(req.body)
        //result.password = null
        res.status(HttpStatusCode.OK).json({
            stt: true,
            msg: 'Account created successfully! Please check your email and verify your account before sign-in!',
            data: result
        })
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            errors: error.message
        })
    }
}

const verify = async (req, res) => {
    try {
        const result = await AuthService.verifyToken(req.params)
        //result.password = null
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            errors: error.message
        })
    }
}

const login = async (req, res) => {
    try {
        const result = await AuthService.login(req.body)

        // xử lý cookie ở đây
        res.cookie('accessToken', result.data.accessToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: ms('12 days') })
        res.cookie('refreshToken', result.data.refreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: ms('12 days') })
        res.cookie('_id', result.data._id, { httpOnly: true, secure: true, sameSite: 'none', maxAge: ms('12 days') })

        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            errors: error.message
        })
    }
}

const logout = async (req, res) => {
    try {
        // Xoá cookie
        res.clearCookie('accessToken')
        res.clearCookie('refreshToken')
        res.clearCookie('_id')

        res.status(HttpStatusCode.OK).json({
            stt: true,
            msg: 'Logout successfully'
        })
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            errors: error.message
        })
    }
}

const refreshToken = async (req, res) => {
    try {
        const result = await AuthService.refreshToken(req)

        // xử lý cookie ở đây
        res.cookie('accessToken', result.data.accessToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: ms('12 days') })
        res.cookie('refreshToken', result.data.refreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: ms('12 days') })
        res.cookie('_id', result.data._id, { httpOnly: true, secure: true, sameSite: 'none', maxAge: ms('12 days') })

        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            errors: error.message
        })
    }
}

const update = async (req, res) => {
    try {
        const userId = req.jwtDecoded._id
        const userAvatarFile = req.file
        const result = await AuthService.update(userId, req.body, userAvatarFile)

        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            errors: error.message
        })
    }
}

const updateAvatar = async (req, res) => {
    try {
        // const userId = req.jwtDecoded._id
        // const result = await AuthService.update(userId, req.body)
        //console.log(req)
        res.status(HttpStatusCode.OK).json({})
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            errors: error.message
        })
    }
}

export const AuthController = {
    register,
    verify,
    login,
    logout,
    refreshToken,
    update,
    updateAvatar
}
