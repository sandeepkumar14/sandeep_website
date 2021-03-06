/* jshint esnext: true*/

//««««««««««««««««««««
// Required Modules 
//««««««««««««««««««««
var express = require('express');
var bodyParser= require("body-parser");
var logger= require("morgan");
var path = require('path'); 
var moment = require("moment");
var cookieParser = require('cookie-parser');
var mongoose= require("mongoose");
var fs = require("fs"); 
var routes = require('./node-routes/routes');
var config= require("./config");
var server = express();

//««««««««««««««««««««««««««««
// Template/view engine setup
//««««««««««««««««««««««««««««
server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, 'views/pages'));


//««««««««««««««««««««««««««««
//Mongolab database
//««««««««««««««««««««««««««««
mongoose.connect(config.database, function(err){
   if (err) {
      console.log(err);
   }else{
      console.log("The database is connected");
   }
});

//««««««««««««««««««««««««««««
// Morgan as dev Dependency 
//««««««««««««««««««««««««««««
server.use(logger('dev'));

//««««««««««««««««««««««««««««
// bodyParser
//««««««««««««««««««««««««««««
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
   extended: true 
}));

//««««««««««««««««««««««««««««
// cookie Parser
//««««««««««««««««««««««««««««
server.use(cookieParser());

//««««««««««««««««««««««««««««
// Static file (middleware)
//««««««««««««««««««««««««««««
server.use(express.static(path.join(__dirname, '/development')));

//««««««««««««««««««««««««««««
// Routing
//««««««««««««««««««««««««««««
server.use('/', routes);

//««««««««««««««««««««««««««««
// moment (Showing data & time)
//««««««««««««««««««««««««««««
console.log(moment().format('llll')); 



//««««««««««««««««««««««««««««
//Environment Variable
//««««««««««««««««««««««««««««
// server.set('port', (process.env.PORT || 5000));

// «««««««««««««««««««««««««««««««««««««««
// catch 404 and forward to error handler
//««««««««««««««««««««««««««««««««««««««««
server.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//««««««««««««««««««««««««««««
// error handlers
//««««««««««««««««««««««««««««

// development error handler
// will print stacktrace
if (server.get('env') === 'development') {
  server.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}




// production error handler
// no stacktraces leaked to user
server.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

//««««««««««««««««««««««««««««
//Export server as module
//««««««««««««««««««««««««««««
module.exports = server;















