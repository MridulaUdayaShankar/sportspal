var db = require('../models');
var bcrypt = require('bcryptjs');

module.exports = function (app) {

    //if user trys to sign in with the wrong password or email tell them that on the page
    app.post('/', function (req, res) {

        // this is same as select * from users where email = 'the email the user typed in' limit 1
        db.User.findOne({
            where: {
                email: req.body.email
            }
        }).then(function (user) {
            res.send(user);

            if (user == null) {
                res.redirect('/');
            }
            // password_hash comes from user data model. At the moment this column is not inside the user data model
            bcrypt.compare(req.body.password, user.password_hash, function (err, result) {
                if (result == true) {

                    req.session.logged_in = true;
                    req.session.user_id = user.id;
                    req.session.user_email = user.email;

                    res.redirect('/home');
                } else {
                    res.redirect('/');
                }
            });
        })
    });

    app.post('/create', function (req, res) {
        /* this is same as
            SELECT *
            FROM users
            WHERE email = 'email the user typed in'
        */
        db.User.findAll({
            where: {
                email: req.body.email
            }
        }).then(function (users) {
            res.send(users);

            if (users.length > 0) {
                console.log(users);
                res.send('The email or username already exists for this account');
            } else {

                // hash the password
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(req.body.password, salt, function (err, hash) {
                        db.User.create({
                            email: req.body.email,
                            password_hash: hash
                        }).then(function (user) {

                            req.session.logged_in = true;
                            req.session.user_id = user.id;
                            req.session.user_email = user.email;

                            res.redirect('/person')
                        });
                    });
                });

            }
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
