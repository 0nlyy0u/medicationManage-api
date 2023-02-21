"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InvitationController = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _constants = require("../utilities/constants");

var _invitation = require("../services/invitation.service");

var createNewBoardInvitation = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var userId, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            userId = req.jwtDecoded._id;
            _context.next = 4;
            return _invitation.InvitationService.createNewBoardInvitation(req.body, userId);

          case 4:
            result = _context.sent;
            res.status(_constants.HttpStatusCode.OK).json(result);
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

  return function createNewBoardInvitation(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getInvitations = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var userId, result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            userId = req.jwtDecoded._id;
            _context2.next = 4;
            return _invitation.InvitationService.getInvitations(userId);

          case 4:
            result = _context2.sent;
            res.status(_constants.HttpStatusCode.OK).json(result);
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            res.status(_constants.HttpStatusCode.INTERNAL_SERVER).json({
              errors: _context2.t0.message
            });

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 8]]);
  }));

  return function getInvitations(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var updateBoardInvitation = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var invitationId, action, userId, result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            invitationId = req.params.invitationId;
            action = req.body.action;
            userId = req.jwtDecoded._id;
            _context3.next = 6;
            return _invitation.InvitationService.updateBoardInvitation(userId, invitationId, action);

          case 6:
            result = _context3.sent;
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

  return function updateBoardInvitation(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var InvitationController = {
  createNewBoardInvitation: createNewBoardInvitation,
  getInvitations: getInvitations,
  updateBoardInvitation: updateBoardInvitation
};
exports.InvitationController = InvitationController;