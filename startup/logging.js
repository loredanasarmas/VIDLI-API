
const winston= require('winston');
require('express-async-errors');

module.exports = function (){
    process.on('uncaughtException', ex =>{
        console.log('we got an uncauht exception');
        winston.error(ex.message, ex);
    });
    
    process.on('unhadledRejection', ex =>{
        console.log('we got an unhandled rejection');
        winston.error(ex.message, ex);
        process.exit(1);
    });
    
    winston.add(winston.transports.File, { filename: 'error.log' });

}