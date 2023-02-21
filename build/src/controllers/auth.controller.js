"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthController = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _constants = require("../utilities/constants");

var _auth = require("../services/auth.service");

var _user = require("../models/user.model");

var _ms = _interopRequireDefault(require("ms"));

var register = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var checkUserName, checkEmail, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _user.AuthModel.findOneByUsername(req.body.userName);

          case 3:
            checkUserName = _context.sent;

            if (!(checkUserName !== null)) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(_constants.HttpStatusCode.OK).json({
              stt: false,
              msg: 'Username already in use'
            }));

          case 6:
            _context.next = 8;
            return _user.AuthModel.findOneByEmail(req.body.email);

          case 8:
            checkEmail = _context.sent;

            if (!(checkEmail !== null)) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", res.status(_constants.HttpStatusCode.OK).json({
              stt: false,
              msg: 'Email already in use'
            }));

          case 11:
            _context.next = 13;
            return _auth.AuthService.register(req.body);

          case 13:
            result = _context.sent;
            //result.password = null
            res.status(_constants.HttpStatusCode.OK).json({
              stt: true,
              msg: 'Account created successfully! Please check your email and verify your account before sign-in!',
              data: result
            });
            _context.next = 20;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](0);
            res.status(_constants.HttpStatusCode.INTERNAL_SERVER).json({
              errors: _context.t0.message
            });

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 17]]);
  }));

  return function register(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var verify = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _auth.AuthService.verifyToken(req.params);

          case 3:
            result = _context2.sent;
            //result.password = null
            res.status(_constants.HttpStatusCode.OK).json(result);
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            res.status(_constants.HttpStatusCode.INTERNAL_SERVER).json({
              errors: _context2.t0.message
            });

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function verify(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var login = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _auth.AuthService.login(req.body);

          case 3:
            result = _context3.sent;
            // xử lý cookie ở đây
            res.cookie('accessToken', result.data.accessToken, {
              httpOnly: true,
              secure: true,
              sameSite: 'none',
              maxAge: (0, _ms["default"])('12 days')
            });
            res.cookie('refreshToken', result.data.refreshToken, {
              httpOnly: true,
              secure: true,
              sameSite: 'none',
              maxAge: (0, _ms["default"])('12 days')
            });
            res.cookie('_id', result.data._id, {
              httpOnly: true,
              secure: true,
              sameSite: 'none',
              maxAge: (0, _ms["default"])('12 days')
            });
            res.status(_constants.HttpStatusCode.OK).json(result);
            _context3.next = 13;
            break;

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](0);
            res.status(_constants.HttpStatusCode.INTERNAL_SERVER).json({
              errors: _context3.t0.message
            });

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 10]]);
  }));

  return function login(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var logout = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            try {
              // Xoá cookie
              res.clearCookie('accessToken');
              res.clearCookie('refreshToken');
              res.clearCookie('_id');
              res.status(_constants.HttpStatusCode.OK).json({
                stt: true,
                msg: 'Logout successfully'
              });
            } catch (error) {
              res.status(_constants.HttpStatusCode.INTERNAL_SERVER).json({
                errors: error.message
              });
            }

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function logout(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

var refreshToken = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _auth.AuthService.refreshToken(req);

          case 3:
            result = _context5.sent;
            // xử lý cookie ở đây
            res.cookie('accessToken', result.data.accessToken, {
              httpOnly: true,
              secure: true,
              sameSite: 'none',
              maxAge: (0, _ms["default"])('12 days')
            });
            res.cookie('refreshToken', result.data.refreshToken, {
              httpOnly: true,
              secure: true,
              sameSite: 'none',
              maxAge: (0, _ms["default"])('12 days')
            });
            res.cookie('_id', result.data._id, {
              httpOnly: true,
              secure: true,
              sameSite: 'none',
              maxAge: (0, _ms["default"])('12 days')
            });
            res.status(_constants.HttpStatusCode.OK).json(result);
            _context5.next = 13;
            break;

          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5["catch"](0);
            res.status(_constants.HttpStatusCode.INTERNAL_SERVER).json({
              errors: _context5.t0.message
            });

          case 13:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 10]]);
  }));

  return function refreshToken(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

var update = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var userId, userAvatarFile, result;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            userId = req.jwtDecoded._id;
            userAvatarFile = req.file;
            _context6.next = 5;
            return _auth.AuthService.update(userId, req.body, userAvatarFile);

          case 5:
            result = _context6.sent;
            res.status(_constants.HttpStatusCode.OK).json(result);
            _context6.next = 12;
            break;

          case 9:
            _context6.prev = 9;
            _context6.t0 = _context6["catch"](0);
            res.status(_constants.HttpStatusCode.INTERNAL_SERVER).json({
              errors: _context6.t0.message
            });

          case 12:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 9]]);
  }));

  return function update(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

var updateAvatar = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            try {
              // const userId = req.jwtDecoded._id
              // const result = await AuthService.update(userId, req.body)
              //console.log(req)
              res.status(_constants.HttpStatusCode.OK).json({});
            } catch (error) {
              res.status(_constants.HttpStatusCode.INTERNAL_SERVER).json({
                errors: error.message
              });
            }

          case 1:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function updateAvatar(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

var AuthController = {
  register: register,
  verify: verify,
  login: login,
  logout: logout,
  refreshToken: refreshToken,
  update: update,
  updateAvatar: updateAvatar
};
exports.AuthController = AuthController;