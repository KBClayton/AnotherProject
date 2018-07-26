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
    console.log(req.body);
    var queryEndAJ = req.body.userQueryAJ;
    console.log(queryEndAJ);
    var queryAuthJobsURL = "https://authenticjobs.com/api/?api_key="+ keys.authenticJobs.key + queryEndAJ;
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