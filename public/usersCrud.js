function newUser(){
	if ($("#password").val() !== $("#check").val()){
		alert("Passwords do not match");
	}
	else{
		$.ajax({
			url: "users",
			type: "put", 
			data: {
				username: $("#username").val(),
				password: $("#password").val(),
			},
			success: function(data){
				console.log(data);
				document.location.href = '/users'
			}
		});
		return false;
	}
}

function postUser(uName){
	if ($("#newPass").val() !== $("#confirm").val()){
		alert("Passwords do not match");
	}
	else{
		console.log($("#newName").val());
		$.ajax({
			url: "username",
			type: "post",
			data: {
				oldName: uName,
				oldPass: $("#oldPass").val(),
				newuName: $("#newuName").val(),
				newPass: $("#newPass").val(),
			},
			success: function(data){
				document.location.href = '/users';
			}
		});
	}
}

function deleteUser(uName){
	$.ajax({
		url: "username",
		type: "delete",
		data: {
			username: uName
		},
		success: function(data){
			console.log("Deleted User " + uName);
			document.location.href = '/users';
		}
	});
}



$(document).ready(function() {
	//$("putButton").click(newUser);
	//$("#submitEdit").click(postUser())
	$("#newUser").submit(function(){
		return false;
	});
	$("#updateUser").submit(function(){
		return false;
	});
	$("#deleteUser").submit(function(){
		return false;
	})
	//listUsers();
});
