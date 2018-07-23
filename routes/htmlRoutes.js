var db = require("../models");

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
    db.user.findAll({}).then(function(result) {
      res.render("enterNewJob", {
        msg: "Welcome!",
        examples: result
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

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
