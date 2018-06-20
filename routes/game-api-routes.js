var db = require('../models');
var request = require('request');
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
    //create game 
    app.post("/api/games/", function (req, res) {
        db.Game.create({
            name: req.body.name,
            date: req.body.date,
            venue: req.body.venue,
            team: req.body.team

        }).then(function (dbGame) {
            res.json(dbGame);
        });
    });
    app.delete('/api/games/:id', function (req, res) {
        db.Game.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbGame) {
            res.json(dbGame);
        });

    });
    app.put('/api/users/games/', function (req, res) {
        // this is same as UPDATE users WHERE email = 'the email the user typed in' limit 1
        db.Game.update({
            date: req.body.date,
            venue: req.body.venue,
            team: req.body.team
        }, {
                where: {
                    name: req.body.name
                }
            }).then(function (dbGame) {
                res.json(dbGame);
            });
    });
    app.get('/api/stats', function (req, res) {
        var queryURL = 'https://api.sportradar.us/soccer-t3/intl/en/schedules/2018-06-01/results.json?api_key=vcwrmkujsgx84c9sae8zc5vn';
        request(queryURL, function (err, response) {
            if (err) throw err;
            else {
                console.log("response.body", JSON.parse(response.body));
                res.json(JSON.parse(response.body));
            }
        });
    });
};