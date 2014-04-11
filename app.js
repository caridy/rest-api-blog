
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./controller');
var http = require('http');
var path = require('path');

var app = express();



// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.bodyParser());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

app.get('/blogs', routes.list);
app.get('/blog/:id',routes.blog);
app.post('/blog',routes.add);
app.delete('/blog/:id',routes.delete);
app.put('/blog/:id',routes.update);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
