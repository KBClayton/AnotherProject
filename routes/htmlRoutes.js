var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
  genid: function(req) {
        ;
        return genuuid() // use UUIDs for session IDs
      },
      secret: 'keyboard cat'
    }))
    
    //clayton stuff

    db.user.findAll({}).then(function(result) {
      res.render("enterNewJob", {
        msg: "Welcome!",
        examples: result
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
