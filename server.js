// Core Libraries
var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var db = require('./models');


var PORT = process.env.PORT || 8080;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Add local routes to our express app
require("./routes/user-api-routes.js")(app);
require("./routes/game-api-routes.js")(app);
require('./routes/html-routes.js')(app);


db.sequelize.sync().then(function () {
  app.listen(PORT, function () {

    console.log("Server listening on: http://localhost:" + PORT);
  });
});