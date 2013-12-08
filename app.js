var express = require('express')
  , routes = require('./routes'),
  user = require('./routes/user'),
  songs = require('./routes/songs'),
  http = require('http'),
  path = require('path')
  fs = require('fs'),
  hash = require('./pass').hash,
  mongo = require('./models/mymongo.js');

var app = express();
  
// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.cookieParser('shhhh, very secret'));
  app.use(express.session());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.logger('tiny'));
  app.use(express.static(__dirname + '/public'));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
  });

app.use(function(req, res, next){
  var err = req.session.error
    , msg = req.session.success;
  delete req.session.error;
  delete req.session.success;
  res.locals.message = '';
  if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
  if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
  next();
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

function restrict(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.error = 'Access denied!';
    res.redirect('/login');
  }
}

app.get('/', function(req, res){
  res.redirect('login');
});

app.get('/restricted', restrict, function(req, res){
  res.send('Wahoo! restricted area, click to <a href="/logout">logout</a>');
});

app.get('/logout', function(req, res){
  // destroy the user's session to log them out
  // will be re-created next request
  req.session.destroy(function(){
    res.redirect('/');
  });
});

app.get('/login', function(req, res){
  res.render('login');
});

app.post('/login', function(req, res){
  authenticate(req.body.username, req.body.password, function(err, user){
    if (user) {
      // Regenerate session when signing in
      // to prevent fixation 
      req.session.regenerate(function(){
        // Store the user's primary key 
        // in the session store to be retrieved,
        // or in this case the entire user object
        req.session.user = user;
        req.session.success = 'Authenticated as ' + user.name
          + ' click to <a href="/logout">logout</a>. '
          + ' You may now access <a href="/restricted">/restricted</a>.';
        res.redirect('back');
      });
    } else {
      req.session.error = 'Authentication failed, please check your '
        + ' username and password.';
      res.redirect('login');
    }
  });
});

function authenticate(name, pass, fn) {
  if (!module.parent) console.log('authenticating %s:%s', name, pass);
  mongo.find("db", "users", {username: req.params.username}, function(model){
    if (model.length<1){
      console.log("cannot find user");
    }
    else{
      var user = user: model[0];
        hash(pass, user.salt, function(err, hash){
            if (err) return fn(err);
            if (hash == user.hash) return fn(null, user);
            fn(new Error('invalid password'));
          });
      }
    } 
  });
  
}


app.listen(3333);
console.log("Express server listening to 3333");
