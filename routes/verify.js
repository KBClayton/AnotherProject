var db = require("../models"); 


module.exports = function(app) {
    app.post("/api/verify", function(req, res) {
        console.log(req.session.uid);
        if(req.session.uid==undefined){
            return res.send("You are not logged in");
        }else if(req.session.uid!==undefined) {
            return res.send("You are logged in as "+req.session.uid);
        }
        return res.send("How did you get here?");
        console.log("does this execute?");
    });

    app.get("/api/verify", function(req, res) {
        console.log(req.session.uid);
        if(req.session.uid==undefined){
            return res.send("You are not logged in");
        }else if(req.session.uid!==undefined){
            return res.send("You are logged in as "+req.session.uid);
        }
        return res.send("How did you get here?");
        console.log("does this execute?");
    });

    app.delete("/api/verify", function(req, res) {
        console.log(req.session.uid);
        if(req.session.uid==undefined){
            return res.send("You are not logged in");
        }else if(req.session.uid!==undefined){
            return res.send("You are logged in as "+req.session.uid);
        }
        return res.send("How did you get here?");
        console.log("does this execute?");
    });

    app.put("/api/verify", function(req, res) {
        console.log(req.session.uid); 
        if(req.session.uid==undefined){
            return res.send("You are not logged in");
        }else if(req.session.uid!==undefined){
            return res.send("You are logged in as "+req.session.uid);
        }
        return res.send("How did you get here?");
        console.log("does this execute?");
    });
}
