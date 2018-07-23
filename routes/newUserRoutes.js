var db = require("../models"); 

module.exports = function(app) {
  
  // -- Post New User
  app.post('/api/users', function(req, res) {
    // Take Input from Client
    var newUser = req.body;
    console.log(newUser);

    //Creates a new user in the database



    db.user.create(newUser)
    //Then it renders 
    .then(function(results){
      res.json(results)
    })
  });
};

// -- WHAT THE DATA LOOKS LIKE

// {username: newUser.username,
//   password: newUser.password,
//   firstName: newUser.firstName,
//   lastName: newUser.lastName,
//   email: newUser.email,
//   location: newUser.location}
