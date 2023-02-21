"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.invitationRoutes = void 0;

var _express = _interopRequireDefault(require("express"));

var _invitation = require("../../controllers/invitation.controller");

var _invitation2 = require("../../validations/invitation.validation");

var _auth = require("../../middlewares/auth.middleware");

var router = _express["default"].Router(); // Create board invitation


router.route('/board').post(_auth.authMiddleware.isAuthorized, _invitation2.InvitationValidation.createNewBoardInvitation, _invitation.InvitationController.createNewBoardInvitation);
router.route('/board/:invitationId').put(_auth.authMiddleware.isAuthorized, _invitation.InvitationController.updateBoardInvitation); // Get invitations

router.route('/').get(_auth.authMiddleware.isAuthorized, _invitation.InvitationController.getInvitations);
var invitationRoutes = router;
exports.invitationRoutes = invitationRoutes;