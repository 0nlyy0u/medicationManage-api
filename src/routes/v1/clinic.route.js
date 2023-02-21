import express from 'express'
import { ClinicController } from '*/controllers/clinic.controller'
import { ClinicValidation } from '*/validations/clinic.validation'
import { authMiddleware } from '*/middlewares/auth.middleware'

const router = express.Router()

router.route('/')
    .post(authMiddleware.isAuthorized, ClinicValidation.createNew, ClinicController.createNew)
    .put(authMiddleware.isAuthorized, ClinicValidation.update, ClinicController.update)
    .delete(authMiddleware.isAuthorized, ClinicController.deleteClinic)
router.route('/getList')
    .get(authMiddleware.isAuthorized, ClinicController.getListClinics)

export const clinicRoutes = router
