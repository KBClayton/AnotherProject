var db = require("../models");

module.exports = function(app) {

  // Temporary JSON Renderings of Individual Databases
    // -- Get All Users
  app.get("/api/users", function(req, res) {
    db.user.findAll({}).then(function(results) {
      res.json(results);
    });

  });
    // -- Get All SavedJobs
  app.get("/api/jobs", function(req, res) {
    db.savedJob.findAll({}).then(function(results) {
      res.json(results);
    });
  });
    // -- Get All Comments
  app.get("/api/comments", function(req, res) {
    db.comment.findAll({}).then(function(results) {
      res.json(results);
    });
  });
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
    });
  });
    // -- Get All Data From A Specific UserID (Join)
  app.get("/api/all/:id?", function(req, res) {
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
    });
  });


  // -- Post New Job
  app.post("/api/jobs", function(req, res) {
    // Take Input from Client
    var newJob = req.body;
    console.log(newJob);
    //Creates a new job in the database
    db.savedJob.create({
      company: newJob.company,
      contactName: newJob.contactName,
      contactPhone: newJob.contactPhone,
      applicationLink: newJob.applicationLink,
      position: newJob.position,
      jobLocation: newJob.jobLocation,
      confidenceLevel: newJob.confidenceLevel,
      desiredSalary: newJob.desiredSalary,
      postedSalary: newJob.postedSalary
    })
    //Then it renders
    .then(function(results) {
      res.json(results);
    });
  });

  // -- Post New comment
  app.post("/api/comments", function(req, res) {
    // Take Input from Client
    var newComment = req.body;
    console.log(newComment);
    //Creates a new comment in the database
    db.comment.create({
      comment: newComment.comment
    })
    //Then it renders
    .then(function(results) {
      res.json(results);
    });
  });

  // -- Delete Job
  app.delete("/api/jobs/:id", function(req, res) {
    // delete entry that corresponds to appropriate id
    db.savedJob.destroy({
      where: {
        id: req.params.id
      }
    })
    // then it renders
    .then(function(results) {
      res.json(results);
    });
  });

  // -- Delete Comment
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

  // PUT route for updating the phone contact info for a given job
  app.put("/api/jobs/contactPhone/:id", function(req, res) {
    console.log(req.params);
    db.savedJob.update(
      {
        contactPhone: req.body.contactPhone
      },
      {
        where: {
          id: req.params.id
        }
      })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });
};