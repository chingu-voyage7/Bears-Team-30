// All Init setup
const app = require('./init/express');
const indexRouter = require('./routes/index');
const auth = require('./routes/auth');

// Show homepage and post home page
app.use('/', indexRouter);
app.use('/', auth);

// catch 404 and forward to error handler
app.use(function (err, req, res, next) {
    res.status(404).json({
        error: err
    })
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(400).json({
        error: err
    })
});

module.exports = app;
