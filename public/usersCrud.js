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

/*function listUsers(){
	$.ajax({
		url: "users",
		type: "get",
		success: function(data){
			var list = $("#usersUL");
			list.html("");
			console.log(data);
			data.forEach(function(user){
				if (user != null){
					var deleteButton = $("<button type=button>Delete</button>");
					deleteButton.click(function(){
						deleteUser(user.username);
					});
					var entry = $("<li>User: " + user.username + "</li>");
					list.append(entry);
					list.append(deleteButton);
					entry.click(function(){
						makeEditForm(user.username);
					});
				}
			});
		}
	});
}*/

/*function makeEditForm(uName){
	var form = "<form id='updateUser'>New username: <input type='text' id='newName' placeholder='" + uName +"'><button type='button' id='submitEdit'>Submit</form>";
	var div = document.getElementById('usersList');
	div.innerHTML = div.innerHTML + form;
	$("#submitEdit").click(postUser(uName));
}*/


function postUser(uName){
	if ($("#password").val() !== $("#confirm").val()){
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
