var db = require("../models");
var rp = require("request-promise-native");
var keys = require("../keys");
var check = require("./check");
module.exports = function(app) {
  //--authentic jobs API route
  app.post("/api/authJobs", function(req, res) {
    if (check.login(req, res)) {
      return;
    }
    console.log(req.body);
    var queryEndAJ = req.body.userQueryAJ;
    console.log(queryEndAJ);
    var queryAuthJobsURL =
      "https://authenticjobs.com/api/?api_key=" +
      keys.authenticJobs.key +
      queryEndAJ;
    console.log(queryAuthJobsURL);
    var options = {
      uri: queryAuthJobsURL,
      json: true // Automatically parses the JSON string in the response
    };

    rp(options).then(function(response) {
      res.json(response);
    });
  });

  //route that checks if the job is already on the user's saved Jobs
  app.get("/api/tableCheckerJiD", function(req, res) {
    if (check.login(req, res)) {
      return;
    }
    console.log(req.session.uid);
    console.log(req.query.jobSearchID);
    db.savedJob
      .findOne({
        where: {
          userId: req.session.uid,
          jobSearchID: req.query.jobSearchID
        }
      })
      .then(function(results) {
        console.log(results);
        if (results === null) {
          res.send(true);
        } else {
          res.send(false);
        }
      });
  });
};
