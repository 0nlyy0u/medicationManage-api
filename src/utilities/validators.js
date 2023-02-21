export const EMAIL_RULE = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const USERNAME_RULE = /^[a-z0-9]{5,30}$/
export const PASSWORD_RULE = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d\W]{8,256}$/
export const FIELD_REQUIRED_MESSAGE = 'This field is required.'
export const PASSWORD_RULE_MESSAGE = 'At least 1 letter, a number, at least 8 characters.'
export const USERNAME_RULE_MESSAGE = 'Username phải gồm các chữ thường và số, không có ký tự đặc biệt, độ dài 5 - 30 ký tự '
export const PASSWORD_CONFIRM_MESSAGE = 'Password confirmation not match.'
export const EMAIL_RULE_MESSAGE = 'Email is invalid.'
