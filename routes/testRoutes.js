var db = require("../models");
//var $ = require("jquery");
var request = require("request");
var rp = require("request-promise-native");

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
    db.user.findAll({
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
  console.log("keyword: " + keyword + "location: " + location)
  var queryAuthJobsURL = "https://authenticjobs.com/api/?api_key=c45c6054ab7267ff5afbfdd74058dca0&method=aj.jobs.search&category="+ keyword +"&perpage=5&location="+ location +"&format=json"
  console.log("query: " + queryAuthJobsURL);
  var options = {
    uri: "https://authenticjobs.com/api/?api_key=c45c6054ab7267ff5afbfdd74058dca0&method=aj.jobs.search&category="+ keyword +"&perpage=5&location="+ location +"&format=json",
    json: true // Automatically parses the JSON string in the response
  };
  
  rp(options).
  then(function(response){
    res.json(response)
  });
});

}
/*var options = {
  uri: "https://authenticjobs.com/api/?api_key=c45c6054ab7267ff5afbfdd74058dca0&method=aj.jobs.search&category="+ keyword +"&perpage=5&location="+ location +"&format=json",
  json: true // Automatically parses the JSON string in the response
};

rp(options)
  .then(function (repos) {
      console.log('User has %d repos', repos.length);
  })
  .catch(function (err) {
      // API call failed...
  });*/