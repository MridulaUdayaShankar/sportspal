var db = require('../models');
var bcrypt = require('bcrypt');
const saltRounds = 10;
// const myPlaintextPassword = 's0/\/\P4$$w0rD';
module.exports = function (app) {

    //register: storing name, email and password and redirecting to home page after signup
    app.post('/user/create', function (req, res) {
        bcrypt.hash(req.body.passwordsignup, saltRounds, function (err, hash) {
            // this is same as INSERT INTO users VALUE email = 'the email the user typed in' limit 1
            db.User.create({
                name: req.body.usernamesignup,
                email: req.body.emailsignup,
                password: hash
            }).then(function(data) {
                res.send("You're all set! Login to your account now");
                res.redirect('/');
            });
        });
    });
    //login page: storing and comparing email and password,and redirecting to home page after login
    app.post('/user', function (req, res) {
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
                bcrypt.compare(req.body.password, user.password, function (err, result) {
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
};
