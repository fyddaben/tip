/**
 * Module dependencies.
 */
var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./app/routes');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3005);
app.set('views', __dirname + '/public');
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.use(express.favicon());
app.use(express.logger('dev'));

app.use(bodyParser.json());
app.use(express.methodOverride());
app.use(app.router);

app.use(express.static(path.join(__dirname, 'public')));

//跳转地址
app.get('/', routes.index);

//修改接口
app.get('/article', routes.query);
app.post('/article', routes.save);
app.put('/article/:id', routes.update);

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
