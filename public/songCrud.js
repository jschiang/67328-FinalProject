function addToQueue(queue, song){
	$.ajax({
		url: "songs",
		type: "put", 
		data: {
			queue: queue,
			songName: song,
		},
		success: function(data){
			console.log(data);
			location.reload();
		}
	});
	return false;
}

/*$(document).ready(function(){
	$("#").submit(function(){
		return false;
	});
});*/