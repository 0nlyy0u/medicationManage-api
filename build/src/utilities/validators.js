"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.USERNAME_RULE_MESSAGE = exports.USERNAME_RULE = exports.PASSWORD_RULE_MESSAGE = exports.PASSWORD_RULE = exports.PASSWORD_CONFIRM_MESSAGE = exports.FIELD_REQUIRED_MESSAGE = exports.EMAIL_RULE_MESSAGE = exports.EMAIL_RULE = void 0;
var EMAIL_RULE = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
exports.EMAIL_RULE = EMAIL_RULE;
var USERNAME_RULE = /^[a-z0-9]{5,30}$/;
exports.USERNAME_RULE = USERNAME_RULE;
var PASSWORD_RULE = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d\W]{8,256}$/;
exports.PASSWORD_RULE = PASSWORD_RULE;
var FIELD_REQUIRED_MESSAGE = 'This field is required.';
exports.FIELD_REQUIRED_MESSAGE = FIELD_REQUIRED_MESSAGE;
var PASSWORD_RULE_MESSAGE = 'At least 1 letter, a number, at least 8 characters.';
exports.PASSWORD_RULE_MESSAGE = PASSWORD_RULE_MESSAGE;
var USERNAME_RULE_MESSAGE = 'Username phải gồm các chữ thường và số, không có ký tự đặc biệt, độ dài 5 - 30 ký tự ';
exports.USERNAME_RULE_MESSAGE = USERNAME_RULE_MESSAGE;
var PASSWORD_CONFIRM_MESSAGE = 'Password confirmation not match.';
exports.PASSWORD_CONFIRM_MESSAGE = PASSWORD_CONFIRM_MESSAGE;
var EMAIL_RULE_MESSAGE = 'Email is invalid.';
exports.EMAIL_RULE_MESSAGE = EMAIL_RULE_MESSAGE;