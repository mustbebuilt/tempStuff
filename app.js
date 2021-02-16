var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();
const port = process.env.PORT || "8000";
const routes = require('./routes/routes');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes(app))
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

// Database

var MongoClient = require('mongodb').MongoClient

//mongodb://localhost:27017
//mongodb+srv://admin:CyyuBE7j1c8BlVx2@cluster0.wbsei.mongodb.net/test
//mongodb+srv://Admin:$HU3002943@budgetapp.qombv.mongodb.net/test?retryWrites=true&w=majority
const uri = "mongodb+srv://mjcAtlas01:Uy78Hq234$g@mycluster01.ica5f.azure.mongodb.net/test";

MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {

  app.set('myDb', client.db('myMoviesDb'));

})


app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});

module.exports = app;
