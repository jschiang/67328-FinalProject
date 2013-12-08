var util = require("util");

//Off Jitsu
var mongoClient = require("mongodb").MongoClient;
var server = "mongodb://localhost:27017/";

//Jitsu
/*
var mongodb = require('mongodb');
             var db = new mongodb.Db('nodejitsu_jschiang_nodejitsudb5527906001',
               new mongodb.Server('ds045988.mongolab.com', 45988, {})
             );
             db.open(function (err, db_p) {
               if (err) { throw err; }
               db.authenticate('nodejitsu_jschiang', 'iiap7e87kbirrujbsf6161eje6', function (err, replies) {
                 // You are now connected and authenticated.
               });
             });
*/

//db/:collection/:operation/:document
var doError = function (e) {
	util.debug("ERROR: "+e);
	throw new Error(e);
	}

// INSERT
exports.insert = function(database, collection, query, callback) {
  //Off Jitsu
  mongoClient.connect(server+database, function(err, db) {
    if (err) doError(err);

    db.collection(collection).insert(query, {safe:true}, function(err, crsr) {
      callback(crsr);
  		});
  	});
  }
				
// FIND
exports.find = function(database, collection, query, callback) {
 //Off jitsu
  mongoClient.connect(server+database, function(err, db) {
    if (err) doError(err);

    var crsr = db.collection(collection).find(query);
      crsr.toArray(function(err, docs) {
        if (err) doError(err);
        callback(docs);
        });
 		});
  	}

// UPDATE
exports.update = function(database, collection, query, callback) {
  //Off Jitsu
  mongoClient.connect(server+database, function(err, db) {
    if (err) doError(err);
    console.log(query.find);
    console.log(query.update);

    db.collection(collection).update(query.find,
                                      query.update, 
                                      {new:true}, 
                                      function(err, crsr) {
                                        if (err) doError(err);
                                        callback('Update succeeded!');
                                      });
 	});
  }

//Delete
exports.delete = function(database, collection, query, callback){
 //Off Jitsu
 console.log(query);
  mongoClient.connect(server+database, function(err, db){
    if (err) doError(err);

    db.collection(collection).remove(query, function(err, crsr){
        if (err) doError(err);
        callback('Deleted User');
      });
 });
}

