var mongo = require("../models/mymongo.js");

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
	var fname = req.body.firstname;
	var lname = req.body.lastname;

	mongo.insert("db", "users", {username: uname, firstname: fname, lastname: lname}, function(model){
		console.log('Inserted' + model);
	});
	mongo.find("db", "users", {}, function(model){
		//console.log(model);
		res.render('users', {users: model});
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
	var	fName = req.body.newfName;
	var lName = req.body.newlName;
	console.log(uName);
	mongo.update("db", "users", {find: {username: oldName}, update: {$set:{username:uName, firstname:fName, lastname:lName}}}, function(model){
			res.send(model);
	});
}

	
