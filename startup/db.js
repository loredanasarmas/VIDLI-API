const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function(){
    mongoose.connect('mongodb://localhost/vidly',{ useNewUrlParser: true })
    .then(() => winston.info('connected to mongodb'));
    mongoose.set('useCreateIndex', true);
}