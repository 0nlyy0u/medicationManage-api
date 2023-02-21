"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authMiddleware = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _multer = _interopRequireDefault(require("multer"));

var _environtment = require("../config/environtment");

var _JwtProvider = require("../providers/JwtProvider");

var _constants = require("../utilities/constants");

var _user = require("../models/user.model");

var isAuthorized = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var _req$cookies;

    var clientAccessToken, decoded, user, _error$message;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            //console.log(req)
            clientAccessToken = (_req$cookies = req.cookies) === null || _req$cookies === void 0 ? void 0 : _req$cookies.accessToken; //console.log(clientAccessToken)

            if (clientAccessToken) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", res.status(_constants.HttpStatusCode.UNAUTHORIZED).json({
              errors: 'Unauthorized (Token not found)'
            }));

          case 3:
            _context.prev = 3;
            _context.next = 6;
            return _JwtProvider.JwtProvider.verifyoken(_environtment.env.ACCESS_TOKEN_PRIVATE_KEY, clientAccessToken);

          case 6:
            decoded = _context.sent;
            _context.next = 9;
            return _user.AuthModel.findOneById(decoded._id);

          case 9:
            user = _context.sent;

            if (user) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", res.status(_constants.HttpStatusCode.UNAUTHORIZED).json({
              stt: false,
              msg: 'Account not found'
            }));

          case 12:
            if (user.currentAccessToken.includes(clientAccessToken)) {
              _context.next = 14;
              break;
            }

            return _context.abrupt("return", res.status(_constants.HttpStatusCode.UNAUTHORIZED).json({
              stt: false,
              msg: 'Access token not found'
            }));

          case 14:
            //Token hợp lệ - Lưu thông tin giải mã được vào req, để sử dụng cho các phần cần xử lý
            req.jwtDecoded = decoded; // Cho phép REQUEST đi tiếp

            next();
            _context.next = 23;
            break;

          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](3);

            if (!(_context.t0 !== null && _context.t0 !== void 0 && (_error$message = _context.t0.message) !== null && _error$message !== void 0 && _error$message.includes('jwt expired'))) {
              _context.next = 22;
              break;
            }

            return _context.abrupt("return", res.status(_constants.HttpStatusCode.EXPIRED).json({
              errors: 'Access Token Expired. Need to refresh token'
            }));

          case 22:
            return _context.abrupt("return", res.status(_constants.HttpStatusCode.UNAUTHORIZED).json({
              errors: 'Unauthorized'
            }));

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 18]]);
  }));

  return function isAuthorized(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var isRefreshToken = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var _req$cookies2;

    var clientRefreshToken, decoded, user;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            clientRefreshToken = (_req$cookies2 = req.cookies) === null || _req$cookies2 === void 0 ? void 0 : _req$cookies2.refreshToken;

            if (clientRefreshToken) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", res.status(_constants.HttpStatusCode.UNAUTHORIZED).json({
              errors: 'Refresh token not found'
            }));

          case 3:
            _context2.prev = 3;
            _context2.next = 6;
            return _JwtProvider.JwtProvider.verifyoken(_environtment.env.REFRESH_TOKEN_PRIVATE_KEY, clientRefreshToken);

          case 6:
            decoded = _context2.sent;
            _context2.next = 9;
            return _user.AuthModel.findOneById(decoded._id);

          case 9:
            user = _context2.sent;

            if (user) {
              _context2.next = 12;
              break;
            }

            return _context2.abrupt("return", res.status(_constants.HttpStatusCode.UNAUTHORIZED).json({
              stt: false,
              msg: 'Account not found'
            }));

          case 12:
            if (user.currentRefreshToken.includes(clientRefreshToken)) {
              _context2.next = 14;
              break;
            }

            return _context2.abrupt("return", res.status(_constants.HttpStatusCode.UNAUTHORIZED).json({
              stt: false,
              msg: 'Refresh token not found'
            }));

          case 14:
            //Token hợp lệ - Lưu thông tin giải mã được vào req, để sử dụng cho các phần cần xử lý
            req.jwtDecoded = decoded; // Cho phép REQUEST đi tiếp

            next();
            _context2.next = 21;
            break;

          case 18:
            _context2.prev = 18;
            _context2.t0 = _context2["catch"](3);
            return _context2.abrupt("return", res.status(_constants.HttpStatusCode.UNAUTHORIZED).json({
              errors: 'Unauthorized'
            }));

          case 21:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[3, 18]]);
  }));

  return function isRefreshToken(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var deleteToken = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var _req$cookies3, _req$cookies4;

    var clientAccessToken, clientRefreshToken, _req$cookies5, user, _error$message2;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            clientAccessToken = (_req$cookies3 = req.cookies) === null || _req$cookies3 === void 0 ? void 0 : _req$cookies3.accessToken;
            clientRefreshToken = (_req$cookies4 = req.cookies) === null || _req$cookies4 === void 0 ? void 0 : _req$cookies4.refreshToken;

            if (!clientAccessToken || !clientRefreshToken) {
              next();
            }

            _context3.prev = 3;
            _context3.next = 6;
            return _user.AuthModel.findOneById((_req$cookies5 = req.cookies) === null || _req$cookies5 === void 0 ? void 0 : _req$cookies5._id);

          case 6:
            user = _context3.sent;

            if (!user) {
              next();
            }

            user.currentAccessToken.splice(user.currentAccessToken.indexOf(clientAccessToken), 1);
            user.currentRefreshToken.splice(user.currentRefreshToken.indexOf(clientRefreshToken), 1);
            _context3.next = 12;
            return _user.AuthModel.update(user._id, {
              currentRefreshToken: user.currentRefreshToken,
              currentAccessToken: user.currentAccessToken
            });

          case 12:
            // Cho phép REQUEST đi tiếp
            next();
            _context3.next = 21;
            break;

          case 15:
            _context3.prev = 15;
            _context3.t0 = _context3["catch"](3);
            console.log(_context3.t0);

            if (!(_context3.t0 !== null && _context3.t0 !== void 0 && (_error$message2 = _context3.t0.message) !== null && _error$message2 !== void 0 && _error$message2.includes('jwt expired'))) {
              _context3.next = 20;
              break;
            }

            return _context3.abrupt("return", res.status(_constants.HttpStatusCode.EXPIRED).json({
              errors: 'Access Token Expired. Need to refresh token'
            }));

          case 20:
            return _context3.abrupt("return", res.status(_constants.HttpStatusCode.UNAUTHORIZED).json({
              errors: 'Unauthorized'
            }));

          case 21:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[3, 15]]);
  }));

  return function deleteToken(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

var authMiddleware = {
  isAuthorized: isAuthorized,
  isRefreshToken: isRefreshToken,
  deleteToken: deleteToken
};
exports.authMiddleware = authMiddleware;