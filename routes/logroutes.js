var db = require("../models"); 
const password = require('s-salt-pepper');


module.exports = function(app) {
    app.post("/api/login", function(req, res) {
        //console.log("in login route");
        const user = {
            password: {
            hash: null,
            salt: null
            }
        };
        var correctpass;
        namesearch=req.body.username;
        userpass=req.body.password;
        //console.log(userpass);
        db.user.findOne({where:{username:namesearch}}).then(function(dbExample) {
            console.log(dbExample);
            if(dbExample==null){
                console.log("there is no user by that name");
                //send to login page
                res.redirect('/');
            }
            user.password.hash=dbExample.dataValues.password;
            user.password.salt=dbExample.dataValues.salt;
            //console.log(user);
            async function checker()  {
                console.log(user);
                //console.log(await password.compare('foo', user.password));
                correctpass=await password.compare(userpass, user.password);

                if(correctpass){
                    console.log("the password was correct the users id is "+dbExample.id);
                    req.session.uid=dbExample.id;
                    //send to home page
                    res.json(dbExample);
                }else{
                    console.log(correctpass);
                    console.log("the password was wrong");
                    //send to login page
                    res.redirect("/")
                }
            }
            checker();

            
            //res.json(dbExample);
        });
    });
    app.post("/api/logout", function(req, res) {
        req.session.uid=undefined;
        //send to login page
        res.redirect('/');
    });
}