var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//ejs模板引擎引入
var engine=require('ejs-mate');

//引入markdown模块，用于显示格式化设置
var MarkdownIt=require('markdown-it');
var md= new MarkdownIt();


var config=require('./config')

//上传文件模块busboy
var busboy=require('connect-busboy');


//会话引入，用redis来储存,并且把seeion关联起来
var session=require('express-session')
var RedisStore=require('connect-redis')(session);

//var index = require('./routes/index');
//var users = require('./routes/users');
var webRouter = require('./routes/web_router');

var app = express();

// view engine setup
app.engine('html',engine)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public',express.static(path.join(__dirname, 'public')));

//设置session，secret是加密，store是储存的地方
app.use(session({
	secret:'ccccccccccccccc',
	store:new RedisStore({
		port:6379,
		host:'127.0.0.1'
	}),
	resave:true,
	saveUninitialized:true
}))

//上传文件模块busboy设置
app.use(busboy());


//中间件检测登陆状态
app.use(function(req,res,next){
	app.locals.current_user=req.session.user;
	next();
})

//loacl属性贯穿整个应用生命周期，什么时候都可以用
app.locals.config=config;

app.locals.md=md;

//app.use('/', index);
//app.use('/users', users);
app.use('/',webRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000);

module.exports = app;
