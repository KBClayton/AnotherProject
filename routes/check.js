var db = require("../models");

module.exports = {
  login: function(req, res) {
    //console.log("in verify");
    if (req.session.uid === undefined) {
      //console.log("uid undefined");
      res.render("login", {
        msg: "Welcome!"
        //examples: result
      });
      return true;
      //return res.json("You are not logged in");
    } else if (req.session.uid !== undefined) {
      //console.log("logged in")
      return false;
      //return res.send("You are logged in as "+req.session.uid);
    }
  },

  notin: function(req, res) {
    if (req.session.uid !== undefined) {
      db.savedJob
        .findAll({ where: { id: req.session.uid } })
        .then(function(result) {
          res.render("jobDetails", {
            msg: "Welcome!",
            examples: result
          });
        });
      return true;
    } else if (req.session.uid === undefined) {
      //console.log("not logged in")
      return false;
    }
  }
};
