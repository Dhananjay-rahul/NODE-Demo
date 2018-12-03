
/*///
let mongoose = require('mongoose');
let url = 'mongodb://localhost/resthub';

mongoose.connect(url, function(err, db) {
    if (err)
    console.log(err);

  });
var db = mongoose.connection;
exports.addStudent= function(req, res) {
    var student = req.body;
    console.log('Adding wine: ' + JSON.stringify(student));
    db.collection('students', function(err, collection) {
        collection.insert(student, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}
exports.new = function (req, res) {

  db.createCollection("employee", {
    validator: {
       $jsonSchema: {
          bsonType: "object",
          required: [ "name", "year", "major", "gpa", "address.city", "address.street" ],
          properties: {
             name: {
                bsonType: "string",
                description: "must be a string and is required"
             },
             gender: {
                bsonType: "string",
                description: "must be a string and is not required"
             },
             year: {
                bsonType: "int",
                minimum: 2017,
                maximum: 3017,
                exclusiveMaximum: false,
                description: "must be an integer in [ 2017, 3017 ] and is required"
             },
             major: {
                enum: [ "Math", "English", "Computer Science", "History", null ],
                description: "can only be one of the enum values and is required"
             },
             gpa: {
                bsonType: [ "double" ],
                minimum: 0,
                description: "must be a double and is required"
             },
             "address.city" : {
                bsonType: "string",
                description: "must be a string and is required"
             },
             "address.street" : {
                bsonType: "string",
                description: "must be a string and is required"
             }
          }
       }
    }
 })
 res.json({
    message: 'New contact created!',
    data: "contact"
});
};*/