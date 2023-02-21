"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SendInBlueProvider = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _environtment = require("../config/environtment");

var SibApiV3Sdk = require('sib-api-v3-sdk');

var client = SibApiV3Sdk.ApiClient.instance;
var apiKey = client.authentications['api-key'];
apiKey.apiKey = _environtment.env.API_KEY;
var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
var sender = {
  email: 'dangkha.sell@gmail.com',
  name: 'Dang Kha'
};

var sendEmailVerify = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(email, subject, htmlContent) {
    var receiver;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            receiver = [{
              email: email
            }];

            try {
              apiInstance.sendTransacEmail({
                sender: sender,
                name: subject,
                to: receiver,
                subject: subject,
                type: 'classic',
                htmlContent: htmlContent
              }).then(function (data) {
                return console.log(data);
              })["catch"](function (err) {
                return console.error(err);
              });
            } catch (error) {
              console.log(error);
            }

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function sendEmailVerify(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var SendInBlueProvider = {
  sendEmailVerify: sendEmailVerify
};
exports.SendInBlueProvider = SendInBlueProvider;