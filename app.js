var createError = require('http-errors');

// All Init setup
var app = require("./init/express");
var passport = require("./init/passport") (app);


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var auth = require('./routes/auth')


// Success and Error page
app.get('/success', (req, res) => res.send("Welcome "+req.query.username+"!!"));
app.get('/error', (req, res) => res.send("error logging in"));


// Show homepage and post home page
app.use('/', indexRouter);
app.use('/', auth);
app.use('/users', usersRouter);


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
