var db = require("../models");
var check = require("./check");
// Dependencies
// =============================================================
//var path = require("path");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    if (check.login(req, res)) {
      return;
    }
    db.savedJob
      .findAll({ where: { userId: req.session.uid } })
      .then(function(result) {
        if (result === null) {
          console.log("there was nothing there");
          console.log(result);
        }
        res.render("jobDetails", {
          savedJob: result
        });
        //console.log(result);
      });
  });

  // index route loads view.html
  //app.get("/", function(req, res) {
  //res.sendFile(path.join(__dirname, "../public/blog.html"));
  //});

  // CreateNewJob Page  --ALEX
  app.get("/createJob", function(req, res) {
    if (check.login(req, res)) {
      return;
    }
    db.savedJob
      .findAll({ where: { userId: req.session.uid } })
      .then(function(result) {
        if (req.session.uid === undefined) {
          res.render("login", {
            msg: "Welcome!"
            //examples: result
          });
          return;
        }
        res.render("enterNewJob", {
          msg: "Welcome!",
          examples: result
        });
      });
  });

  // load jobDetails Page
  app.get("/jobDetails", function(req, res) {
    if (check.login(req, res)) {
      return;
    }
    db.savedJob
      .findAll({ where: { userId: req.session.uid } })
      .then(function(result) {
        console.log(result);
        res.render("jobDetails", {
          jobs: result
        });
      });
  });

  // CreateNewUser Page --Alex
  app.get("/createProfile", function(req, res) {
    if (check.notin(req, res)) {
      return;
    }
    //db.user.findAll({}).then(function(result) {
    res.render("newProfile", {
      msg: "Welcome!"
      //examples: result
    });
    //});
  });

  // CreateNewUser Page --Alex
  app.get("/home", function(req, res) {
    if (check.login(req, res)) {
      return;
    }
    db.savedJob
      .findAll({ where: { userId: req.session.uid } })
      .then(function(result) {
        if (result === null) {
          console.log("there was nothing there");
          console.log(result);
        }
        res.render("jobDetails", {
          savedJob: result
        });
        console.log(result);
      });
  });

  // load jobDetails Page
  app.get("/jobDetails", function(req, res) {
    if (check.login(req, res)) {
      return;
    }
    db.savedJob
      .findAll({ where: { userId: req.session.uid } })
      .then(function(result) {
        res.render("jobDetails", {
          savedJob: result
        });
        console.log(result);
      });
  });

  // editJobPage page -Alan
  app.get("/home2", function(req, res) {
    if (check.login(req, res)) {
      return;
    }
    db.savedJob
      .findAll({ where: { userId: req.session.uid } })
      .then(function(result) {
        if (result === null) {
          console.log("there was nothing there");
          console.log(result);
        }
        res.render("jobDetails", {
          savedJob: result
        });
        console.log(result);
      });
  });

  // load login Page
  app.get("/login", function(req, res) {
    if (check.notin(req, res)) {
      return;
    }
    //  db.user.findAll({}).then(function(result) {
    res.render("login", {
      msg: "Welcome!"
      //examples: result
    });
    //});
  });

  // load authenticJobs Page
  app.get("/jobSearchGov", function(req, res) {
    if (check.login(req, res)) {
      return;
    }
    db.savedJob
      .findAll({ where: { userId: req.session.uid } })
      .then(function(result) {
        res.render("usaJobs", {
          msg: "Welcome!",
          examples: result
        });
      });
  });

  // load authenticJobs Page
  app.get("/jobSearchAJ", function(req, res) {
    if (check.login(req, res)) {
      return;
    }
    db.savedJob
      .findAll({ where: { userId: req.session.uid } })
      .then(function(result) {
        res.render("authenticJobs", {
          msg: "Welcome!",
          examples: result
        });
      });
  });

  // load change password page
  app.get("/change", function(req, res) {
    if (check.login(req, res)) {
      return;
    }
    res.render("changepass", {
      msg: "Welcome!"
    });
  });
  //load edit account page
  app.get("/editUser", function(req, res) {
    if (check.login(req, res)) {
      return;
    }
    //console.log(req.body);
    //{attributes:["firstName", "lastName", "email", "location"]},
    db.user
      .findOne({ where: { id: req.session.uid } })
      .then(function(response) {
        console.log("in edituser");
        console.log(response.dataValues.location);
        res.render("editUser", {
          account: response.dataValues
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
  //});

  // create page based on id from button click -ALAN
  // app.get("/home/:id", function(req, res) {
  //   db.savedJob.findOne({ where: { id: req.params.id } }).then(function(job) {
  //     console.log(job.dataValues);
  //     res.render("editJobPage", job.dataValues);
  //   });
  // });
  // });

  app.get("/home/:id", function(req, res) {
    if (check.login(req, res)) {
      return;
    }
    req.session.savedJobId = req.params.id;
    db.savedJob
      .findOne({
        where: {
          id: { $eq: req.params.id },
          $and: { userId: { $eq: req.session.uid } },
        },
        include: [
          {
            model: db.comment
          }
        ]
      })
      .then(function(job) {
        if(job===null){
          res.json({error:"Nothing was found for that ID"})
        }
        // console.log(job.dataValues);
        // console.log("below should be individual comments");
        // console.log(job.dataValues.comments[0].dataValues);
        // console.log(job.dataValues.comments[1].dataValues);
        // console.log(job.dataValues.comments[2].dataValues);
        res.render("editJobPage", job.dataValues);
      });
  });

  // Route to view changes to editJobPage -ALAN
  app.get("/home3", function(req, res) {
    if (check.login(req, res)) {
      return;
    }
    db.savedJob
      .findOne({ where: { userId: req.session.uid } })
      .then(function(result) {
        res.render("editJobPage", {
          editJob: result
        });
      });
  });

  app.get("/about", function(req, res) {
    res.render("aboutPage");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
