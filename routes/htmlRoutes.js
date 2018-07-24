var db = require("../models");
const password = require('s-salt-pepper');
password.iterations(75000); 
password.pepper('This is a high entropy pepper string for hashing');


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

  // index route loads view.html
  //app.get("/", function(req, res) {
    //res.sendFile(path.join(__dirname, "../public/blog.html"));
  //});

  // CreateNewJob Page  --ALEX
  app.get("/createJob", function(req, res) {
   db.savedJob.findAll({}).then(function(result) {
      res.render("enterNewJob", {
        msg: "Welcome!",
        examples: result
      });
    });
  });


  //   db.user.findAll({}).then(function(result) {

  //     res.render("enterNewJob", {
  //     res.render("newProfile", {
  //       msg: "Welcome!",
  //       examples: result
  //     });
  //   });
  // });


  // CreateNewUser Page --Alex
  app.get("/home", function(req, res) {
    db.user.findAll({}).then(function(result) {
      res.render("homePage", {
        msg: "Welcome!",
        examples: result
      });
    });
  });

  // load jobDetails Page 
  app.get("/jobDetails", function(req, res) {
    db.savedJob.findAll({}).then(function(result) {
      res.render("jobDetails", {
        msg: "Welcome!",
        examples: result
      });
    });
  });

}
  // Load example page and pass in an example by id
  //app.get("/example/:id", function(req, res) {
  //db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
