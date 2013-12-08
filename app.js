var express = require('express')
  , routes = require('./routes'),
  user = require('./routes/user'),
  songs = require('./routes/songs'),
  http = require('http'),
  path = require('path')
  fs = require('fs');

var app = express();
  
// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.logger('tiny'));
  app.use(express.static(__dirname + '/public'));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
  });

// Routes
app.get('/', routes.index);
//app.get('/users/:db/:collection/:operation', user.mongo);

app.get('/users', user.list);
app.get('/users/:username', user.get);
app.put('/users', user.put);
app.post('/users/:username', user.post);
app.delete('/users/:username', user.delete);

app.get('/songs', songs.list);
app.post('/songs', songs.post);
app.put('/songs', songs.put);



app.listen(3333);
console.log("Express server listening to 3333");
