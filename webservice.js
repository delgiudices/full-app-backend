module.exports = function(Event) {

    var express = require('express');
    var app = express();

    app.get('/posts', function(req, res) {
        res.header("Access-Control-Allow-Origin", "*");

        var today = new Date();
        today.setHours(today.getHours() - 6);

        if (req.query.yesterday === 'true' )
          today.setHours(today.getHours() - 24);

        var queryDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8);
        var queryTime = queryDate.getTime() / 1000;

        if ( req.query.yesterday === 'true' )
          today.setHours(today.getHours() + 24);
        else
          today.setHours(today.getHours() + 48);

        var tillTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8).getTime() / 1000;



        // var query = Event.find({ instagram_date : { "$gte" : queryTime, "$lte" : new Date()} }).limit(30);
        var query = Event.where('instagram_date').gte(queryTime).lte(tillTime).limit(30);

        if ( req.query.hot === 'true' )
            query.sort({ 'score' : -1, 'instagram_date' : -1 });
        else
            query.sort('-instagram_date');

        query.exec(function(err, events) {
            res.json(events);
        });
    });

    var generateLikeFunction = function(amount) {
        return function(req, res) {
            Event.findOne({ "_id" : req.params.id }, function(err, event) {
                event.score += amount;
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
