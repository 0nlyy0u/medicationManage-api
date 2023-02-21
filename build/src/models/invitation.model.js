"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InvitationModel = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _joi = _interopRequireDefault(require("joi"));

var _mongodb = require("mongodb");

var _mongodb2 = require("../config/mongodb");

var _user = require("./user.model");

var _clinic = require("./clinic.model");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var INVITATION_TYPES = {
  BOARD_INVITATION: 'BOARD_INVITATION'
};
var BOARD_INVITATION_STATUS = {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED'
}; // Define invitation collection

var invitationCollectionName = 'invitations';

var invitationCollectionSchema = _joi["default"].object({
  inviterId: _joi["default"].string().required(),
  inviteeId: _joi["default"].string().required(),
  type: _joi["default"].string().required(),
  //INVITATION_TYPES at below
  boardInvitation: {
    boardId: _joi["default"].string(),
    status: _joi["default"].string()["default"](BOARD_INVITATION_STATUS.PENDING)
  },
  createdAt: _joi["default"].date().timestamp('javascript')["default"](Date.now),
  updatedAt: _joi["default"].date().timestamp()["default"](null),
  _destroy: _joi["default"]["boolean"]()["default"](false)
});

var INVALID_UPDATE_FIELDS = ['_id', 'inviterId', 'inviteeId', 'type', 'createdAt'];

var validateSchema = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return invitationCollectionSchema.validateAsync(data, {
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
            return (0, _mongodb2.getDB)().collection(invitationCollectionName).findOne({
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

var findByUser = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(userId) {
    var result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return (0, _mongodb2.getDB)().collection(invitationCollectionName).aggregate([{
              $match: {
                inviteeId: (0, _mongodb.ObjectId)(userId),
                _destroy: false
              }
            }, {
              $lookup: {
                // Lockup là chọc sang các collection khác để lấy thêm thông tin
                from: _user.AuthModel.userCollectionName,
                localField: 'inviterId',
                foreignField: '_id',
                as: 'inviter',
                pipeline: [{
                  $project: {
                    password: 0,
                    verifyToken: 0
                  }
                }]
              }
            }, {
              $lookup: {
                from: _user.AuthModel.userCollectionName,
                localField: 'boardInvitation.boardId',
                // array of ObjectIds
                foreignField: '_id',
                as: 'board'
              }
            }, {
              $lookup: {
                from: _clinic.ClinicModel.boardCollectionName,
                localField: 'inviteeId',
                // array of ObjectIds
                foreignField: '_id',
                as: 'invitee',
                pipeline: [// Loại những trường không muốn lấy
                {
                  $project: {
                    password: 0,
                    verifyToken: 0,
                    currentRefreshToken: 0,
                    currentAccessToken: 0
                  }
                }]
              }
            }]).toArray();

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

  return function findByUser(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

var createNewBoardInvitation = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(data) {
    var validatedValue, insertValue, result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return validateSchema(data);

          case 3:
            validatedValue = _context4.sent;
            insertValue = _objectSpread(_objectSpread({}, validatedValue), {}, {
              inviterId: (0, _mongodb.ObjectId)(validatedValue.inviterId),
              inviteeId: (0, _mongodb.ObjectId)(validatedValue.inviteeId),
              boardInvitation: _objectSpread(_objectSpread({}, validatedValue.boardInvitation), {}, {
                boardId: (0, _mongodb.ObjectId)(validatedValue.boardInvitation.boardId)
              })
            });
            _context4.next = 7;
            return (0, _mongodb2.getDB)().collection(invitationCollectionName).insertOne(insertValue);

          case 7:
            result = _context4.sent;
            return _context4.abrupt("return", result);

          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4["catch"](0);
            throw new Error(_context4.t0);

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 11]]);
  }));

  return function createNewBoardInvitation(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

var update = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(id, data) {
    var updateData, result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            updateData = _objectSpread({}, data); // Quan trọng: Lọc những field không được phép cập nhật:

            Object.keys(updateData).forEach(function (fieldName) {
              if (INVALID_UPDATE_FIELDS.includes(fieldName)) delete updateData[fieldName];
            });
            _context5.next = 5;
            return (0, _mongodb2.getDB)().collection(invitationCollectionName).findOneAndUpdate({
              _id: (0, _mongodb.ObjectId)(id)
            }, {
              $set: updateData
            }, {
              returnDocument: 'after'
            });

          case 5:
            result = _context5.sent;
            return _context5.abrupt("return", result.value);

          case 9:
            _context5.prev = 9;
            _context5.t0 = _context5["catch"](0);
            throw new Error(_context5.t0);

          case 12:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 9]]);
  }));

  return function update(_x5, _x6) {
    return _ref5.apply(this, arguments);
  };
}();

var InvitationModel = {
  invitationCollectionName: invitationCollectionName,
  createNewBoardInvitation: createNewBoardInvitation,
  update: update,
  findOneById: findOneById,
  findByUser: findByUser,
  INVITATION_TYPES: INVITATION_TYPES,
  BOARD_INVITATION_STATUS: BOARD_INVITATION_STATUS
};
exports.InvitationModel = InvitationModel;