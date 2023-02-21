"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthService = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _user = require("../models/user.model");

var _uuid = require("uuid");

var _lodash = require("lodash");

var _sendInBlueProvider = require("../providers/sendInBlueProvider.js");

var _environtment = require("../config/environtment");

var _constants = require("../utilities/constants");

var _transform = require("../utilities/transform");

var _JwtProvider = require("../providers/JwtProvider");

var _CoudinaryProvider = require("../providers/CoudinaryProvider");

var _redisQueueProvider = require("../providers/redisQueueProvider");

var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

var register = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
    var existUser, newData, createdUser, getUser;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _user.AuthModel.findOneByEmail(data.email);

          case 3:
            existUser = _context.sent;

            if (!existUser) {
              _context.next = 6;
              break;
            }

            throw new Error('Email already exists');

          case 6:
            _context.t0 = data.email;
            _context.t1 = data.userName;
            _context.next = 10;
            return bcrypt.hashSync(data.password, 10);

          case 10:
            _context.t2 = _context.sent;
            _context.t3 = data.userName;
            _context.t4 = (0, _uuid.v4)();
            newData = {
              email: _context.t0,
              userName: _context.t1,
              password: _context.t2,
              displayName: _context.t3,
              verifyToken: _context.t4
            };
            _context.next = 16;
            return _user.AuthModel.register(newData);

          case 16:
            createdUser = _context.sent;
            _context.next = 19;
            return _user.AuthModel.findOneById(createdUser.insertedId.toString());

          case 19:
            getUser = _context.sent;
            return _context.abrupt("return", (0, _lodash.pick)(getUser, ['email', 'username', 'displayName', 'updatedAt', 'createdAt', 'avatar', 'role', 'isActive']));

          case 23:
            _context.prev = 23;
            _context.t5 = _context["catch"](0);
            throw new Error(_context.t5);

          case 26:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 23]]);
  }));

  return function register(_x) {
    return _ref.apply(this, arguments);
  };
}();

var verifyToken = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(data) {
    var user;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _user.AuthModel.findOneByEmail(data.email);

          case 3:
            user = _context2.sent;

            if (user) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", {
              stt: false,
              msg: 'Account not found'
            });

          case 6:
            if (!user.isActive) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return", {
              stt: false,
              msg: 'Account has been activated'
            });

          case 8:
            if (!(user.verifyToken !== data.verifyToken)) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", {
              stt: false,
              msg: 'Verify token is invalid'
            });

          case 10:
            _context2.next = 12;
            return _user.AuthModel.update(user._id.toString(), {
              isActive: true,
              verifyToken: null
            });

          case 12:
            return _context2.abrupt("return", {
              stt: true,
              msg: 'Verify token is success'
            });

          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2["catch"](0);
            throw new Error(_context2.t0);

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 15]]);
  }));

  return function verifyToken(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var login = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(data) {
    var user, isCheckPassword, accessToken, _refreshToken;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _user.AuthModel.findOneByUsername(data.userName);

          case 3:
            user = _context3.sent;

            if (user) {
              _context3.next = 6;
              break;
            }

            throw new Error('Incorrect username or password');

          case 6:
            _context3.next = 8;
            return bcrypt.compareSync(data.password, user.password);

          case 8:
            isCheckPassword = _context3.sent;

            if (isCheckPassword) {
              _context3.next = 11;
              break;
            }

            throw new Error('Incorrect username or password');

          case 11:
            if (user.isActive) {
              _context3.next = 13;
              break;
            }

            throw new Error('Account is not active');

          case 13:
            _context3.next = 15;
            return _JwtProvider.JwtProvider.generateToken(_environtment.env.ACCESS_TOKEN_PRIVATE_KEY, _environtment.env.ACCESS_TOKEN_LIFE, {
              _id: user._id,
              email: user.email
            });

          case 15:
            accessToken = _context3.sent;
            _context3.next = 18;
            return _JwtProvider.JwtProvider.generateToken(_environtment.env.REFRESH_TOKEN_PRIVATE_KEY, _environtment.env.REFRESH_TOKEN_LIFE, {
              _id: user._id,
              email: user.email
            });

          case 18:
            _refreshToken = _context3.sent;

            if (user.currentAccessToken) {
              user.currentAccessToken.push(accessToken);
            } else {
              user.currentAccessToken = [accessToken];
            }

            if (user.currentRefreshToken) {
              user.currentRefreshToken.push(_refreshToken);
            } else {
              user.currentRefreshToken = [_refreshToken];
            }

            _context3.next = 23;
            return _user.AuthModel.update(user._id, {
              currentRefreshToken: user.currentRefreshToken,
              currentAccessToken: user.currentAccessToken
            });

          case 23:
            user.accessToken = accessToken;
            user.refreshToken = _refreshToken;
            return _context3.abrupt("return", {
              stt: true,
              msg: 'Login success',
              data: (0, _transform.pickUser)(user)
            });

          case 28:
            _context3.prev = 28;
            _context3.t0 = _context3["catch"](0);
            throw new Error(_context3.t0);

          case 31:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 28]]);
  }));

  return function login(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

var refreshToken = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(data) {
    var _data$cookies, _data$cookies2;

    var clientAccessToken, clientRefreshToken, user, infoUser, accessToken, _refreshToken2;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            clientAccessToken = (_data$cookies = data.cookies) === null || _data$cookies === void 0 ? void 0 : _data$cookies.accessToken;
            clientRefreshToken = (_data$cookies2 = data.cookies) === null || _data$cookies2 === void 0 ? void 0 : _data$cookies2.refreshToken;
            _context4.prev = 2;
            _context4.next = 5;
            return _user.AuthModel.findOneById(data.jwtDecoded._id);

          case 5:
            user = _context4.sent;

            if (user) {
              _context4.next = 8;
              break;
            }

            throw new Error('Account not found');

          case 8:
            infoUser = {
              _id: user._id.toString(),
              email: user.email
            }; //return accessToken and refreshToken

            _context4.next = 11;
            return _JwtProvider.JwtProvider.generateToken(_environtment.env.ACCESS_TOKEN_PRIVATE_KEY, _environtment.env.ACCESS_TOKEN_LIFE, infoUser);

          case 11:
            accessToken = _context4.sent;
            _context4.next = 14;
            return _JwtProvider.JwtProvider.generateToken(_environtment.env.REFRESH_TOKEN_PRIVATE_KEY, _environtment.env.REFRESH_TOKEN_LIFE, infoUser);

          case 14:
            _refreshToken2 = _context4.sent;
            user.currentAccessToken.splice(user.currentAccessToken.indexOf(clientAccessToken), 1);
            user.currentRefreshToken.splice(user.currentRefreshToken.indexOf(clientRefreshToken), 1);
            user.currentAccessToken.push(accessToken);
            user.currentRefreshToken.push(_refreshToken2);
            _context4.next = 21;
            return _user.AuthModel.update(user._id, {
              currentRefreshToken: user.currentRefreshToken,
              currentAccessToken: user.currentAccessToken
            });

          case 21:
            user.accessToken = accessToken;
            user.refreshToken = _refreshToken2;
            return _context4.abrupt("return", {
              stt: true,
              msg: 'Refresh Token Success',
              data: (0, _transform.pickUser)(user)
            });

          case 26:
            _context4.prev = 26;
            _context4.t0 = _context4["catch"](2);
            throw new Error(_context4.t0);

          case 29:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[2, 26]]);
  }));

  return function refreshToken(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

var AuthService = {
  register: register,
  verifyToken: verifyToken,
  login: login,
  refreshToken: refreshToken
};
exports.AuthService = AuthService;