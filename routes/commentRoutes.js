var db = require("../models");

module.exports = function(app) {
  
  // -- Get All Comments
  app.get("/api/comments", function(req, res) {
    db.comment.findAll({}).then(function(results) {
      res.json(results);
    });
  });
  
  // -- Create a New Comment
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

  // -- Delete a Comment
  app.delete("/api/comments/:id", function(req, res) {
    // delete entry that corresponds to appropriate id
    db.comment.destroy({
      where: {
        id: req.params.id
      }
    })
    // then it renders
    .then(function(results) {
      res.json(results);
    });
  });
  
};

// -- WHAT THE DATA LOOKS LIKE

// {"comment": "I Think this is an awesome job for me to test with POSTMAN",
// 	"savedJobId": 5}
//