
try {
	// @TODO: replace with a jQuery call. 
	window.onload = popupOpenCallback; 
}
catch (err) {
	console.error(err); 
}

var apiTargetUrl = null; 

function popupOpenCallback(){

	document.querySelector('#download-button').addEventListener('click', downloadButtonCallback); 
	// Fetch current URL, check if valid YouTube URL
	// "use strict"; 

	// const youtubeUrl = 'https://www.youtube.com/watch?v='; 
	
	// // Get the current tab. 
	// chrome.tabs.query({
	// 	'active': true, 
	// 	'lastFocusedWindow': true
	// }, 
	// // Callback 
	// (tabs) => {
		
	// 	let url = tabs[0].url; 
		
	// 	// Is a valid URL. 
	// 	if ( url.includes(youtubeUrl) ) {
	// 		var xhr = new XMLHttpRequest(); 
	// 		xhr.open("GET",)
	// 	} 
	// 	// Is not a valid URL
	// 	else {

	// 	}

	// });

}


// @TODO: not used yet. Refactor. 
// 
function getApiResp(targetUrl){
	const apiUrl = 'https://www.youtubeinmp3.com/fetch/?format=JSON&video='; 
	var xhr = newXMLHttpRequest(); 
	xhr.open("GET", apiUrl + targetUrl); 
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4)
		{
			return JSON.parse(xhr.response); 
		}
	};
	xhr.send();  
}

function downloadButtonCallback(){
	// console.log
	chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, (tabs) => {
	var url = tabs[0].url; 
	// var youtubeUrl = '\bhttps://www.youtube.com/watch?v=+[A-Z0-9]'; 
	
	const youtubeUrl = 'https://www.youtube.com/watch?v='; 
	const apiUrl = 'https://www.youtubeinmp3.com/fetch/?format=JSON&video='; 

		if ( url.includes(youtubeUrl) ){
			// logOnPage('This is a youtube url!');

			var xhr = new XMLHttpRequest(); 
			xhr.open("GET", apiUrl + url); 
			xhr.onreadystatechange = function(){
				if (xhr.readyState == 4)
				{
					let resp = JSON.parse(xhr.response); 
					
					chrome.downloads.download({
						url: resp.link, 
						filename: resp.title + '.mp3', 
						saveAs: false
					});

					logOnBox('Done! Enjoy :D'); 
					// console.log(resp.link);
					// console.log(resp);
					// var getRequest = new XMLHttpRequest(); 
					// getRequest.open("GET", resp.link); 
					// getRequest.onreadystatechange = function() {
					// 	if (getRequest.readyState == 4)
					// 	{
					// 		console.log(getRequest.response); 
					// 	}
					// }
				}
			}
			xhr.send(); 
			logOnBox('Sending download request...')
		} else {
			logOnBox('This is not a youtube url!'); 
		}
	});
}

function logOnBox(text) {
	let onPageConsole = document.querySelector('#onPageConsole'); 
	onPageConsole.innerHTML = text; 
}