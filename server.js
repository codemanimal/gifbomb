var application_root = __dirname,
    express          = require('express'),
    path             = require('path'),
    logger           = require('morgan'),
    request 		 = require('request');

var app = express();

// Server Configuration
app.use(logger('dev'));
app.use( express.static( path.join( application_root, 'public' ) ) );
app.use( express.static( path.join( application_root, 'browser' ) ) );

// Routes

app.get('/search_for_random_gif', function(req, res) {

	request({
		uri: 'http://api.giphy.com/v1/gifs/random',
		method: 'GET',
		qs: {
			api_key: 'dc6zaTOxFJmzC'
		},
		json: true
	}, function(error, response, body){
		var results = body.data;
		res.send(results);
	});

});

app.get('/search_for_gifs', function(req, res) {
	var queryParams = req.query;
	queryParams.api_key = 'dc6zaTOxFJmzC';

	request({
		uri: 'http://api.giphy.com/v1/gifs/search',
		method: 'GET',
		json: true,
		qs: queryParams
	}, 
		function(error, respnse, body) {
			var results = body.data;
			res.send(results);
		});
});

app.listen(3000, function() {
  console.log('Express server listening on port 3000');
});