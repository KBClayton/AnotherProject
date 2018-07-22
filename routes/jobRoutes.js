var db = require("../models");

module.exports = function(app) {
  
  // -- Get All SavedJobs
  app.get("/api/jobs", function(req, res) {
    db.savedJob.findAll({}).then(function(results) {
      res.json(results);
    });
  });

  // -- Post New Job
  app.post('/api/jobs', function(req, res) {
    // Take Input from Client
    var newJob = req.body;
    // Creates a new Job in the database
    db.savedJob.create(newJob)
     // Then it renders 
    .then(function(results){
      res.json(results)
    })
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

};

// -- WHAT THE DATA LOOKS LIKE

// {company: newJob.company,
// contactName: newJob.contactName,
// contactPhone: newJob.contactPhone,
// applicationLink: newJob.applicationLink,
// position: newJob.position,
// jobLocation: newJob.jobLocation,
// confidenceLevel: newJob.confidenceLevel,
// desiredSalary: newJob.desiredSalary,
// postedSalary: newJob.postedSalary,
// userId: newJob.userId}
