"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClinicController = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _constants = require("../utilities/constants");

var _clinic = require("../services/clinic.service");

var createNew = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var userId, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            userId = req.jwtDecoded._id;
            _context.next = 4;
            return _clinic.ClinicService.createNew(req.body);

          case 4:
            result = _context.sent;
            res.status(_constants.HttpStatusCode.OK).json({
              stt: true,
              msg: 'Thêm mới thành công',
              data: result
            });
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            res.status(_constants.HttpStatusCode.INTERNAL_SERVER).json({
              errors: _context.t0.message
            });

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));

  return function createNew(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var update = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _clinic.ClinicService.update(req.body);

          case 3:
            result = _context2.sent;
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

  return function update(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var getListClinics = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$query, page, itemPerpage, results;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _req$query = req.query, page = _req$query.page, itemPerpage = _req$query.itemPerpage;
            _context3.next = 4;
            return _clinic.ClinicService.getListClinics(page, itemPerpage);

          case 4:
            results = _context3.sent;
            res.status(_constants.HttpStatusCode.OK).json(results);
            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](0);
            res.status(_constants.HttpStatusCode.INTERNAL_SERVER).json({
              errors: _context3.t0.message
            });

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 8]]);
  }));

  return function getListClinics(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var deleteClinic = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var id, result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            id = req.query.id;
            _context4.next = 4;
            return _clinic.ClinicService.deleteClinic(id);

          case 4:
            result = _context4.sent;
            res.status(_constants.HttpStatusCode.OK).json({
              stt: true,
              msg: 'Xoá phòng khám thành công',
              data: result
            });
            _context4.next = 11;
            break;

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](0);
            res.status(_constants.HttpStatusCode.INTERNAL_SERVER).json({
              errors: _context4.t0.message
            });

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 8]]);
  }));

  return function deleteClinic(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

var ClinicController = {
  createNew: createNew,
  update: update,
  getListClinics: getListClinics,
  deleteClinic: deleteClinic
};
exports.ClinicController = ClinicController;