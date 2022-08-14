var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
var request = require('request');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// app.get('/getWeatherToronto', (req, res) => {
//   request('https://www.google.com', function (error, response, body) {
//     if (!error && response.statusCode === 200) {
//       res.send(body);
//     }
//   });
// });

const axios = require('axios');
// const params = {
//   access_key: '0a97fbf0f1e8a36ab7702851227b567a',
//   query: 'New York',
// };

axios
  .get('https://www.shiborithreads.com', {})
  .then((response) => {
    const apiResponse = response.data;
    console.log(apiResponse);
    // console.log(`Current temperature in ${apiResponse.location}`);
  })
  .catch((error) => {
    console.log(error);
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
