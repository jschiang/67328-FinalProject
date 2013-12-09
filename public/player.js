$(document).ready(function(){
	var aud1 = $('#aud1').get(0);
	var aud2 = $('#aud2').get(0);

	aud2.volume=0;

	$(".queue > li").click(function(){
		var song = $(this).text();

		if($(this).parent().parent()[0].id == "queue1"){
			aud1.setAttribute('src', "uploads/"+song);
                        $('#juke1 .info').html(song);
			aud1.load();
		}

		if($(this).parent().parent()[0].id == "queue2"){
			aud2.setAttribute('src', "uploads/"+song);
                        $('#juke2 .info').html(song);
			aud2.load();
		}
	})

	$('#slider').on('change', function(){
	    aud1.volume=(100-$('#slider').val())/100;
	    aud2.volume=$('#slider').val()/100;
	});
})