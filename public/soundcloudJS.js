var CLIENT_ID = "aca7ca44e78ffab042189e557da17f6c";
var CLIENT_SECRET = "faf8095a0fcf82d9891b1189bfe4a027";


function search(){
	$("#resultsList").html("");
	SC.initialize({
	  client_id: CLIENT_ID
	});
	SC.get('/tracks', { q: $("#query").val(), /*license: 'cc-by-sa'*/}, function(tracks) {
	  	console.log(tracks);
	  	$("#resultsList").append("<hr>");
	  	if (tracks.length > 0){
		  tracks.forEach(function(track){
		  	var item = $("<li>"+track.title+"</li>");
		  	item.click(function(){
		  		playSC(track.uri);
		  	});
		 		$("#resultsList").append(item);
		 		$("#resultsList").append("<hr>");
	 		});
	 	}
	 	else {
	 		$("#resultsList").append("<p>no results found</p>");
	 		$("#resultsList").append("<hr>");
	 	}
	});
}

function playSC(track_url){
	$("#SCplayer").html("");
	var iframe = "<iframe frameborder='no' height='100' scrolling='no' src='http://w.soundcloud.com/player/?url="+track_url+ "' width='40%'></iframe>"
	$("#SCplayer").html(iframe);
}

$(document).ready(function(){
	$("#songsForm").submit(function(){
		return false;
	});
});