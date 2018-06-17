module.exports = function (sequelize, DataTypes) {
  var GameUser = sequelize.define("GameUsers", {
    GameId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  },
    {
      indexes: [{
        fields: ['GameID', 'UserId']
      }]
    });
  return GameUser;
};
