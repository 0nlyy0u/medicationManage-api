"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clinicRoutes = void 0;

var _express = _interopRequireDefault(require("express"));

var _clinic = require("../../controllers/clinic.controller");

var _clinic2 = require("../../validations/clinic.validation");

var _auth = require("../../middlewares/auth.middleware");

var router = _express["default"].Router();

router.route('/').post(_auth.authMiddleware.isAuthorized, _clinic2.ClinicValidation.createNew, _clinic.ClinicController.createNew).put(_auth.authMiddleware.isAuthorized, _clinic2.ClinicValidation.update, _clinic.ClinicController.update)["delete"](_auth.authMiddleware.isAuthorized, _clinic.ClinicController.deleteClinic);
router.route('/getList').get(_auth.authMiddleware.isAuthorized, _clinic.ClinicController.getListClinics);
var clinicRoutes = router;
exports.clinicRoutes = clinicRoutes;