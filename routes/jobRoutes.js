var db = require("../models");
var check =require("./check");

module.exports = function(app) {
  
  // -- Get All SavedJobs
  app.get("/api/jobs", function(req, res) {
    if(check.login(req, res)){
      return;
    }
    db.savedJob.findAll({}).then(function(results) {
      res.json(results);
    });
  });

  // --Get An individual Job and include comments associated with that job
  app.get("/api/jobs/:id", function(req, res) {
    if(check.login(req, res)){
      return;
    }
    db.savedJob.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: db.comment
        }
      ]
    }).then(function(results) {
      res.json(results);
    });
  });

  // -- Post New Job
  app.post('/api/jobs', function(req, res) {
    if(check.login(req, res)){
      return;
    }
    // Take Input from Client
    var newJob = req.body;
    newJob.userId=req.session.uid
    console.log(newJob);
    // Creates a new Job in the database
    db.savedJob.create(newJob)
     // Then it renders 
    .then(function(results){
      res.json(results)
    })
  });
  
  // PUT route for updating the phone contact info for a given job
<<<<<<< HEAD
  app.put("/api/jobs/contactPhone/:id", function(req, res) {
    if(check.login(req, res)){
      return;
    }
    console.log(req.params);
=======
  //can be used as template to create routes for any other item we want to be able to edit
  app.put("/api/jobs/changePhone/:id", function(req, res) {
>>>>>>> 8b4b221e1ce3c7e6d82ace52572a945c5c854796
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
    if(check.login(req, res)){
      return;
    }
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
