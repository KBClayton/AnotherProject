var db = require("../models"); 
const password = require('s-salt-pepper');


module.exports = function(app) {
  
  // -- Post New User
  app.post('/api/users/new', function(req, res) {
    // Take Input from Client
    //console.log("in post route with uid "+req.session.uid)
    var newUser = req.body;
    console.log(newUser.password);
    var namesearch=newUser.username;
    db.user.findOne({where:{username:namesearch}}).then(function(dbExample) {
      console.log(dbExample);
      if(dbExample==null){
          console.log("there is no user by that name");
          //send to login page
          res.redirect('/');
          const user = {
            password: {
              hash: null,
              salt: null
            }
          };
          async function hashing() {
            user.password = await password.hash(newUser.password);
            console.log(user);
            newUser.password=user.password.hash;
            newUser.salt=user.password.salt;
            console.log(newUser);
            db.user.create(newUser);
            //send to home page
            res.redirect("/");
          }
          hashing();
      }else{
        console.log("that username is taken")
        //send to login page
        res.redirect('/')
      }

  });
    

    //Creates a new user in the database




  });
};

// -- WHAT THE DATA LOOKS LIKE

// {username: newUser.username,
//   password: newUser.password,
//   salt: newUser.salt,
//   firstName: newUser.firstName,
//   lastName: newUser.lastName,
//   email: newUser.email,
//   location: newUser.location}
