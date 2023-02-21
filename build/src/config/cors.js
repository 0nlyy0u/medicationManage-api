"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.corsOptions = void 0;

var _constants = require("../utilities/constants");

var _environtment = require("./environtment");

var corsOptions = {
  origin: function origin(_origin, callback) {
    //Hỗ trợ việc call api bằng postman trên môi trường dev
    //Khi sử dụng postman thì origin sẽ có giá trị là undefined
    if (!_origin && _environtment.env.BUILD_MODE === 'dev') {
      return callback(null, true);
    }

    if (_constants.WHITELIST_DOMAINS.indexOf(_origin) !== -1) {
      return callback(null, true);
    }

    return callback(new Error("".concat(_origin, " not allowed by CORS.")));
  },
  optionsSuccessStatus: 200,
  credentials: true // Nhận cookie

};
exports.corsOptions = corsOptions;