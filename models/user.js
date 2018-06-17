var bcrypt = require('bcrypt');

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
            allowNull: false,
            required: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true,
            isEmail: true
        },

        localPassword: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true,
            len: [2, 10]
        }
    });

    // generating a hash
    User.generateHash = function (password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };

    // checking if password is valid
    User.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.localPassword);
    };
    User.associate = function (models) {
        User.belongsTo(models.Game, {//retrieves one game 
            foreignKey: {
                allowNull: false
            }
        });
        User.belongsToMany(models.Game, {
            through: {
                model: models.GameUser
            }
        });
    };
    return User;
};
