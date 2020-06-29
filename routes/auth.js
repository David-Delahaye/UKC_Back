const router = require('express').Router();
const passport = require('passport');
const genPassword = require('../lib/passwordUtils').genPassword;
const pool = require('../config/db');



router.get('/api/login', (req, res, next) => {
    const form = '<h1>Login Page</h1><form method="POST" action="/api/login">\
    Enter Username:<br><input type="text" name="uname">\
    <br>Enter Password:<br><input type="password" name="pw">\
    <br><br><input type="submit" value="Submit"></form>';
    res.send(form);
});

router.get('/api/register', (req, res, next) => {

    const form = '<h1>Register Page</h1><form method="post" action="/api/register">\
                    Enter Username:<br><input type="text" name="username">\
                    <br>Enter Password:<br><input type="password" name="password">\
                    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);
});

router.get('/api/success', (req,res) => {
    console.log('well done');
    
})

router.get('/api/fail', (req,res) => {
    console.log('no no');
})
//----------------POSTS

router.post('/api/register', (req, res, next) => {
    console.log(req.body);
    const saltHash = genPassword(req.body.password);
    
    const username = req.body.username;
    const salt = saltHash.salt;
    const hash = saltHash.hash;

    pool.query("INSERT INTO users (username, hash, salt) VALUES($1,$2,$3)", [username, hash, salt])
    .then(res.redirect('/api/login'));
 });

router.post('/api/login', passport.authenticate('local',{ failureRedirect: '/api/fail', successRedirect: '/api/success' }));

module.exports= router;