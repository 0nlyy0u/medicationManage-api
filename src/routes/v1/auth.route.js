import express from 'express'
import { AuthController } from '*/controllers/auth.controller'
import { AuthValidation } from '*/validations/auth.validation'
import { authMiddleware } from '*/middlewares/auth.middleware'
import { UploadMiddleware } from '../../middlewares/upload.middleware'

const router = express.Router()

router.route('/register')
    .post(AuthValidation.register, AuthController.register)

router.route('/verify/:email/:verifyToken')
    .post(AuthValidation.verify, AuthController.verify)

router.route('/login')
    .post(AuthValidation.login, AuthController.login)

router.route('/logout')
    .delete(authMiddleware.deleteToken, AuthController.logout)

router.route('/refreshToken')
    .get(authMiddleware.isRefreshToken, AuthController.refreshToken)

router.route('/update/:id')
    .put(AuthValidation.update, AuthController.update)

router.route('/update')
    .put(authMiddleware.isAuthorized, UploadMiddleware.upload.single('avatar'), AuthValidation.update, AuthController.update)

export const authRoutes = router
