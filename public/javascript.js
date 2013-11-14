function newUser(){
	$.ajax({
		url: "users",
		type: "put", 
		data: {
			username: $("#username").val(),
		},
		success: function(data){
			console.log(data);
		}
	});
	return false;
}

function listUsers(){
	$.ajax({
		url: "users",
		type: "get",
		success: function(data){
			var list = $("#usersUL");
			list.html("");
			console.log(data);
			data.forEach(function(user){
				if (user != null){
					deleteButton = $("<button type=button>Delete</button>");
					deleteButton.click(function(){
						deleteUser(user.username);
					});
					var entry = $("<li>User: " + user.username + "</li>");
					list.append(entry);
					list.append(deleteButton);
				}
			});
		}
	});
}

function deleteUser(uName){
	$.ajax({
		url: "users/username",
		type: "delete",
		data: {
			username: uName
		},
		success: function(data){
			console.log("Deleted User " + uName);
		}
	});
}

function postUser(){
	$.ajax({
		url: users,
		type: post,
		//data:
	});
}

$(document).ready(function() {
	$("putButton").click(newUser);

	$("#newUser").submit(function(){
		return false;
	});
	listUsers();
});
