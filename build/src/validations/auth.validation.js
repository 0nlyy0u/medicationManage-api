"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthValidation = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _joi = _interopRequireDefault(require("joi"));

var _constants = require("../utilities/constants");

var _validators = require("../utilities/validators");

var register = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var condition;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            condition = _joi["default"].object({
              email: _joi["default"].string().required().pattern(_validators.EMAIL_RULE).message('Email is invalid').trim(),
              password: _joi["default"].string().required().pattern(_validators.PASSWORD_RULE).message('Password is invalid').trim(),
              userName: _joi["default"].string().required().pattern(_validators.USERNAME_RULE).message('Username is invalid').trim()
              /**
              * Custom messsage với thằng Joi.ref khá khó tìm trong docs, cách tìm là bắt keyword để tìm những người từng hỏi chung 1 vấn đề,
              * Ví dụ như link bên dưới, tìm ra cách custom bằng any.only trong hàm messages(json object)
              * https://github.com/sideway/joi/issues/2147#issuecomment-537372635
              * Lưu ý ở đầy có thể dùng password_confirmation: Joi.ref('password') luôn nhưng chưa tìm ra cách custom message, toàn lỗi :))
              *
              * Ngoài ra đây là để học cách custom message nhé, còn thực tế ở FE chúng ta đã validate đẹp rồi, thì thông thường BE cứ để default message trả về
              * trường hợp nào thật sự cần làm đẹp message thì mới làm nhé
              */
              // password_confirmation: Joi.string().required().valid(Joi.ref('password')).messages({
              //     'any.only': 'Password Confirmation is not match',
              //     'any.required': 'Password Confirmation is required'
              // })

            });
            _context.prev = 1;
            _context.next = 4;
            return condition.validateAsync(req.body, {
              abortEarly: false
            });

          case 4:
            next();
            _context.next = 11;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](1);
            console.log('345');
            res.status(_constants.HttpStatusCode.BAD_REQUEST).json({
              errors: new Error(_context.t0).message
            });

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 7]]);
  }));

  return function register(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var verify = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var condition;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            condition = _joi["default"].object({
              email: _joi["default"].string().required().pattern(_validators.EMAIL_RULE).message('Email is invalid').trim(),
              verifyToken: _joi["default"].string().required()
            });
            _context2.prev = 1;
            _context2.next = 4;
            return condition.validateAsync(req.body, {
              abortEarly: false
            });

          case 4:
            next();
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](1);
            res.status(_constants.HttpStatusCode.BAD_REQUEST).json({
              errors: new Error(_context2.t0).message
            });

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 7]]);
  }));

  return function verify(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var login = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var condition;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            condition = _joi["default"].object({
              userName: _joi["default"].string().required().trim(),
              password: _joi["default"].string().required().trim()
            });
            _context3.prev = 1;
            _context3.next = 4;
            return condition.validateAsync(req.body, {
              abortEarly: false
            });

          case 4:
            next();
            _context3.next = 10;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](1);
            res.status(_constants.HttpStatusCode.BAD_REQUEST).json({
              errors: new Error(_context3.t0).message
            });

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 7]]);
  }));

  return function login(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

var update = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var condition;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            condition = _joi["default"].object({
              displayName: _joi["default"].string().trim(),
              currentPassword: _joi["default"].string().pattern(_validators.PASSWORD_RULE).message('Current Password is invalid'),
              newPassword: _joi["default"].string().pattern(_validators.PASSWORD_RULE).message('New Password is invalid')
            });
            _context4.prev = 1;
            _context4.next = 4;
            return condition.validateAsync(req.body, {
              abortEarly: false,
              allowUnknown: true
            });

          case 4:
            next();
            _context4.next = 10;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](1);
            res.status(_constants.HttpStatusCode.BAD_REQUEST).json({
              errors: new Error(_context4.t0).message
            });

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 7]]);
  }));

  return function update(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

var AuthValidation = {
  register: register,
  verify: verify,
  login: login,
  update: update
};
exports.AuthValidation = AuthValidation;