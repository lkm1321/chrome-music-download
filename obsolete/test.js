"use strict";

// // const http = require('http-browserify'),
// // 	  $ = require('jquery-browserify'),
// // 	  bl = require('bl'),
// // 	  EventEmitter = require('events'); 

// // class EventController extends EventEmitter{

// };


const $ = require('jquery-browserify'); 
const http = require('http'); 

$(document).ready( function() {

	// $("#download-button").click(function(){
	// 	var xhr = new XMLHttpRequest(); 
	// 	xhr.open("GET", "https://www.google.com.au"); 
	// 	xhr.onreadystatechange = function() {
	// 		if (xhr.readyState == 4)
	// 		{
	// 			console.log(xhr.response);  
	// 		}
	// 	};
	// 	xhr.send(); 
	// });


	$("#download-button").click(function(){
		// console.log("Button pressed!");
		// var request = http.request({
		// 	host: "www.google.com.au",
		// 	port: 80,
		// 	path: "/",
		// 	method: "GET"
		// 	// withCredentials: false // this is the important part
			
		// }, (resp) =>{
		// 	resp.setEncoding('utf8');
		// 	resp.on('error', console.error); 
		// 	resp.on('data', (data) =>{
		// 	$('#onPageConsole').innerHTML += "Data received!";
		// 	console.log('data recieved'); 
		// 	});
		// }).on('error', console.error);
		http.get("https://www.google.com.au", console.log); 

		console.log(request); 
	});

});

