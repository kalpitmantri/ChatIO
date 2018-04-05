var socket = io.connect("http://localhost:3000");

var $output = $("#output");
var $feeback = $("#feedback");
var $handle = $("#handle");
var $message = $("#message");
var $btn = $("#msgForm");
var $allusers = $("#allusers");
var $userForm = $("#userForm");
var $chatwindow = $("#chat-window");
var $username = $("#username");
var $onlineuser = $("#onlineuser");
var name='';

$userForm.submit(function(e){
		e.preventDefault();
		name = $username.val();
		if(name){
				$userForm.hide();
				$btn.show();
				$chatwindow.show();
				$onlineuser.show();
		}
		$username.val('');
});

$btn.submit(function(e){
	e.preventDefault();
	socket.emit("chat",{message:$message.val(),handle:name});
});

message.addEventListener("keypress",function(){
	socket.emit("typing",{handle:name});
})

socket.on("chat",function(data){
	feedback.innerHTML = "";
	output.innerHTML += "<p><strong>" + data.handle + ":</strong>" + data.message + "</p>";
	$message.val("");
});

socket.on("typing",function(data){
	feedback.innerHTML = "<p><em>" + data.handle + "</em> is typing... </p>";  
});

socket.on("get users", function(data){
	var htm="";

 	for(i=0;i<data.length;i++){
		htm += '<li>' + data[i] + '</li>';
	}
	$allusers.html(htm);
});
