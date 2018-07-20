var db = require("../models");

module.exports = function(app) {

  // Temporary JSON Renderings of Individual Databases
      // -- Get All Users
  app.get("/api/users", function(req, res) {
    db.user.findAll({}).then(function(results) {
      res.json(results);
    })
  })
      // -- Get All SavedJobs
  app.get("/api/jobs", function(req, res) {
    db.savedJob.findAll({}).then(function(results) {
      res.json(results);
    })
  })
      // -- Get All Comments
  app.get("/api/comments", function(req, res) {
    db.comment.findAll({}).then(function(results) {
      res.json(results);
    })
  })
      // -- Get All Sorted Data (Join)
  app.get("/api/all", function(req, res) {
    db.user.findAll({
      include: [
        {
          model: db.savedJob,
          include: [
            {
              model: db.comment
            }
          ]
        }
      ]
    }).then(function(results) {
      res.json(results);
    })
  })
      // -- Get All Data From A Specific UserID (Join)
  app.get("/api/all/:id?", function (req, res){
    db.user.findAll({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: db.savedJob,
          include: [
            {
              model: db.comment
            }
          ]
        }
      ]
    }).then(function(results) {
      res.json(results);
    })
  })


  // Get all examples
  // app.get("/api/examples", function(req, res) {
  //   db.Example.findAll({}).then(function(dbExamples) {
  //     res.json(dbExamples);
  //   });
  // });

  // Create a new example
  // app.post("/api/examples", function(req, res) {
  //   db.Example.create(req.body).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });

  // Delete an example by id
  // app.delete("/api/examples/:id", function(req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });
};
