import express from 'express'
import { HttpStatusCode } from '*/utilities/constants'
import { clinicRoutes } from './clinic.route'
import { doctorRoutes } from './doctor.route'
import { authRoutes } from './auth.route'
import { invitationRoutes } from './invitation.route'

const router = express.Router()

/**
 * GET v1/status
 */
router.get('/status', (req, res) =>
    res.status(HttpStatusCode.OK).json({ status: 'OK!' })
)

/** Clinic APIs */
router.use('/clinics', clinicRoutes)

/** Doctor APIs */
router.use('/doctors', doctorRoutes)

/** Auth APIs */
router.use('/auth', authRoutes)

/** Invitation APIs */
router.use('/invitations', invitationRoutes)

export const apiV1 = router
