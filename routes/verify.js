var db = require("../models"); 


module.exports = function(app) {
    app.post("/api/verify", function(req, res) {
        console.log(req.session.uid);
        if(req.session.uid==undefined){
            res.send("You are not logged in");
        }else{
        res.send("You are logged in as "+req.session.uid);
        }
    });
    app.get("/api/verify", function(req, res) {
        console.log(req.session.uid);
        if(req.session.uid==undefined){
            res.send("You are not logged in");
        }else{
        res.send("You are logged in as "+req.session.uid);
        }
    });
    app.delete("/api/verify", function(req, res) {

        console.log(req.session.uid);
        if(req.session.uid==undefined){
            res.send("You are not logged in");
        }else{
        res.send("You are logged in as "+req.session.uid);
        }
    });
    app.put("/api/verify", function(req, res) {
        console.log(req.session.uid); 
        if(req.session.uid==undefined){
            res.send("You are not logged in");
        }else{
        res.send("You are logged in as "+req.session.uid);
        }
    });
}
