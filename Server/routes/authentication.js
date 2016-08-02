var express = require('express');
var jwt = require('jsonwebtoken');
var config = require('../config')

var authRouter = express.Router();

var bodyParser = require('body-parser');
var mongoose = require('mongoose'); 

var User = require('../models/user');

authRouter.route('/auth')
    .post(function (req, res) {
        User.findOne({name: req.body.userName }, function (err, user) {
            if(err) throw err;

            if(!user){
                res.json({success: false, message: 'User Not Found'});   
            } else if (user) {
                if(user.password != req.body.password){
                    res.json({success: false, message: 'Invalid password'});                   
                } else {
                    var token = jwt.sign(user, config.secret, { 
                        expiresIn : 60*60*24
                    }); // 24h long

                    res.json({
                        success: true,
                        message: 'You\'re Logged In',
                        token: token
                    });
                }
            }
        });
    });

authRouter.route('/auth/signup')
    .post(function (req, res) {
        var user = new User();
        user.name = req.body.userName;
        user.email = req.body.emailAddress;
        user.password = req.body.password;
        user.admin = true;

        user.save(function (err) {
            if (err) res.send(err);

            res.json('created user ' + user.name);
        })
    })

module.exports = authRouter;