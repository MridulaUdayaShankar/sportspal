// var db = require('../models');
var path = require("path");


module.exports = function(app) {
    app.get("/home", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/assets/html/index.html"));
      });
      app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/assets/html/login.html"));
      });
};