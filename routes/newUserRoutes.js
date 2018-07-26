var db = require("../models"); 
const password = require('s-salt-pepper');
var check =require("./check");


module.exports = function(app) {
  
  // -- Post New User
  app.post('/api/users/new', function(req, res) {
    if(check.notin(req, res)){
      return;
    }
    // Take Input from Client
    //console.log("in post route with uid "+req.session.uid)
    if(req.session.uid!==undefined){
      console.log("do not make a new user while logged in");
      //send to home page
      return res.json({url:"/"});
    }else{
      var newUser = req.body;
      //console.log(newUser.password);
      var namesearch=newUser.username;
      var emailsearch=newUser.email;
      //search to see if username is already taken
      db.user.findOne({where: {$or:[{username:{$eq:namesearch}}, {email:{$eq:emailsearch}}]}}).then(function(dbExample) {
        //console.log(dbExample);
        if(dbExample==null){
            const user = {
              password: {
                hash: null,
                salt: null
              }
            };
            async function hashing() {
              //create hash and salt
              user.password = await password.hash(newUser.password);
              //console.log(user);
              newUser.password=user.password.hash;
              newUser.salt=user.password.salt;
              //console.log(newUser);
              db.user.create(newUser).then(function(dbExample){
                //console.log(dbExample.dataValues.id);
                req.session.uid=dbExample.dataValues.id;
                //send to home page
                return res.json({url:"/"});
                //return res.redirect("/");
              });;
            }
            hashing();
        }else{
          console.log("that username or email is taken")
          //send to login page
          //return res.redirect('/login')
          return res.json({error:"that username or email is taken"});
        }
      });
    }
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
