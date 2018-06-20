module.exports = function (sequelize, DataTypes) {
    var Game = sequelize.define("Game", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            is: ["^[a-z]+$", 'i'],
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            isDate: true,
        },
        venue: {
            type: DataTypes.STRING,
            is: ["^[a-z]+$", 'i'],
            allowNull: false
        },
        team: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
        
    });
    
    Game.associate = (models) => {
        Game.belongsToMany(models.User, {//retrieves one game with all its members
            through: {
                model: models.GameUser
            }
        });
    };
    return Game;
};
