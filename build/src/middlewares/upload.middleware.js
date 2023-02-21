"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UploadMiddleware = exports.LIMIT_COMMON_FILE_SIZE = exports.ALLOW_COMMON_FILE_TYPES = void 0;

var _multer = _interopRequireDefault(require("multer"));

var LIMIT_COMMON_FILE_SIZE = 10485760; // byte = 10 MB

exports.LIMIT_COMMON_FILE_SIZE = LIMIT_COMMON_FILE_SIZE;
var ALLOW_COMMON_FILE_TYPES = ['image/jpg', 'image/jpeg', 'image/png']; //Kiểm tra loại file nào được chấp nhận

exports.ALLOW_COMMON_FILE_TYPES = ALLOW_COMMON_FILE_TYPES;

var fileFilter = function fileFilter(req, file, cb) {
  if (!ALLOW_COMMON_FILE_TYPES.includes(file.mimetype)) {
    var errMessage = 'File type not allowed';
    return cb(errMessage, null);
  }

  return cb(null, true);
}; // Khởi tạo biến cấu hình cho việc lưu trữ file upload


var diskStorage = _multer["default"].diskStorage({
  destination: function destination(req, file, callback) {
    // Định nghĩa nơi file upload sẽ được lưu lại
    callback(null, 'src/uploads/');
  },
  filename: function filename(req, file, callback) {
    // ở đây các bạn có thể làm bất kỳ điều gì với cái file nhé.
    // Mình ví dụ chỉ cho phép tải lên các loại ảnh png & jpg
    var math = ['image/png', 'image/jpeg'];

    if (math.indexOf(file.mimetype) === -1) {
      var errorMess = "The file <strong>".concat(file.originalname, "</strong> is invalid. Only allowed to upload image jpeg or png.");
      return callback(errorMess, null);
    } // Tên của file thì mình nối thêm một cái nhãn thời gian để đảm bảo không bị trùng.


    var filename = "".concat(Date.now(), "-khanv-").concat(file.originalname);
    callback(null, filename);
  }
});

var upload = (0, _multer["default"])({
  limits: {
    fileSize: LIMIT_COMMON_FILE_SIZE,
    files: 1
  },
  fileFilter: fileFilter //storage: diskStorage

});
var UploadMiddleware = {
  upload: upload
};
exports.UploadMiddleware = UploadMiddleware;