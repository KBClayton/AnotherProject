var db = require("../models");
// Dependencies
// =============================================================
var path = require("path");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    //db.user.findAll({}).then(function(result) {
      res.render("index", {
        //msg: "Welcome!",
        //examples: result
      });
    });
  //});

  // index route loads view.html
  //app.get("/", function(req, res) {
    //res.sendFile(path.join(__dirname, "../public/blog.html"));
  //});

  // Load jobDetail page and pass in a specific job by id
  app.get("/jobs/:id", function(req, res) {
    db.savedJob.findOne({ where: { id: req.params.id } }).then(function(result) {
      res.render("jobDetails", {
        //example: result
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
