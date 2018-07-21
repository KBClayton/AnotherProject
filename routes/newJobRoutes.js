var db = require("../models");

module.exports = function(app) {
  
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
