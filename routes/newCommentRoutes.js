var db = require("../models");

module.exports = function(app) {
  
  // -- Create New Job
  app.post('/api/comments', function(req, res) {
    // Take Input from Client
    var newComment = req.body;
    // Creates a new Job in the database
    db.comment.create(newComment)
     // Then it renders 
    .then(function(results){
      res.json(results)
    })
  });

};

// -- WHAT THE DATA LOOKS LIKE

// {"comment": "I Think this is an awesome job for me to test with POSTMAN",
// 	"savedJobId": 5}