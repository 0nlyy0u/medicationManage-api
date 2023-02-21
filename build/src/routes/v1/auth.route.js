"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authRoutes = void 0;

var _express = _interopRequireDefault(require("express"));

var _auth = require("../../controllers/auth.controller");

var _auth2 = require("../../validations/auth.validation");

var _auth3 = require("../../middlewares/auth.middleware");

var _upload = require("../../middlewares/upload.middleware");

var router = _express["default"].Router();

router.route('/register').post(_auth2.AuthValidation.register, _auth.AuthController.register);
router.route('/verify/:email/:verifyToken').post(_auth2.AuthValidation.verify, _auth.AuthController.verify);
router.route('/login').post(_auth2.AuthValidation.login, _auth.AuthController.login);
router.route('/logout')["delete"](_auth3.authMiddleware.deleteToken, _auth.AuthController.logout);
router.route('/refreshToken').get(_auth3.authMiddleware.isRefreshToken, _auth.AuthController.refreshToken);
router.route('/update/:id').put(_auth2.AuthValidation.update, _auth.AuthController.update);
router.route('/update').put(_auth3.authMiddleware.isAuthorized, _upload.UploadMiddleware.upload.single('avatar'), _auth2.AuthValidation.update, _auth.AuthController.update);
var authRoutes = router;
exports.authRoutes = authRoutes;