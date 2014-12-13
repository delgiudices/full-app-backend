module.exports = function(Event) {

    var https = require('https');


    var options =  {
        hostname : 'api.instagram.com',
        port : 443,
        path : '/v1/users/self/feed?access_token=1570130918.1fb234f.5daf769198c246619f2701b913dbc8bc',
        method : 'GET'
    };

    var parseData = function(data) {

        var json_object = JSON.parse(data);
        var posts = json_object.data;

        for ( postKey in posts ) {

            var newEvent_data = {};

            newEvent_data["owner"] = posts[postKey].user.username;
            newEvent_data["text"] = posts[postKey].caption.text;
            newEvent_data["picture_link"] = posts[postKey].images.standard_resolution.url;
            newEvent_data["instagram_id"] = posts[postKey].id;
            newEvent_data["instagram_date"] = posts[postKey].created_time;
            newEvent_data["profile_picture"] = posts[postKey].user.profile_picture;

            var newEvent = new Event(newEvent_data);

            var finished = false;


            var generateFunction = function(eventData) {
                return function(err, events) {
                    if ( events.length == 0 ) {
                        eventData.save(function(err, newEvent) {

                            console.log(newEvent.text + ".... was saved" );

                        });
                    }
                }
            }

            Event.find({ "instagram_id" : newEvent.instagram_id }, generateFunction(newEvent) );

        }

        console.log("Reloaded");
    }

    var request = function() {

        var req = https.request(options, function(res) {
            var json_data = '';

            res.on('data', function(d) { 
                json_data += d;
            });

            res.on('end', function() {
                parseData(json_data);  
            });
        });

        req.end();
    }

    var minutes = function(amount) { 
      return amount * 60000;
    }

    var delay_amount = 1;
    setInterval(request, minutes(delay_amount));

    // start request first time
    request();

    console.log("Robot was set to reload each " + delay_amount + " minutes.");
}
