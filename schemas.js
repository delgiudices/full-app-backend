var mongoose = require('mongoose');
var returnObject = {};
returnObject["eventSchema"] = mongoose.Schema({

    owner : String,
    profile_picture : { type : String, default: "" },
    comments : Array,
    text : String,
    score : { type : Number, default : 0 },
    date : { type : Date, default: Date.now },
    picture_link : String,
    instagram_id : String,
    instagram_date : Number,
    
});

module.exports = returnObject;
