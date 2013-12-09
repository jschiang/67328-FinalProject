var mongo = require("../models/mymongo.js");
var crypto = require('crypto');
var hash = require('../pass.js').hash;

exports.list = function(req, res){
	mongo.find("db", "users", {}, function(model){
		//res.send(model);
		res.render('users', {users: model});
	});
}

exports.get = function(req, res){
	mongo.find("db", "users", {username: req.params.username}, function(model){
		res.render('user', {user: model[0]} );
		console.log(model);
	});
}

exports.put = function(req, res){
	var uname = req.body.username;
	var password = req.body.password;

	var salt = makeSalt();
	hash(password, salt, function(err, hash){
      	if(err){
      		throw (err);
      	}
      	else {
	      	mongo.insert("db", "users", {username: uname, password: hash, salt: salt}, function(model){
				console.log('Inserted' + model);
			});
			mongo.find("db", "users", {}, function(model){
				//console.log(model);
				res.render('users', {users: model});
			});
		}
	});
}

exports.delete = function(req, res){
	var name = req.body.username;
	mongo.delete("db", "users", {username: name}, function(model){
		res.send(model);
	});
}

exports.post = function(req, res){
	var oldName = req.body.oldName;
	var uName = req.body.newuName;
	var oldPass = req.body.oldPass;
	var newPass = req.body.newPass;
	//console.log(uName);
	var salt = makeSalt();
	authenticate(oldName, oldPass, function(err, user){
		hash(newPass, salt, function(err, hash){
			if (user){
				mongo.update("db", "users", {find: {username: oldName}, update: {$set:{username:uName, password: hash, salt: salt}}}, function(model){
					res.send(model);
				});
			}
			else {
				req.session.error = 'Authentication failed, please check your username and password'
				res.redirect('/users');
			}
		});
	});
}

function makeSalt()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function authenticate(name, pass, fn) {
  if (!module.parent) console.log('authenticating %s:%s', name, pass);
  mongo.find("db", "users", {username: name}, function(model){
    if (model.length<1){
      console.log("cannot find user");
      fn(new Error('invalid username password combination'));
    }
    else{
      var user = model[0];
        hash(pass, user.salt, function(err, hash){
            if (err) return fn(err);
            if (hash == user.password){
              console.log("user matches"); 
              return fn(null, user);
            }
            fn(new Error('invalid username password combination'));
          });
    } 
  });
  
}




	
