var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sessionConfig = require('./modules/session.config');

var passport = require('./strategy/auth.js');

// Route includes
var indexRouter = require('./routes/index.router');

var port = process.env.PORT || 5000;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Serve back static files
app.use(express.static('./server/public'));

// Catch all bucket, must be last!
app.use('/', indexRouter);

// Listen //
app.listen(port, function(){
   console.log('Listening on port:', port);
});