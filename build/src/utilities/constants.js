"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebsiteDomain = exports.WHITELIST_DOMAINS = exports.HttpStatusCode = exports.DEFAULT_ITEMS_PER_PAGE = exports.DEFAULT_CURRENT_PAGE = void 0;

var _environtment = require("../config/environtment");

var HttpStatusCode = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500,
  EXPIRED: 410 // gone : Biến mất

};
exports.HttpStatusCode = HttpStatusCode;
var WHITELIST_DOMAINS = ['http://localhost:3000', 'http://localhost:3001', 'http://web.dangkha.net'];
exports.WHITELIST_DOMAINS = WHITELIST_DOMAINS;
var DEFAULT_ITEMS_PER_PAGE = 12;
exports.DEFAULT_ITEMS_PER_PAGE = DEFAULT_ITEMS_PER_PAGE;
var DEFAULT_CURRENT_PAGE = 1; //Default la moi truong dev

exports.DEFAULT_CURRENT_PAGE = DEFAULT_CURRENT_PAGE;
var websiteDomain = 'http://localhost:3000';

if (_environtment.env.BUILD_MODE === 'production') {
  websiteDomain = 'http://api.dangkha.net';
}

var WebsiteDomain = websiteDomain;
exports.WebsiteDomain = WebsiteDomain;