$(function() {
	gifTemplate = Handlebars.compile($('#gif-template').html());

	$('#search-box').on('click', '#search', search);
	$('#search-box').on('keypress', function(event) {
		if (event.keyCode === 13) { search(); }
	});
	$('#search-box').on('click', '#random', randomGifSearch);	
	$('#search-box').on('click', '#kittens', kittenBomb);
	$('#search-box').on('click', '#puppies', puppyBomb);
	$('#gif-container').on('click', 'button', toggleUrl);
});

var gifTemplate;

var errorMessage = function(error) { console.log('There was a problem:', error.statusText); };
var toggleUrl = function() { $(this).siblings('img').attr('src', $(this).data('value') ); };

var randomGifSearch = function() {
	$.ajax({
		url:'/search_for_random_gif',
		method: 'GET'
	})
	.done(showRandomGif)
	.error(errorMessage);
};

var showRandomGif = function(gif) {
	var data = {
		gif_animated: gif.image_url,
		gif_static: gif.fixed_width_small_still_url
	};
	$('#gif-container').html(gifTemplate(data));
};


// Part Deux

var kittenBomb = function() {
	$.ajax({
		url: 'search_for_gifs?q=kitten',
		method: 'GET'
	})
	.done(showSearchResults)
	.error(errorMessage);
};

var puppyBomb = function() {
	$.ajax({
		url: 'search_for_gifs?q=puppy',
		method: 'GET'
	})
	.done(showSearchResults)
	.error(errorMessage);
};

var	search = function() {
	var query = encodeURI($('#search-box input').val());
	$('#search-box input').val('');

	$.ajax({
		url: 'search_for_gifs?q=' + query,
		method: 'GET'
	})
	.done(showSearchResults)
	.error(errorMessage);
};

var showSearchResults = function(results) {
	var renderedGifs = results.map(function(gif) {
		var data = {
			gif_static: gif.images.fixed_width_still.url,
			gif_animated: gif.images.fixed_width.url
		};
		return gifTemplate(data);
	});

	$('#gif-container').html(renderedGifs.join(''));
};