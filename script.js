
try {

	document.querySelector('#thisVideo').addEventListener('click', thisVideoCallback); 
}
catch (err) {
	console.error(err); 
}


function thisVideoCallback(){
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
						saveAs: true
					});
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

		} else {
			logOnPage('This is not a youtube url!'); 
		}
	});
}

function logOnPage(text) {
	let onPageConsole = document.querySelector('#onPageConsole'); 
	onPageConsole.innerText += 'NEW: ' + text; 
}