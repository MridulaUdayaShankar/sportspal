var db = require('../models');

function Api (app) {

    // Create a user
    app.post('/api/users', function (req, res) {
        db.User.create(req.body).then(x => {
            res.status(200);
            res.json(x);
        });
    });

    // Retrieve all users for a given game id
    app.get('/api/users/game/:id', function (req, res) {
        const id = Number(req.params.id) || 0;
        db.User.findAll({
            include: [{
                model: db.GameUser,
                where: {GameId: id}
            }]
        }).then(users => {
            res.json(users);
        });
    });

    // Retrieve game via query
    app.get('/api/games', function (req, res) {
        db.Game.findAll({
            where: req.query
        }).then( function (results){
            res.json(results);
        });
    });

    // Retrieve all games for a given user id
    app.get('/api/games/user/:id', function (req, res) {
        const id = Number(req.params.id) || 0;
        db.Game.findAll({
            include: [{
                model: db.GameUser,
                where: {UserId: id}
            }]
        }).then( games => {
           console.log(games);
            res.json(games);
        });
    });

    // Create a game
    app.post('/api/games/', function (req, res) {
        const id = Number(req.body.user.id) || 0;
        db.Game.create(req.body.game).then(result => {
            db.GameUser.create({GameId: result[0].id, UserId: id}).then(result => {
                res.status(200).end();
            });
        });
    });

    // Add a user to a game
    app.post('/api/games/join', function (req, res) {
        const GameId = req.body.game.id;
        const UserId = req.body.user.id;
        db.GameUser.create({GameId: GameId, UserId: UserId}).then(x => {
            res.status(200).end();
        });
    });

}

module.exports = Api;