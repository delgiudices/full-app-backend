// Deploying
var mongoose = require('mongoose'),
    https = require('https'),
    schemas = require('./schemas.js');

mongoose.connect('mongodb://localhost/fullapp');

var db = mongoose.connection;
var Event = mongoose.model('Event', schemas.eventSchema);


db.once('open', function() {

    require('./robot.js')(Event);
    require('./webservice.js')(Event);

});


process.on('uncaughtException', function(err) {
    console.log("Uncaught exception");
    console.log(JSON.toString(err));
});
