var db = require("../models");
var check = require("./check");

module.exports = function(app) {
  // -- Get All Comments

  app.get("/api/comments", function(req, res) {
    if (check.login(req, res)) {
      return;
    }
    db.comment.findAll({}).then(function(results) {
      res.json(results);
    });
  });

  // -- Create a New Comment
  app.post("/api/comments", function(req, res) {
    if (check.login(req, res)) {
      return;
    }
    // Take Input from Client
    var newComment = req.body;
    console.log("in post new comment route");
    console.log(newComment);
    newComment.savedJobId=req.session.savedJobId;
    // Creates a new Job in the database
    db.comment
      .create(newComment)
      // Then it renders
      .then(function(results) {
        res.json(results);
      });
  });

  // -- Edit a specific comment
  app.put("/api/comments/:id", function(req, res) {
    if (check.login(req, res)) {
      return;
    }
    // update the entry that corresponds to the appropriate id
    console.log(req.body.comment);
    db.comment
      .update(
        {
          comment: req.body.comment
        },
        {
          where: {
            id: req.params.id
          }
        }
      )
      .then(function(results) {
        res.json(results);
      });
  });

  // -- Delete a Comment
  app.delete("/api/comments/:id", function(req, res) {
    // delete entry that corresponds to appropriate id
    if (check.login(req, res)) {
      return;
    }
    db.comment
      .destroy({
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
