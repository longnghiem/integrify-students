const createError = require('http-errors'),
      express = require('express'),
      path = require('path'),
      cookieParser = require('cookie-parser'),
      logger = require('morgan'),
      bodyParser = require("body-parser"), //bodyParser is imported in app.js since all the reponses are handle here
      passport = require("passport"),
      LocalStrategy = require("passport-local"),
      methodOverride = require("method-override")

const indexRouter = require('./routes/index'),
      addStudentRouter = require('./routes/addStudent'),
      studentRouter = require('./routes/student'),
      registerRouter = require('./routes/register')
      loginRouter = require('./routes/login')
      logoutRouter = require('./routes/logout')

const User = require("./models/user")      

const app = express();
const seedDB = require('./utils/seeds')
seedDB();

// put this on top of others
app.use(bodyParser.urlencoded({ extended: true })); //use extended: true to enable bracket notation 
app.use(methodOverride("_method"))

// connect to DB while app.js is running
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Integrify', { useNewUrlParser: true })

/* Passport configuration */
app.use(require("express-session")({
  secret: "This is secretly written",
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

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
app.use('/addStudent', addStudentRouter);
//do not specify params here, but in router.get
app.use('/student', studentRouter);
app.use('/register', registerRouter)
app.use('/login', loginRouter)
app.use('/logout', logoutRouter)

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
