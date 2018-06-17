module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
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
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            isEmail: true
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [2, 10]
        }
    });

    User.associate = function (models) {
        User.belongsTo(models.Game, {//retrieves one game 
            foreignKey: {
                allowNull: false
            }
        });
        User.hasMany(models.Game, {
            through: {
                model: models.GameUser
            }
        });
    };
    return User;
};
