var db = require("../models");
var rp = require("request-promise-native");
var keys = require("../keys");
var check = require("./check");
module.exports = function(app) {

  
  //--authentic jobs API route
  app.post("/api/authJobs", function(req, res) {
    if(check.login(req, res)){
      return;
    }
    var keyword = req.body.jobType;
    var location = req.body.jobLocation;
    var telC = req.body.tC;
    var queryAuthJobsURL = "https://authenticjobs.com/api/?api_key="+ keys.authenticJobs.key +"&method=aj.jobs.search&category="+ keyword +"&perpage=15" + location + telC +"&format=json";
    console.log(queryAuthJobsURL);
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