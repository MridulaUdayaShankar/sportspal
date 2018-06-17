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
        event_time: {
            type: DataTypes.TIME,
            isNumeric: true,
        },
        event_date: {
            type: DataTypes.DATE,
            isDate: true,
        },
        latitude: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
            validate: { min: -90, max: 90 }
        },
        longitude: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
            validate: { min: -180, max: 180 }
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
