var express = require('express');
var userRouter = express.Router();

var bodyParser = require('body-parser');
var mongoose = require('mongoose'); 

var User = require('../models/user');

userRouter.route('/users')
    .post(function (req, res) {
        var user = new User();
        user.name = req.body.userName;
        user.email = req.body.emailAddress;
        user.password = req.body.password;
        user.admin = true;

        user.save(function (err) {
            if(err) res.send(err);

            res.json('created user ' +user.name); 
        })
    })

module.exports = userRouter;