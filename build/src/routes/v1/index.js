"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiV1 = void 0;

var _express = _interopRequireDefault(require("express"));

var _constants = require("../../utilities/constants");

var _clinic = require("./clinic.route");

var _doctor = require("./doctor.route");

var _auth = require("./auth.route");

var _invitation = require("./invitation.route");

var router = _express["default"].Router();
/**
 * GET v1/status
 */


router.get('/status', function (req, res) {
  return res.status(_constants.HttpStatusCode.OK).json({
    status: 'OK!'
  });
});
/** Clinic APIs */

router.use('/clinics', _clinic.clinicRoutes);
/** Doctor APIs */

router.use('/doctors', _doctor.doctorRoutes);
/** Auth APIs */

router.use('/auth', _auth.authRoutes);
/** Invitation APIs */

router.use('/invitations', _invitation.invitationRoutes);
var apiV1 = router;
exports.apiV1 = apiV1;