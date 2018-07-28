require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var session = require('express-session')
const helmet = require('helmet')



var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));


var sess = {
  secret: 'This is an exceedingly long high entropy string for encrypting cookie values',
  cookie: {
    secure:false,
    resave: false,
    saveUninitialized: true,
    maxAge: 3600000,
    rolling: true
  },
  // genid: function(req) {
  //   return genuuid() // use UUIDs for session IDs
  // },
}
 
if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}
 
app.use(session(sess))
app.use(helmet());



// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/testRoutes")(app);
require("./routes/userRoutes")(app);
require("./routes/jobRoutes")(app);
require("./routes/commentRoutes")(app);
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

//start clayton stuff
require("./routes/logroutes")(app);
require("./routes/newUserRoutes")(app);
//require("./routes/verify")(app);
//end clayton stuff

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;




