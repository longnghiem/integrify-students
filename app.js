const createError = require('http-errors'),
      express = require('express'),
      path = require('path'),
      cookieParser = require('cookie-parser'),
      logger = require('morgan'),
      bodyParser = require("body-parser"), //bodyParser is imported in app.js since all the reponses are handle here
      passport = require("passport"),
      LocalStrategy = require("passport-local"),
      methodOverride = require("method-override")

const studentRoutes = require("./routes/students"),
      commentRoutes = require("./routes/comments"),
      indexRoutes   = require("./routes/index")      

const User = require("./models/user")      

const app = express();
const seedDB = require('./utils/seeds')
seedDB();

// put this on top of other app.use
app.use(bodyParser.urlencoded({ extended: true })); //use extended: true to enable bracket notation 
app.use(methodOverride("_method"))

// connect to DB while app.js is running
const mongoose = require('mongoose');
/* mongoose.connect('mongodb://localhost:27017/Integrify', */ 
mongoose.connect('mongodb://mikasa18:mikasa18@ds115442.mlab.com:15442/integrify', 
{ useNewUrlParser: true })

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

//including currentUser: req.user in every view files rendered
//put this before the routes
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next()
})

//ROUTES
app.use("/", indexRoutes)
app.use("/students", studentRoutes)
app.use("/students/:id/comments", commentRoutes)

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
