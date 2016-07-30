var express = require('express');
var bearRouter = express.Router();

var bodyParser = require('body-parser');
var mongoose = require('mongoose'); 

var Bear = require('../models/bear');
var auth = require('../middlewares/authentication');

bearRouter.use(auth.isLogged);

bearRouter.route('/bears')
    .post(function (req, res) {
        var bear = new Bear();
        bear.name = req.body.name;
        bear.save(function (err) {
            if (err){
                res.send(err);
            }

            res.json({message: 'Bear Created'})
        })
    })
    .get(function(req, res) {
        Bear.find(function(err, bears) {
            if (err)
                res.send(err);

            res.json(bears);
        });
    });

bearRouter.route('/bears/:bear_id')
    .get(function (req, res) {
        Bear.findById(req.params.bear_id, function (err, bear) {
            if(err){
                res.send(err);
            }

            res.json(bear);
        })
    })
    .put(function (req, res) {
        Bear.findById(req.params.bear_id, function (err, bear) {
            if(err){
                res.send(err);
            }
            bear.name = req.body.name;

            bear.save(function (err) {
                if (err){
                    res.send(err);
                }

                res.json({message: 'Bear Created'})
            })


            res.json('bear updated!');
        })
    })
    .delete(function(req, res) {
        Bear.remove({
            _id: req.params.bear_id
        }, function(err, bear) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

    module.exports = bearRouter;