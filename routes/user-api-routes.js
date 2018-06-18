var db = require('../models');
var bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
module.exports = function (app) {

    //register: storing name, email and password and redirecting to home page after signup
    app.post('/user/create', function (req, res) {
        /* this is same as
            SELECT *
            FROM users
            WHERE email = 'email the user typed in'
        */
        db.User.findAll({
            where: {
                email: req.body.email
            }
        }).then(function (user) {
            res.send(user);

            if (user.length > 0) {
                console.log(user);
                res.send('The email or username already exists for this account');
            } else {

                // hash the password
                bcrypt.genSalt(saltRounds, function (err, salt) {
                    bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
                        db.User.create({
                            email: req.body.email,
                            password: hash
                        }).then(function (user) {
                            console.log('user retrieved');
                            req.session.logged_in = true;
                            req.session.user_id = user.id;
                            req.session.user_email = user.email;

                            res.redirect('/home')
                        });
                    });
                });
            }
        });
    });
    //login page: storing and comparing email and password,and redirecting to home page after login
    app.post('/user/:id', function (req, res) {

        // this is same as select * from users where email = 'the email the user typed in' limit 1
        db.User.findOne({
            where: {
                email: req.body.email
            }
        }).then(function (user) {
            if (!user) {
                res.redirect('/');
            } else {
                // password_hash comes from user data model. At the moment this column is not inside the user data model
                bcrypt.compare(myPlaintextPassword, hash, function (err, result) {
                    if (result == true) {
                        res.redirect('/home');
                    } else {
                        res.send('Incorrect password');
                        res.redirect('/');
                    }
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
