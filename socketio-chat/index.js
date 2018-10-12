var express = require('express')
	app = express(),
	http = require('http').Server(app),
	io = require('socket.io')(http),
	path = require('path'),
	room = undefined,
	rnd = require('./util/rnd.js'),
	time = require('./util/time.js');
	
	
var users = {};

app.use(express.static(path.join(__dirname, 'html')));
app.get('/:id', function (req, res) {
	// console.log(req.params.id);
	room = req.params.id;
	res.sendFile(__dirname + '/html/index.html');
});

io.on('connect', function (socket) {
	var roomid = room === undefined ? rnd.rndRoomId() : room,
		username = rnd.rndUsername();
	
	socket.join(roomid);
	
	var msgObj = {
		datetime: time.localeString(),
		content: username + ' joined room ' + roomid,
		roomid: roomid,
		username: username,
	}
	io.to(roomid).emit('user join', msgObj);
	
	console.log('user ' + username + ' joined in room ' + roomid);
	
	socket.on('disconnect', function () {
		var msgObj = {
			datetime: time.localeString(),
			content: username + ' leaved room',
		}
		io.to(roomid).emit('user leave', msgObj);
		console.log('user ' + username + ' leaved room ' + roomid);
	});
	
	socket.on('chat message', function (msg) {
		console.log('[message]' + 'from:' + username + ' msg:' + msg);
		var msgObj = {
			from: username,
			chat: msg,
			datetime: time.localeString(),
		};
		io.to(roomid).emit('chat message', msgObj);
	});
});

http.listen(3000, function() {
	console.log('Listening on *:3000');
})