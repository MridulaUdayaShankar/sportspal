// var db = require('../models');
// var path = require("path");


module.exports = function(app) {
    app.get("/home", function(req, res) {
        res.render("home")
        
      });
      app.get("/", function(req, res) {
        res.render("login");
      });
};