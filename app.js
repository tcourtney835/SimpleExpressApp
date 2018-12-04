var express = require('express');               // loads the express 'library'
var path = require('path');                     // loads the path 'library', used to find path of files on server
var bodyParser = require('body-parser');        // loads the body-parser 'library', used to parse posted form data
var engine = require('express-dot-engine');     // loads the express-dot-engine 'library', for your templates (.dot files)

require('./app/models/db');                     // connect to the database server

var index = require('./app/routes/index');      // loads your file of routs

var app = express();                            // created the express app (the app you're writing)

app.engine('dot', engine.__express);            // tell the app to use dot as your template engine

// view engine setup
app.set('views', path.join(__dirname, 'app', 'views'));
app.set('view engine', 'dot');

// tell express to use the body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// tell the app to use the index file we loaded earlier
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

// this exports the app, making it available to all other code
module.exports = app;
