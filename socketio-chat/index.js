var express = require('express')
	app = express(),
	http = require('http').Server(app),
	io = require('socket.io')(http),
	path = require('path'),
	rnd = require('./util/rnd.js'),
	time = require('./util/time.js');
	
	
var users = {};
// app.get('/', function (req, res) {
	// console.log(req.query);
	// res.sendFile(__dirname + '/html/index.html');
// });

app.use(express.static(path.join(__dirname, 'html')));

io.on('connect', function (socket) {
	var roomid = rnd.rndRoomId(),
		username = rnd.rndUsername();
		
	if (socket.handshake.query.roomid != undefined && socket.handshake.query.roomid != 'undefined') {
		roomid = socket.handshake.query.roomid;
	}
	
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