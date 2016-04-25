var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//websocket
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  setTimeout(function(){
    ws.send('4s 之后 了 发送 something');
  },4000) 
});

var routes = require('./routes/index');
// var routes = require('./routes/data');

var settings = require('./settings');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var ejs = require('ejs');
var users = require('./routes/users');

var app = express();//创建一个express应用程序
app.engine('html', ejs.__express);//注册模板引擎的callback来处理扩展名为ext的文件
app.set('view engine', 'html');//将设置项name的值设置为value
//sjr
// view engine setup
/*app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');*/

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use()的顺序非常重要，它们将被顺序调用,决定了中间件的优先级
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));//使用”./public”来管理静态文件，使用”express.static()”中间件
app.use(cookieParser());
app.use(session({
    secret: settings.cookieSecret,
    key: settings.db,//cookie name
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
    store: new MongoStore({
        db: settings.db,
        host: settings.host,
        port: settings.port
    })
}));
app.use(flash());
app.use('/', routes);//s--设置路由
app.use('/users', users);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(8000, function () {
    console.log('myApp启动');
});
module.exports = app;
