"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClinicModel = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _joi = _interopRequireDefault(require("joi"));

var _mongodb = require("mongodb");

var _mongodb2 = require("../config/mongodb");

var _algorithms = require("../utilities/algorithms");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

// Define Board collection
var clinicCollectionName = 'clinics';

var boardCollectionSchema = _joi["default"].object({
  name: _joi["default"].string().required().min(1).max(50).trim(),
  manager: _joi["default"].string().required().min(10).max(50).trim(),
  hotline: _joi["default"].string().required().min(10).max(50).trim(),
  email: _joi["default"].string().required().min(10).max(50).trim(),
  address: _joi["default"].string().required().min(10).max(256).trim(),
  status: _joi["default"].string().required().min(5).max(50).trim(),
  description: _joi["default"].string().min(3).max(256).trim(),
  createdAt: _joi["default"].date().timestamp()["default"](Date.now()),
  updatedAt: _joi["default"].date().timestamp()["default"](null),
  _destroy: _joi["default"]["boolean"]()["default"](false)
});

var INVALID_UPDATE_FIELDS = ['_id', 'createdAt'];

var validateSchema = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return boardCollectionSchema.validateAsync(data, {
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
            return (0, _mongodb2.getDB)().collection(clinicCollectionName).findOne({
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

var createNew = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(data) {
    var createData, result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return validateSchema(data);

          case 3:
            createData = _context3.sent;
            _context3.next = 6;
            return (0, _mongodb2.getDB)().collection(clinicCollectionName).insertOne(createData);

          case 6:
            result = _context3.sent;
            return _context3.abrupt("return", result);

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](0);
            throw new Error(_context3.t0);

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 10]]);
  }));

  return function createNew(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

var update = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(id, data) {
    var updateData, result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            updateData = _objectSpread({}, data);
            Object.keys(updateData).forEach(function (fieldName) {
              if (INVALID_UPDATE_FIELDS.includes(fieldName)) {
                delete updateData[fieldName];
              }
            });
            _context4.next = 5;
            return (0, _mongodb2.getDB)().collection(clinicCollectionName).findOneAndUpdate({
              _id: (0, _mongodb.ObjectId)(id)
            }, {
              $set: updateData
            }, {
              returnDocument: 'after'
            });

          case 5:
            result = _context4.sent;
            return _context4.abrupt("return", result.value);

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](0);
            throw new Error(_context4.t0);

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 9]]);
  }));

  return function update(_x4, _x5) {
    return _ref4.apply(this, arguments);
  };
}();

var deleteClinic = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(id) {
    var result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return (0, _mongodb2.getDB)().collection(clinicCollectionName).deleteOne({
              _id: new _mongodb.ObjectId(id)
            });

          case 3:
            result = _context5.sent;
            return _context5.abrupt("return", result.value);

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](0);
            throw new Error(_context5.t0);

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 7]]);
  }));

  return function deleteClinic(_x6) {
    return _ref5.apply(this, arguments);
  };
}();

var getListClinics = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(page, itemPerpage) {
    var _res$totalClinic$, queryConditions, query, res;

    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            queryConditions = [{
              _destroy: false
            }];
            _context6.next = 4;
            return (0, _mongodb2.getDB)().collection(clinicCollectionName).aggregate([{
              $match: {
                $and: queryConditions
              }
            }, {
              $sort: {
                createdAt: -1
              } // Sắp xếp dữ liệu theo title

            }, {
              $facet: {
                clinics: [{
                  $skip: (0, _algorithms.pagingSkipValue)(page, itemPerpage)
                }, {
                  $limit: itemPerpage
                }],
                totalClinic: [{
                  $count: 'countedClinics'
                }]
              }
            }], {
              collation: {
                locale: 'en'
              }
            }).toArray();

          case 4:
            query = _context6.sent;
            //aggregate: tổng hợp
            res = query[0];
            return _context6.abrupt("return", {
              clinics: res.clinics || [],
              totalClinic: ((_res$totalClinic$ = res.totalClinic[0]) === null || _res$totalClinic$ === void 0 ? void 0 : _res$totalClinic$.countedClinics) || 0
            });

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

  return function getListClinics(_x7, _x8) {
    return _ref6.apply(this, arguments);
  };
}();

var ClinicModel = {
  createNew: createNew,
  update: update,
  findOneById: findOneById,
  getListClinics: getListClinics,
  clinicCollectionName: clinicCollectionName,
  deleteClinic: deleteClinic
};
exports.ClinicModel = ClinicModel;