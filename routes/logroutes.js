var db = require("../models"); 
const password = require('s-salt-pepper');


module.exports = function(app) {
    app.post("/api/login", function(req, res) {
        if(req.session.uid!==undefined){
            console.log("do not login while logged in");
            //send to home page
            return res.redirect("/");
        }else{
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
                    //console.log(user);
                    //console.log(await password.compare('foo', user.password));
                    correctpass=await password.compare(userpass, user.password);

                    if(correctpass){
                        console.log("the password was correct the users id is "+dbExample.id);
                        req.session.uid=dbExample.id;
                        //send to home page
                        return res.redirect('/');
                    }else{
                        //console.log(correctpass);
                        console.log("the password was wrong");
                        //send to login page
                        return res.redirect("/")
                    }
                }
                checker();

                
                //res.json(dbExample);
            });
        }
    });

    app.put("/api/change", function(req, res) {
        var oldpass=req.body.oldpass;
        var newpass=req.body.newpass;

        if(req.session.uid==undefined){
            //send to login page
            console.log("you are not logged in to change password")
            return res.redirect("/");
        }else{
            const user = {
                password: {
                hash: null,
                salt: null
                }
            };
            var correctpass2;
            db.user.findOne({where:{id:req.session.uid}}).then(function(dbExample) {
                //console.log(dbExample);
                if(dbExample==null){
                    console.log("there is no user with that id, how did you get here?");
                    //send to change password page
                    return res.redirect('/');
                }
                user.password.hash=dbExample.dataValues.password;
                user.password.salt=dbExample.dataValues.salt;
                //console.log(user);
                async function checker2()  {
                    //console.log(user);
                    //console.log(await password.compare('foo', user.password));
                    //console.log("oldpass: "+oldpass+" newpass: "+newpass)
                    correctpass2=await password.compare(oldpass, user.password);

                    if(correctpass2){
                        console.log("the old password was correct");
                        const user2 = {
                            password: {
                            hash: null,
                            salt: null
                            }
                        };
                        async function hashing2() {
                            user2.password = await password.hash(newpass);
                            console.log(user2);
                            db.user.update({password:user2.password.hash, salt:user2.password.salt},{where:{id:req.session.uid}}).then(function(dbExample) {
                                console.log("the password of user id "+req.session.uid+" was updated")
                                console.log(dbExample);
                                //send to home page
                                return res.redirect("/");
                            });
                          }
                        hashing2();
                       
                    }else{
                        console.log("correctpass: "+correctpass2);
                        console.log("the old password was wrong");
                        //send to change password page
                        return res.redirect("/")
                    }
                }
                checker2();
            });
        }
    });

    app.delete("/api/logout", function(req, res) {
        req.session.uid=undefined;
        //req.session=null;
        //delete req.session;
        //send to login page
        return res.redirect('/');
    });
}