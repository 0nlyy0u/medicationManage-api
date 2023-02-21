"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InvitationService = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _invitation = require("../models/invitation.model");

var _user = require("../models/user.model");

var _clinic = require("../models/clinic.model");

var _transform = require("../utilities/transform");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var createNewBoardInvitation = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data, userId) {
    var inviter, invitee, board, invitation, createdInvitation, getInvitation, resData;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _user.AuthModel.findOneById(userId);

          case 3:
            inviter = _context.sent;
            _context.next = 6;
            return _user.AuthModel.findOneByEmail(data.inviteeEmail);

          case 6:
            invitee = _context.sent;
            _context.next = 9;
            return _clinic.ClinicModel.findOneById(data.boardId);

          case 9:
            board = _context.sent;

            if (!(!invitee || !inviter || !board)) {
              _context.next = 12;
              break;
            }

            throw new Error('Inviter, invitee or board not found!');

          case 12:
            invitation = {
              inviterId: userId,
              inviteeId: invitee._id.toString(),
              type: _invitation.InvitationModel.INVITATION_TYPES.BOARD_INVITATION,
              boardInvitation: {
                boardId: data.boardId,
                status: _invitation.InvitationModel.BOARD_INVITATION_STATUS.PENDING
              }
            };
            _context.next = 15;
            return _invitation.InvitationModel.createNewBoardInvitation(invitation);

          case 15:
            createdInvitation = _context.sent;
            _context.next = 18;
            return _invitation.InvitationModel.findOneById(createdInvitation.insertedId.toString());

          case 18:
            getInvitation = _context.sent;
            resData = _objectSpread(_objectSpread({}, getInvitation), {}, {
              inviter: (0, _transform.pickUser)(inviter),
              invitee: (0, _transform.pickUser)(invitee),
              board: board
            });
            return _context.abrupt("return", resData);

          case 23:
            _context.prev = 23;
            _context.t0 = _context["catch"](0);
            throw new Error(_context.t0);

          case 26:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 23]]);
  }));

  return function createNewBoardInvitation(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getInvitations = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(userId) {
    var _getInvitations, resInvitations;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _invitation.InvitationModel.findByUser(userId);

          case 3:
            _getInvitations = _context2.sent;
            resInvitations = _getInvitations.map(function (i) {
              return _objectSpread(_objectSpread({}, i), {}, {
                inviter: i.inviter[0] || {},
                invitee: i.invitee[0] || {},
                board: i.board[0] || {}
              });
            });
            return _context2.abrupt("return", resInvitations);

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            throw new Error(_context2.t0);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 8]]);
  }));

  return function getInvitations(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

var updateBoardInvitation = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(userId, invitationId, action) {
    var getInvitation, boardId, board, boardMemberIds, boardOwnerIds, updateStatus, updateData, updatedInvitation;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _invitation.InvitationModel.findOneById(invitationId);

          case 3:
            getInvitation = _context3.sent;

            if (getInvitation) {
              _context3.next = 6;
              break;
            }

            throw new Error('Invitation not found');

          case 6:
            boardId = getInvitation.boardInvitation.boardId; // Check nếu user đã là thành viên board

            _context3.next = 9;
            return _clinic.ClinicModel.findOneById(getInvitation.boardInvitation.boardId.toString());

          case 9:
            board = _context3.sent;

            if (board) {
              _context3.next = 12;
              break;
            }

            throw new Error('Board not found');

          case 12:
            boardMemberIds = board.memberIds.map(function (i) {
              return i.toString();
            });
            boardOwnerIds = board.ownerIds.map(function (i) {
              return i.toString();
            });

            if (!(action === 'accept' && (boardMemberIds.includes(userId) || boardOwnerIds.includes(userId)))) {
              _context3.next = 16;
              break;
            }

            throw new Error('You are already a member of this board');

          case 16:
            //Khoi tạo 1 status
            updateStatus = _invitation.InvitationModel.BOARD_INVITATION_STATUS.PENDING;
            if (action === 'accept') updateStatus = _invitation.InvitationModel.BOARD_INVITATION_STATUS.ACCEPTED;
            if (action === 'reject') updateStatus = _invitation.InvitationModel.BOARD_INVITATION_STATUS.REJECTED;
            updateData = {
              boardInvitation: _objectSpread(_objectSpread({}, getInvitation.boardInvitation), {}, {
                status: updateStatus
              })
            };
            _context3.next = 22;
            return _invitation.InvitationModel.update(invitationId, updateData);

          case 22:
            updatedInvitation = _context3.sent;

            if (!(updatedInvitation.boardInvitation.status === _invitation.InvitationModel.BOARD_INVITATION_STATUS.ACCEPTED)) {
              _context3.next = 26;
              break;
            }

            _context3.next = 26;
            return _clinic.ClinicModel.pushMembers(boardId, userId);

          case 26:
            return _context3.abrupt("return", updatedInvitation);

          case 29:
            _context3.prev = 29;
            _context3.t0 = _context3["catch"](0);
            throw new Error(_context3.t0);

          case 32:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 29]]);
  }));

  return function updateBoardInvitation(_x4, _x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var InvitationService = {
  createNewBoardInvitation: createNewBoardInvitation,
  getInvitations: getInvitations,
  updateBoardInvitation: updateBoardInvitation
};
exports.InvitationService = InvitationService;