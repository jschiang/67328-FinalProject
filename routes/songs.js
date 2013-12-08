var mongo = require("../models/mymongo.js");

exports.list = function(req, res){
	//mongo.find("db", "users", {}, function(model){
		//res.send(model);
	var files = fs.readdir(__dirname + "/../public/uploads/", function(err, data){
		if (err){
			console.log(err);
		}
		else{
			res.render('songs', {songs: data});
			console.log(data);
		}
	});
		
	//});
}

exports.post = function(req, res){
	var songName = req.files.songfile.name;
	fs.readFile(req.files.songfile.path, function (err, data) {
  // ...
  var newPath = __dirname + "/../public/uploads/" + songName;
  //console.log(newPath);
  fs.writeFile(newPath, data, function (err) {
  	/*fs.readFile(newPath, function(err, data){
  		if (err){
  			console.log(err);
  		}
  		else{
  			console.log(data);
  		}
  	});*/
    res.redirect("back");
    console.log(newPath);
  });
});
}

exports.put = function(req, res){
	var songName = req.body.songName;
	var queue = req.body.queue;

	mongo.insert("db", "songs", {songName: songName, queue: queue}, function(model){
		console.log(model);
		res.send(model);
	});
}