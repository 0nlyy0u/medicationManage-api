"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthModel = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _joi = _interopRequireDefault(require("joi"));

var _mongodb = require("mongodb");

var _mongodb2 = require("../config/mongodb");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

// Define Users collection
var userCollectionName = 'users';

var userCollectionSchema = _joi["default"].object({
  email: _joi["default"].string().required().trim(),
  // also ObjectId when create new
  userName: _joi["default"].string().required().trim(),
  // also ObjectId when create new
  password: _joi["default"].string().required().min(8).trim(),
  displayName: _joi["default"].string(),
  avatar: _joi["default"].string(),
  role: _joi["default"].string()["default"]('admin'),
  isActive: _joi["default"]["boolean"]()["default"](true),
  verifyToken: _joi["default"].string(),
  currentRefreshToken: _joi["default"].array(),
  currentAccessToken: _joi["default"].array(),
  createdAt: _joi["default"].date().timestamp('javascript')["default"](Date.now()),
  updatedAt: _joi["default"].date().timestamp()["default"](null)
});

var INVALID_UPDATE_FIELDS = ['_id', 'email', 'userName', 'createdAt'];

var validateSchema = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return userCollectionSchema.validateAsync(data, {
              abortEarly: false
            });

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function validateSchema(_x) {
    return _ref.apply(this, arguments);
  };
}();

var findOneById = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(id) {
    var result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return (0, _mongodb2.getDB)().collection(userCollectionName).findOne({
              _id: (0, _mongodb.ObjectId)(id)
            });

          case 3:
            result = _context2.sent;
            return _context2.abrupt("return", result);

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            throw new Error(_context2.t0);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function findOneById(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var findOneByEmail = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(email) {
    var result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return (0, _mongodb2.getDB)().collection(userCollectionName).findOne({
              email: email
            });

          case 3:
            result = _context3.sent;
            return _context3.abrupt("return", result);

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            throw new Error(_context3.t0);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 7]]);
  }));

  return function findOneByEmail(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

var findOneByUsername = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(username) {
    var result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return (0, _mongodb2.getDB)().collection(userCollectionName).findOne({
              userName: username
            });

          case 3:
            result = _context4.sent;
            return _context4.abrupt("return", result);

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            throw new Error(_context4.t0);

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 7]]);
  }));

  return function findOneByUsername(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

var register = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(data) {
    var validatedValue, result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return validateSchema(data);

          case 3:
            validatedValue = _context5.sent;
            _context5.next = 6;
            return (0, _mongodb2.getDB)().collection(userCollectionName).insertOne(validatedValue);

          case 6:
            result = _context5.sent;
            return _context5.abrupt("return", result);

          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5["catch"](0);
            throw new Error(_context5.t0);

          case 13:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 10]]);
  }));

  return function register(_x5) {
    return _ref5.apply(this, arguments);
  };
}();

var update = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(id, data) {
    var updateData, result;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            updateData = _objectSpread({}, data);
            Object.keys(updateData).forEach(function (fieldName) {
              if (INVALID_UPDATE_FIELDS.includes(fieldName)) {
                delete updateData[fieldName];
              }
            });
            _context6.next = 5;
            return (0, _mongodb2.getDB)().collection(userCollectionName).findOneAndUpdate({
              _id: (0, _mongodb.ObjectId)(id)
            }, {
              $set: updateData
            }, {
              returnDocument: 'after'
            });

          case 5:
            result = _context6.sent;
            return _context6.abrupt("return", result.value);

          case 9:
            _context6.prev = 9;
            _context6.t0 = _context6["catch"](0);
            throw new Error(_context6.t0);

          case 12:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 9]]);
  }));

  return function update(_x6, _x7) {
    return _ref6.apply(this, arguments);
  };
}();
/**
 * @param {Array of string card id} ids
 */


var deleteMany = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(ids) {
    var transformIds, result;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            transformIds = ids.map(function (i) {
              return (0, _mongodb.ObjectId)(i);
            });
            _context7.next = 4;
            return (0, _mongodb2.getDB)().collection(userCollectionName).updateMany({
              _id: {
                $in: transformIds
              }
            }, {
              $set: {
                _destroy: true
              }
            });

          case 4:
            result = _context7.sent;
            return _context7.abrupt("return", result);

          case 8:
            _context7.prev = 8;
            _context7.t0 = _context7["catch"](0);
            throw new Error(_context7.t0);

          case 11:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 8]]);
  }));

  return function deleteMany(_x8) {
    return _ref7.apply(this, arguments);
  };
}();

var AuthModel = {
  userCollectionName: userCollectionName,
  findOneByEmail: findOneByEmail,
  findOneByUsername: findOneByUsername,
  register: register,
  deleteMany: deleteMany,
  update: update,
  findOneById: findOneById
};
exports.AuthModel = AuthModel;