var db = require("../models");
// Dependencies
// =============================================================
var path = require("path");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.user.findAll({}).then(function(result) {
      res.render("index", {
        msg: "Welcome!",
        examples: result
      });
    });
  }); 

  // CreateNewJob Page  --ALEX
  app.get("/createJob", function(req, res) {
   db.savedJob.findAll({}).then(function(result) {
      res.render("enterNewJob", {
        msg: "Welcome!",
        examples: result
      });
    });
  });

    // load jobDetails Page 
    app.get("/jobDetails", function(req, res) {
      db.savedJob.findAll({}).then(function(result) {
        res.render("jobDetails", {
          
          jobs: savedJob
        });
      });
    });

  // CreateNewUser Page --Alex
  app.get("/createProfile", function(req, res) {
    db.user.findAll({}).then(function(result) {
      res.render("newProfile", {
        msg: "Welcome!",
        examples: result
      });
    });
  });
  

  // CreateNewUser Page --Alex
  app.get("/home", function(req, res) {
    db.user.findAll({}).then(function(result) {
      res.render("homePage", {
        msg: "Welcome!",
        examples: result
      });
    });
  });

  // jobDetails page (new home page) -Alan
  app.get("/home2", function(req, res) {
    db.savedJob.findAll({}).then(function(result) {
      res.render("jobDetails", {
        savedJob: result
      });
      console.log(result);
    });
  });

  // editJobPage page -Alan
  app.get("/home2", function(req, res) {
    db.savedJob.findAll({}).then(function(result) {
      res.render("jobDetails", {
        savedJob: result
      });
      console.log(result);
    });
  });


  // load login Page
  app.get("/login", function(req, res) {
    db.user.findAll({}).then(function(result) {
      res.render("login", {
        msg:"Welcome!",
        examples: result
      });
    });
  });

  // load authenticJobs Page
  app.get("/jobSearchGov", function(req, res) {
    db.savedJob.findAll({}).then(function(result) {
      res.render("usaJobs", {
        msg:"Welcome!",
        examples: result
      });
    });
  });

  // load authenticJobs Page
  app.get("/jobSearchAJ", function(req, res) {
    db.savedJob.findAll({}).then(function(result) {
      res.render("authenticJobs", {
        msg:"Welcome!",
        examples: result
      });
    });
  });

  // Load example page and pass in an example by id
  //app.get("/example/:id", function(req, res) {
    //db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      //res.render("example", {
        //example: dbExample
      //});
    //});
  //});

  // Create page base on id from button click -- Alan
  app.get("/home3", function(req, res) {
    db.savedJob.findOne({ where: { id: req.params.id } }).then(function(result) {
      res.render("editJobPage", {
        editJob: result
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};