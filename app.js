console.log('App starting... Version: 1.3.0 (Cloudinary Integrated)');
console.log('Cloudinary Config Check:', {
  hasCloudName: !!process.env.CLOUDINARY_CLOUD_NAME,
  hasApiKey: !!process.env.CLOUDINARY_API_KEY,
  hasApiSecret: !!process.env.CLOUDINARY_API_SECRET
});
require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

const connectDB = require('./lib/db');

// Connect to MongoDB
connectDB();

// Mongoose connection state logging
mongoose.connection.on('connected', () => console.log('Mongoose connected to MongoDB Atlas'));
mongoose.connection.on('error', (err) => console.error('Mongoose connection error:', err));
mongoose.connection.on('disconnected', () => console.log('Mongoose disconnected'));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var membersRouter = require('./routes/members');
var adminRouter = require('./routes/admin');
var galleryRouter = require('./routes/gallery');
var auth = require('./middleware/auth');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Database connection middleware for Vercel
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('DB Connection Middleware Error:', err);
    res.status(500).send('Database connection error');
  }
});

// Global vault status middleware
app.use((req, res, next) => {
  res.locals.isUnlocked = req.cookies && req.cookies.vault_unlocked === 'true';
  next();
});

// Database status route
app.get('/db-status', (req, res) => {
  const status = mongoose.connection.readyState;
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  res.json({
    status: states[status] || 'unknown',
    connected: status === 1,
    host: mongoose.connection.host ? 'Protected' : 'None'
  });
});

app.use('/', indexRouter);
app.use('/users', auth, usersRouter);
app.use('/members', auth, membersRouter);
app.use('/admin', auth, adminRouter);
app.use('/gallery', auth, galleryRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
