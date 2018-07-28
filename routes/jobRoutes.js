var db = require("../models");
var check = require("./check");

module.exports = function(app) {
  // -- Get All SavedJobs
  app.get("/api/jobs", function(req, res) {
    if (check.login(req, res)) {
      return;
    }
    db.savedJob.findAll({}).then(function(results) {
      res.json(results);
    });
  });

  // --Get An individual Job and include comments associated with that job
  app.get("/api/jobs/:id", function(req, res) {
    if (check.login(req, res)) {
      return;
    }
    db.savedJob
      .findOne({
        where: {
          id: req.params.id
        },
        include: [
          {
            model: db.comment
          }
        ]
      })
      .then(function(results) {
        res.json(results);
      });
  });

  // --Get all jobs that match an input confidence level
  // to use you'll need to restrict input from 0-5 to return any jobs
  app.get("/api/jobs/confidence/:id", function(req, res) {
    if (check.login(req, res)) {
      return;
    }
    db.savedJob
      .findAll({
        where: {
          confidenceLevel: req.params.id
        }
      })
      .then(function(results) {
        res.json(results);
      });
  });

  // --Get all remote jobs
  // might need to add toLowerCase() to make sure all remote jobs render
  app.get("/api/jobs/remote", function(req, res) {
    if (check.login(req, res)) {
      return;
    }
    db.savedJob
      .findAll({
        where: {
          jobLocation: "remote"
        }
      })
      .then(function(results) {
        res.json(results);
      });
  });

  // -- Post New Job
  app.post("/api/jobs", function(req, res) {
    if (check.login(req, res)) {
      return;
    }
    // Take Input from Client
    var newJob = req.body;
    newJob.userId = req.session.uid;
    console.log(newJob);
    // Creates a new Job in the database
    db.savedJob
      .create(newJob)
      // Then it renders
      .then(function(results) {
        res.json(results);
      });
  });

  // PUT route for updating the phone contact info for a given job
  //can be used as template to create routes for any other item we want to be able to edit
  app.put("/api/jobs/changePhone/:id", function(req, res) {
    if (check.login(req, res)) {
      return;
    }
    console.log(req.params);
    db.savedJob
      .update(
        {
          contactPhone: req.body.contactPhone
        },
        {
          where: {
            id: req.params.id
          }
        }
      )
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  // PUT route for updating the contact name for a given job
  app.put("/api/jobs/changeName/:id", function(req, res) {
    // if(check.login(req, res)){
    //   return;
    // }
    // console.log(req.params);
    db.savedJob
      .update(
        { contactName: req.body.contactName },
        {
          where: {
            id: req.params.id
          }
        }
      )
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  // PUT route for updating the user confidence for a given job
  app.put("/api/jobs/changeConfidence/:id", function(req, res) {
   // if (check.login(req, res)) {
     // return;
   // }
    console.log(req.body.confidenceLevel);
    db.savedJob
      .update(
        {
          confidenceLevel: req.body.confidenceLevel
        },
        {
          where: {
            id: req.params.id
          }
        }
      )
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  // PUT route for updating the contact link for a given job
  app.put("/api/jobs/changeLink/:id", function(req, res) {
    if (check.login(req, res)) {
      return;
    }
    console.log(req.params);
    db.savedJob
      .update(
        {
          applicationLink: req.body.applicationLInk
        },
        {
          where: {
            id: req.params.id
          }
        }
      )
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  // -- Delete Job
  app.delete("/api/jobs/:id", function(req, res) {
    if (check.login(req, res)) {
      return;
    }
    console.log("found route:  " + req.params);
    // delete entry that corresponds to appropriate id
    db.savedJob
      .destroy({
        where: {
          id: req.params.id
        }
      })
      // then it renders
      .then(function(results) {
        console.log(results)
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
