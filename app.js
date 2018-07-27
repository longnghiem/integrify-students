const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require("body-parser")

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const addStudentRouter = require('./routes/addStudent');
const studentRouter = require('./routes/student');

const app = express();

// put this on top of others
app.use(bodyParser.urlencoded({ extended: false }));

// connect to DB while app.js is running
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Integrify', { useNewUrlParser: true })


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/addStudent', addStudentRouter);
//do not specify params here, but in router.get
app.use('/student', studentRouter); 

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
