import express from 'express'
import { DoctorController } from '*/controllers/doctor.controller'
import { DoctorValidation } from '*/validations/doctor.validation'
import { authMiddleware } from '*/middlewares/auth.middleware'

const router = express.Router()

router.route('/')
    .post(authMiddleware.isAuthorized, DoctorValidation.createNew, DoctorController.createNew)
    .put(authMiddleware.isAuthorized, DoctorValidation.update, DoctorController.update)
    .delete(authMiddleware.isAuthorized, DoctorController.deleteDoctor)
router.route('/getList')
    .get(authMiddleware.isAuthorized, DoctorController.getListDoctors)

export const doctorRoutes = router
