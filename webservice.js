module.exports = function(Event) {

    var express = require('express');
    var app = express();

    app.get('/posts', function(req, res) {
        Event.find().limit(10).sort('-date').exec(function(err, events) {
            res.json(events);
        });    
    });

    app.get('/posts/:id/up', function(req, res) {
        Event.findOne({ "_id" : req.params.id }, function(err, event) {
            event.score++;
            event.save(function(event) {
                res.json(event);
            });
        });
    });

    app.listen(1337);

}
