'use strict';

/**
* Module dependencies.
*/
var express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  compress = require('compression'),
  helmet = require('helmet'),
  config = require('./config'),
  consolidate = require('consolidate'),
  path = require('path');

module.exports = function() {
  // Initialize express app
  var app = express();

  // Setting application local variables
  app.locals.title = config.app.title;
  app.locals.description = config.app.description;
  app.locals.keywords = config.app.keywords;
  app.locals.jsFiles = config.getJavaScriptAssets();
  app.locals.cssFiles = config.getCSSAssets();

  // Passing the request url to environment locals
  app.use(function(req, res, next) {
    res.locals.url = req.protocol + ':// ' + req.headers.host + req.url;
    next();
  });

  // Should be placed before express.static
  app.use(compress({
    filter: function(req, res) {
      return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
    },
    level: 9
  }));

  // Showing stack errors
  app.set('showStackError', true);

  // Set swig as the template engine
  app.engine('server.view.html', consolidate[config.templateEngine]);

  // Set views path and view engine
  app.set('view engine', 'server.view.html');
  app.set('views', './app/views');

  // Environment dependent middleware
  if (process.env.NODE_ENV === 'development') {
    // Enable logger (morgan)
    app.use(morgan('dev'));

    // Disable views cache
    app.set('view cache', false);
  } else if (process.env.NODE_ENV === 'production') {
    app.locals.cache = 'memory';
  }

  // Request body parsing middleware should be above methodOverride
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // Enable jsonp
  app.enable('jsonp callback');

  /*
  Enable helmet default strategies to secure Express headers
   - xssFilter adds some small XSS protections
   - noSniff to keep clients from sniffing the MIME type
   - ieNoOpen sets X-Download-Options for IE8+
   - hsts for HTTP Strict Transport Security
   - hidePoweredBy to remove the X-Powered-By header
   - frameguard to prevent clickjacking
   - dnsPrefetchControl controls browser DNS prefetching
  */
  app.use(helmet());

  // Setting the app router and static folder
  app.use(express.static(path.resolve('./public')));

  // Globbing routing files
  config.getGlobbedFiles('./app/routes/**/*.js').forEach(function(routePath) {
    require(path.resolve(routePath))(app);
  });

  // Assume 'not found' in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
  app.use(function(err, req, res, next) {
    // If the error object doesn't exists
    if (!err) return next();

    // Log it
    console.error(err.stack);

    // Error page
    res.status(500).render('500', {
      error: err.stack
    });
  });

  // Assume 404 since no middleware responded
  app.use(function(req, res) {
    res.status(404).render('404', {
      url: req.originalUrl,
      error: 'Not Found'
    });
  });

  return app;
};
