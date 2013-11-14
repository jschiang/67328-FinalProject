var mongo = require("../models/mymongo.js");

exports.index = function(req, res) {
  res.render('index', {title: 'DJ'})
};

	
