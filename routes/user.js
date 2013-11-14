var mongo = require("../models/mymongo.js");

exports.list = function(req, res){
	mongo.find("db", "users", {}, function(model){
		//res.send(model);
		res.render('teams', {teams: model});
	});
}

exports.put = function(req, res){
	var name = req.body.username
	mongo.insert("db", "users", {username: name}, function(model){
		res.send(model);
	});
}

exports.delete = function(req, res){
	var name = req.body.username
	mongo.delete("db", "users", {username: name}, function(model){
		res.send(model);
	});
}

exports.post = function(req, res){
	var name = req.body.username
	//mongo.update("db", "users", {find: {username:name}, update: {}})
}

	
