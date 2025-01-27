var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var wishlistRouter = require('./routes/wishlist')
var catalogRouter = require('./routes/catalog') //imported
var cartRouter = require('./routes/cart')
var accountRouter = require('./routes/account')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//logging in the console
app.use(logger('dev'));

//readimg post method data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//cookie management
app.use(cookieParser());

app.use(cors());

//serving the static files in public folder
app.use(express.static(path.join(__dirname, 'public')));

//custom middleware
let mymiddleware = function(req,res,next){
  console.log(req.method,"Mymiddleware is called");
  next();
}
app.use(mymiddleware)

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/wishlist',wishlistRouter);
app.use('/catalog',catalogRouter) //use object
app.use('/cart',cartRouter)
app.use('/account',accountRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
