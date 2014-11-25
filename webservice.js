module.exports = function(Event) {

    var express = require('express');
    var app = express();

    app.get('/posts', function(req, res) {
        Event.find().limit(10).sort('-date').exec(function(err, events) {
            res.json(events);
        });    
    });

    var generateLikeFunction = function(amount) {
        return function(req, res) {
            Event.findOne({ "_id" : req.params.id }, function(err, event) {
                score += amount;
                event.save(function(err, event) {
                    res.json(event);
                });
            });
        }
    }

    app.get('/posts/:id/up', generateLikeFunction(1));
    app.get('/posts/:id/down', generateLikeFunction(-1)); 

    app.listen(1337);

}
