var express = require('express');
var userRouter = express.Router();

var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var User = require('../models/user');

userRouter.route('/users')
    .get(function (req, res) {
        User.find(function (err, users) {
            if (err) res.send(err);
            
            res.json(users.map(function(elem) {
            	return {name: elem.name, email: elem.email}
            }));
        });
    })

module.exports = userRouter;