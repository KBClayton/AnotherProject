var db = require("../models");
//var hashing = require("loginsalt")
const password = require('s-salt-pepper');
password.iterations(75000); 
password.pepper('This is a high entropy pepper string for hashing');



module.exports = function(app) {

  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    const user = {
      password: {
        hash: null,
        salt: null
      }
    };
    async () => {
      user.password = await password.hash(req.body.password);
    }


    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
