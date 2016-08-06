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
                res.json({success: false, message: 'Usuário não encontrado'});   
            } else if (user) {
                if(user.password != req.body.password){
                    res.json({success: false, message: 'Senha Inválida'});                   
                } else {
                    var token = jwt.sign(user, config.secret, { 
                        expiresIn : 60*60*24
                    }); // 24h long

                    res.json({
                        success: true,
                        message: 'You\'re Logged In',
                        token: token,
                        username: user.name,
                        email: user.email,
                        aboutme: user.aboutme,
                        id: user._id
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

authRouter.route('/auth/update')
    .post(function (req, res) {
        User.findById(req.body.userId, function (err, user) {
            if (err) throw err;

            if (!user) {
                res.json({success: false, message: 'Usuário desconhecido'});
            }
            else {
                user.name = req.body.username;
                user.email = req.body.email;
                user.aboutme = req.body.aboutme;
                user.admin = true;

                user.save(function (err) {
                    if (err) res.send(err);

                    res.json({
                        success: true,
                        message: 'user updated',
                        token: user.token,
                        username: user.name,
                        email: user.email,
                        aboutme: user.aboutme,
                        id: user._id
                    });
                })
            }

        })
    })

module.exports = authRouter;