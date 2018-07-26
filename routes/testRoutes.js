var db = require("../models");
var rp = require("request-promise-native");
var keys = require("../keys");

module.exports = function(app) {

  // Temporary JSON Renderings of Individual Databases
  // -- Get All Sorted Data (Join)
  app.get("/api/all", function(req, res) {
    db.user.findAll({
      include: [
        {
          model: db.savedJob,
          include: [
            {
              model: db.comment
            }
          ]
        }
      ]
    }).then(function(results) {
      res.json(results);
    });
  });
  // -- Get All Data From A Specific UserID (Join)
  app.get("/api/all/:id?", function(req, res) {
    db.user.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: db.savedJob,
          include: [
            {
              model: db.comment
            }
          ]
        }
      ]
    }).then(function(results) {
      res.json(results);
    });
  });

  //--authentic jobs API route
app.post("/api/authJobs", function(req, res) {
  var keyword = req.body.jobType;
  var location = req.body.jobLocation;
  var queryAuthJobsURL = "https://authenticjobs.com/api/?api_key="+ keys.authenticJobs.key +"&method=aj.jobs.search&category="+ keyword +"&perpage=10&location="+ location +"&format=json";
  var options = {
    uri: queryAuthJobsURL,
    json: true // Automatically parses the JSON string in the response
  };
  
  rp(options).
  then(function(response){
    res.json(response)
  });
});

}