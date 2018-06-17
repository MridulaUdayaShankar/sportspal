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
        db.Game.create({
            name: req.body.name,
            date: req.body.date,
            venue: req.body.venue
        }).then(function (dbGame) {
            res.json(dbGame);
        });
    });
    app.delete('/api/games/:id', function (req, res) {
        db.Game.destroy({
            where: {
              id: req.params.id
            }
          }).then(function(dbGame) {
            res.json(dbGame);
          });
      
    });
};