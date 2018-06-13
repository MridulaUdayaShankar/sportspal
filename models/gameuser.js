const User = require('./user.js');
const Game = require('./game.js');

module.exports = function (sequelize, DataTypes){
    var GameUser = sequelize.define("GameUser", {});

    return GameUser;
  }
  