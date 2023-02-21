"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CloudinaryProvider = void 0;

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var _streamifier = _interopRequireDefault(require("streamifier"));

var _environtment = require("../config/environtment");

/**
 * Tài liệu tham khảo:
 * https://cloudinary.com/blog/node_js_file_upload_to_a_local_server_or_to_the_cloud
 * https://andela.com/insights/how-to-use-cloudinary-and-nodejs-to-upload-multiple-images/
 */
var cloudinaryV2 = _cloudinary["default"].v2;
cloudinaryV2.config({
  cloud_name: _environtment.env.CLOUDINARY_CLOUD_NAME,
  api_key: _environtment.env.CLOUDINARY_API_KEY,
  api_secret: _environtment.env.CLOUDINARY_API_SECRET
});

var streamUpload = function streamUpload(fileBuffer, folderName) {
  return new Promise(function (resolve, reject) {
    var stream = cloudinaryV2.uploader.upload_stream({
      folder: folderName
    }, function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });

    _streamifier["default"].createReadStream(fileBuffer).pipe(stream);
  });
};

var CloudinaryProvider = {
  streamUpload: streamUpload
};
exports.CloudinaryProvider = CloudinaryProvider;