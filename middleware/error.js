
module.exports = function(err, res, req, next){
    console.log(err.message, err );
    res.status(500).send('Something failed');
}