/**
 * 
 *  Chrome share music extension
 *
 *  @brief	Node.js rewrite using browserify and jquery-browserify. 
 *  
 *  @author Brian Lee
 *  
 *  @TODO: Add Spotify support
 *  @TODO: Add Google drive support
 *  
 */

"use strict"; 

const 	http = require('http'),
		$ = require('jquery-browserify'),
		bl = require('bl'); 
		EventEmitter = require('events'); 

class EventsController extends EventEmitter{
	// @TODO: Custom methods, fields? 
	};

const eventsController = new EventsController(); 
eventsController.on('loading-done', function (apiResponse) {
	console.log(apiResponse); 
}); 


$(document).ready(function(){

	const youtubeUrl = 'https://www.youtube.com/watch?v='; 
	const apiUrl = 'https://www.youtubeinmp3.com/fetch/?format=JSON&video='; 
	var apiResponse = null; 

	// Register download button callback. 
	$('#download-button').click = downloadButtonCallback; 

	// Get current URL. Test if 
	chrome.tabs.query({
		'active': true,
		'lastFocusedWindow': true
	}, (tabs) => {

		// @TODO: Better way than the first index? 
		// 
		let url = tabs[0].url; 

		if (url.includes(youtubeUrl)){

			http.get(apiUrl + url, (resp) => {

				resp.pipe(bl( (err, data) => {
					
					if (err) throw err; 
					apiResponse = JSON.parse(data);

				}));

			}).on('error', errorCallback);

		} else {

		}

	});

});

function errorCallback(err){
	console.error(err); 
	throw err; 
}


function pipeUrlFileTo(url, buffer){
	http.get(url, (res) => {
		res.pipe(buffer); 
	}).on('error', (err) => {throw err;});
}
