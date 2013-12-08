var mongo = require("../models/mymongo.js");

exports.index = function(req, res) {
  mongo.find("db", "songs", {}, function(model){
    console.log(model);
    res.render('index', {title: 'DJ', queue: model});
  });

 /* mongo.find("db", "queue2", {}, function(model){
    queue2 = model;
  })
  
  res.render('index', {title: 'DJ', q1: queue1, q2: queue2 });*/
};

	
