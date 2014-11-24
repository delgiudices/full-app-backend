var mongoose = require('mongoose');
var returnObject = {};
returnObject["eventSchema"] = mongoose.Schema({

    owner : String,
    comments : Array,
    text : String,
    score : { type : Number, default : 0 },
    date : { type : Date, default: Date.now },
    picture_link : String,
    instagram_id : String,
    
});

module.exports = returnObject;