var db = require('../models');

module.exports = function (app) {
    app.get('/api/users/games', function (req, res) {
        db.Game.findAll({
            include: [db.User]
        }).then(function (dbGame) {
            res.json(dbGame);
        });
    });
    app.get('/api/users/games/:id', function (req, res) {
        db.Game.findOne({
            where: {
                id: req.params.id
            },
            include: [db.User]
        }).then(function (dbGame) {
            res.json(dbGame);
        });
    });
    app.post("/api/games/", function (req, res) {
        db.Game.create(req.body).then(function (dbGame) {
            res.json(dbGame);
        });
    });
    app.destroy('/api/games/:id', function (req, res) {
        db.Game.destroy({
            where: {
              id: req.params.id
            }
          }).then(function(dbGame) {
            res.json(dbGame);
          });
      
    });
};