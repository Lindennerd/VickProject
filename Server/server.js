var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var morgan = require('morgan');

var bearRouter = require('./routes/bear');
var userRouter = require('./routes/user');
var authRouter = require('./routes/authentication');

var config = require('./config')

var app = express();
app.use(express.static('../Client'));

app.use(bodyParser.urlencoded({ extend: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/api', userRouter);
app.use('/api', authRouter);
app.use('/api', bearRouter);

var port = process.env.PORT || config.PORT;
app.listen(port);
mongoose.connect(config.database);

console.log('Listening port ' + port);

//https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens