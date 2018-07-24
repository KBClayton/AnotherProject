var db = require("../models");

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

};