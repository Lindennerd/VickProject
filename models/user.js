var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({ 
    name: String, 
    email: String, 
    password: String, 
    aboutme: String,
    admin: Boolean 
}));