import express from 'express'
import { InvitationController } from '*/controllers/invitation.controller'
import { InvitationValidation } from '*/validations/invitation.validation'
import { authMiddleware } from '*/middlewares/auth.middleware'

const router = express.Router()

// Create board invitation
router
    .route('/board')
    .post(
        authMiddleware.isAuthorized,
        InvitationValidation.createNewBoardInvitation,
        InvitationController.createNewBoardInvitation
    )


router.route('/board/:invitationId')
    .put(authMiddleware.isAuthorized, InvitationController.updateBoardInvitation)

// Get invitations
router
    .route('/')
    .get(authMiddleware.isAuthorized, InvitationController.getInvitations)

export const invitationRoutes = router
