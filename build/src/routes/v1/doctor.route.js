"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.doctorRoutes = void 0;

var _express = _interopRequireDefault(require("express"));

var _doctor = require("../../controllers/doctor.controller");

var _doctor2 = require("../../validations/doctor.validation");

var _auth = require("../../middlewares/auth.middleware");

var router = _express["default"].Router();

router.route('/').post(_auth.authMiddleware.isAuthorized, _doctor2.DoctorValidation.createNew, _doctor.DoctorController.createNew).put(_auth.authMiddleware.isAuthorized, _doctor2.DoctorValidation.update, _doctor.DoctorController.update)["delete"](_auth.authMiddleware.isAuthorized, _doctor.DoctorController.deleteDoctor);
router.route('/getList').get(_auth.authMiddleware.isAuthorized, _doctor.DoctorController.getListDoctors);
var doctorRoutes = router;
exports.doctorRoutes = doctorRoutes;