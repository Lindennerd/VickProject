var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose'); 

var Bear = require('./models/bear');

var app = express();    

app.use(bodyParser.urlencoded({extend: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

var router = express.Router();

router.use(function (req, res, next) {
    console.log('Something is happen');
    next();
})

router.get('/', function (req, res) {
    res.json({message: 'hello world'});
})

router.route('/bears')
    .post(function (req, res) {
        var bear = new Bear();
        bear.name = req.body.name;
        console.log('creatin bear ' +req.body.name);

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

router.route('/bears/:bear_id')
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

            console.log('updating bear ' +req.body.name);
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
    
app.use('/api', router);
app.listen(port);

mongoose.connect('localhost:27017/bear');

console.log('Listening port '+port);