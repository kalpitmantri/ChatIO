var express = require('express');
var socket = require('socket.io');
var indexRoutes = require('./routes/index-routes.js');

var app = express();
app.set("view engine","ejs");
app.use(express.static("public"));

app.use(indexRoutes);

var server = app.listen(3000,function(req,res){
	console.log("Server is Listening");
});

var io = socket(server);
connections=[],users=[];

io.on('connection',function(socket){

	connections.push(socket);
	console.log('connected: %s socket connected',connections.length);
	
	//disconnect
	socket.on('disconnect',function(data){
		users.splice(users.indexOf(socket.username),1);
		updateUsernames();
		connections.splice(connections.indexOf(socket),1);
		console.log('Disconnected : %s Sockets Connected',connections.length);
	});

	//send Message
	socket.on("chat",function(data){
		socket.username = data.handle;
		users.push(socket.username);
		console.log(socket.username);
		io.sockets.emit("chat",data);
		updateUsernames();	
	});

	socket.on("typing",function(data){
		socket.broadcast.emit("typing",data);
	});

	function updateUsernames(){
		//console.log("Inside Function");
		io.sockets.emit("get users",users);
	}
});

