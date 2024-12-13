// create a web server
var express = require('express');
var app = express();
// create a server
var server = require('http').createServer(app);
// create a websocket server
var io = require('socket.io').listen(server);
// create a port
var port = 3000;

// create an array to store comments
var comments = [];
// create an array to store users
var users = [];

// set the path of the web server
app.use('/public', express.static(__dirname + '/public'));

// set the path of the web server
app.get('/', function(req, res, next) {
	res.sendFile(__dirname + '/index.html');
});

// create a connection event
io.on('connection', function(socket) {
	// create a disconnection event
	socket.on('disconnect', function() {
		console.log('User ' + socket.id + ' disconnected');
		// remove the user from the users array
		for (var i = 0; i < users.length; i++) {
			if (users[i].id === socket.id) {
				users.splice(i, 1);
				break;
			}
		}
		// send the updated users array to all users
		io.emit('users', users);
	});

	// create a new comment event
	socket.on('new comment', function(data) {
		// create a new comment object
		var comment = {
			id: socket.id,
			name: data.name,
			comment: data.comment
		};
		// add the new comment to the comments array
		comments.push(comment);
		// send the updated comments array to all users
		io.emit('comments', comments);
	});

	// create a new user event
	socket.on('new user', function(data) {
		// create a new user object
		var user = {
			id: socket.id,
			name: data.name
		};
		// add the new user to the users array
		users.push(user);
		// send the updated users array to all users
		io.emit('users', users);
	});
});

// listen on the port
server.listen(port, function() {
	console.log('Server listening on port ' + port);
});