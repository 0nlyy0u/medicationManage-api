import JWT from 'jsonwebtoken'

const generateToken = async (privateKey, tokenLife, user = {}) => {
    try {
        return await JWT.sign(user, privateKey, { 
            algorithm: 'HS256', //Kiểu mã hoá
            expiresIn: tokenLife //Thời gian token tồn tại
        })
    } catch (error) {
        throw new Error(error)
    }
}

const verifyoken = async (privateKey, token) => {
    try {
        return await JWT.verify(token, privateKey)
    } catch (error) {
        throw new Error(error)
    }
}

export const JwtProvider = {
    generateToken,
    verifyoken
}