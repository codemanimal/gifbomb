$(function() {
	// Compile the template when the dom is loaded
	gifTemplate = Handlebars.compile($('#gif-template').html());

	$('#gif-container').on('click', 'button', toggleUrl);

	$('#search-box').on('click', '#random', getRandomGif);
	$('#search-box').on('click', '#kittens', kittenBomb);
	$('#search-box').on('click', '#puppies', puppyBomb);

	$('#search-box').on('click', '#search', search);
	$('#search-box').on('keypress', function(event) { if (event.keyCode === 13) { search(); } });

	console.time('How long did this take?');
	console.log('HI BEFORE AJAX')
	// var response = $.ajax({url: 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTO&tag=american+psycho', method: 'GET'});
	// response.done(function(data) {
	// 	console.log('response received');
	// 	console.log(data);
	// });
	// response.fail(errorMessage);
	console.log('HI AFTER I MADE A PROMISE');
	console.timeEnd('How long did this take?');

});

// Set on initialize
var gifTemplate;

// Toggle between url for animated and static gif images
var toggleUrl = function() { $(this).siblings('img').attr('src', $(this).attr('data-value')); };

// Error message to be logged to the console
// in the event of an AJAX error ( 404 )
var errorMessage = function(error) {
	console.log('There was a problem:', error.statusText);
};

// Performs an AJAX request to the giphy api
// endpoint: http://api.giphy.com/v1/gifs/random
// api_key: dc6zaTOxFJmzC
// Request will return an object with a single gif and metadata
var getRandomGif = function() {

	$.ajax({
		url: 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC',
		method: 'GET'
	})
	.done(showRandomGif)
	.fail(errorMessage);

};

// Renders and displays the random gif returned from the API call
var showRandomGif = function(gif) {

	var data = {
		gif_animated: gif.data.image_url,
		gif_static: gif.data.fixed_width_small_still_url
	};

	$('#gif-container').html( gifTemplate(data) );

};

// Define a function puppyBomb that will
// Make a request to the giphy api
// for 10 gifs of puppies
// and render and display that reponse


var puppyBomb = function() {

	var queryUrl = 'http://api.giphy.com/v1/gifs/search?q=puppies&api_key=dc6zaTOxFJmzC&limit=10';

	$.ajax({
		url: queryUrl,
		method: 'GET'
	})
	.done(function(response) {
		var results = response.data;
		var renderedResults = results.map(function(gif) {
			var data = {
				gif_static: gif.images.fixed_width_still.url,
				gif_animated: gif.images.fixed_width.url
			};

			return gifTemplate( data );
		});

		$('#gif-container').html(renderedResults.join(''));


	});

};var kittenBomb = function() {

	var queryUrl = 'http://api.giphy.com/v1/gifs/search?q=kittens&api_key=dc6zaTOxFJmzC&limit=10';

	$.ajax({
		url: queryUrl,
		method: 'GET'
	})
	.done(function(response) {
		var results = response.data;
		var renderedResults = results.map(function(gif) {
			var data = {
				gif_static: gif.images.fixed_width_still.url,
				gif_animated: gif.images.fixed_width.url
			};

			return gifTemplate( data );
		});

		$('#gif-container').html(renderedResults.join(''));


	});

};





// Performs an AJAX request to the giphy api
// with user supplied search params
var	search = function() {

	var searchTerm = encodeURI( $('[name="search"]').val() );
	// $('[name="search"]').val().split(' ').join('+');

	var query = 'http://api.giphy.com/v1/gifs/search?q=' + searchTerm + '&api_key=dc6zaTOxFJmzC';

	$.ajax({
		url: query,
		method: 'GET'
	})
	.done(showSearchResults)
	.fail(errorMessage);

	$('input').val('');
};

// Should render and display the results
// returned from the AJAX request to giphy
var showSearchResults = function(response) {
	console.log(response)
	var results = response.data;

	var renderedResults = results.map(function(gif) {
		var data = {
			gif_static: gif.images.fixed_width_still.url,
			gif_animated: gif.images.fixed_width.url
		};

		return gifTemplate( data );
	});

	$('#gif-container').html(renderedResults.join(''));
};
