"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _cors2 = require("./config/cors");

var _mongodb = require("./config/mongodb");

var _environtment = require("./config/environtment");

var _v = require("./routes/v1");

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _http = _interopRequireDefault(require("http"));

var _path = _interopRequireDefault(require("path"));

var _socket = _interopRequireDefault(require("socket.io"));

var _inviteUserToBoardSocket = require("./sockets/inviteUserToBoardSocket");

(0, _mongodb.connectDB)().then(function () {
  return console.log('Connected successfully to database server!');
}).then(function () {
  return bootServer();
})["catch"](function (error) {
  console.error(error);
  process.exit(1);
});

var bootServer = function bootServer() {
  var app = (0, _express["default"])(); // Fix cái vụ Cache from disk của ExpressJS

  app.use(function (req, res, next) {
    res.set('Cache-Control', 'no-store');
    next();
  });
  app.use((0, _cookieParser["default"])());
  app.use((0, _cors["default"])(_cors2.corsOptions)); // Enable req.body data

  app.use(_express["default"].json()); // Use APIs v1

  app.use('/v1', _v.apiV1);
  app.use('/uploads', _express["default"]["static"]('uploads'));
  app.use('/', function (req, res) {
    res.sendFile(_path["default"].join(__dirname + '/frontend/index.html')); //__dirname : It will resolve to your project folder.
  }); // For real-time

  var server = _http["default"].createServer(app);

  var io = (0, _socket["default"])(server, {
    cors: _cors2.corsOptions
  });
  io.on('connection', function (socket) {
    //console.log('New client: ', socket.id)
    (0, _inviteUserToBoardSocket.inviteUserToBoardSocket)(socket);
    socket.on('disconnect', function () {
      console.log('Client disconnected: ', socket.id);
    });
  }); // app.listen(env.APP_PORT, env.APP_HOST, () => {
  //   console.log(`Hello trungquandev, I'm running at ${env.APP_HOST}:${env.APP_PORT}/`)
  // })
  // Function to serve all static files
  // inside public directory.
  //console.log(__dirname)
  //Support heroku deploy

  server.listen(process.env.PORT || _environtment.env.APP_PORT, function () {
    console.log("Hello KhaNV, I'm running at port: ".concat(process.env.PORT || _environtment.env.APP_PORT, "/"));
  });
};