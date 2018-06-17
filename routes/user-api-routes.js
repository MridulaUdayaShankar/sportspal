var db = require('../models');

module.exports = function (app) {

    app.get("/api/users/", function (req, res) {
        var query = {};
        if (req.query.game_id) {
            query.GameId = req.query.game_id;
        }
        db.User.findAll({
            where: query,
            include: [db.Game]
        }).then(function (dbUser) {
            res.json(dbUser);
        });
    });
    app.put('/api/users/games/:id', function (req, res) {
        db.User.update(req.body, {
            where: {
                id: req.body.id
            }
        }).then(function (dbUser) {
            res.json(dbUser);
        });
    });
    
};
