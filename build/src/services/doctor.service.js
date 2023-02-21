"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DoctorService = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _doctor = require("../models/doctor.model");

var _lodash = require("lodash");

var _constants = require("../utilities/constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var createNew = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
    var createdPK, getNewPK;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _doctor.DoctorModel.createNew(data);

          case 3:
            createdPK = _context.sent;
            _context.next = 6;
            return _doctor.DoctorModel.findOneById(createdPK.insertedId.toString());

          case 6:
            getNewPK = _context.sent;
            return _context.abrupt("return", getNewPK);

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            throw new Error(_context.t0);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 10]]);
  }));

  return function createNew(_x) {
    return _ref.apply(this, arguments);
  };
}();

var update = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(data) {
    var updateData, id, updatedPK;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            updateData = _objectSpread(_objectSpread({}, data), {}, {
              updatedAt: Date.now()
            });
            id = updateData._id;
            if (updateData._id) delete updateData._id;
            _context2.next = 6;
            return _doctor.DoctorModel.update(id, updateData);

          case 6:
            updatedPK = _context2.sent;
            return _context2.abrupt("return", updatedPK);

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](0);
            throw new Error(_context2.t0);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 10]]);
  }));

  return function update(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var deleteDoctor = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(id) {
    var updatedPK;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _doctor.DoctorModel.deleteDoctor(id);

          case 3:
            updatedPK = _context3.sent;
            return _context3.abrupt("return", updatedPK);

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

  return function deleteDoctor(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

var getListDoctors = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
    var page,
        itemPerpage,
        results,
        _args4 = arguments;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            page = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : _constants.DEFAULT_CURRENT_PAGE;
            itemPerpage = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : _constants.DEFAULT_ITEMS_PER_PAGE;
            _context4.prev = 2;
            _context4.next = 5;
            return _doctor.DoctorModel.getListDoctors(parseInt(page), parseInt(itemPerpage));

          case 5:
            results = _context4.sent;

            if (results.doctors.length > 0) {
              results.doctors.map(function (elm, idx) {
                elm.id = elm._id.toString();
              });
            }

            return _context4.abrupt("return", results);

          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4["catch"](2);
            throw new Error(_context4.t0);

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[2, 10]]);
  }));

  return function getListDoctors() {
    return _ref4.apply(this, arguments);
  };
}();

var DoctorService = {
  createNew: createNew,
  update: update,
  getListDoctors: getListDoctors,
  deleteDoctor: deleteDoctor
};
exports.DoctorService = DoctorService;