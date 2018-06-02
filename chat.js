const http = require("http"),
	WebSocket = require("ws"),
	fs = require("fs");

var wss = new WebSocket.Server({port: 8081}),
	httpHandler = function (req, res) {
		// console.log('url=', req.url);
		if (req.url == '/') {
			fs.createReadStream('html/chat.html').pipe(res);		
		} else if (req.url == '/favicon.ico') {
			res.writeHead(404);
			res.end();
		} else if (req.url == '/js/main.js') {
			fs.createReadStream('html/js/main.js').pipe(res);
		}
	},
	broadcast = function (obj) {
		var str = JSON.stringify(obj);
		console.log('已广播：' + str);
		ws.connections.forEach(function (connection) {
			connection.sendText(str);
		});
	};

wss.on('connetion', function (ws) {
	wss.on('message', function (message) {
		if (message.substr(0, 4) != 'I am') {
			console.log('not "I am" message');
			// TODO: kick it
			return;
		}
		
		var data = message.substr(4);
		wss.clients.forEach(function (client) {
			if (client.readyState == WebSocket.OPEN) {
				var date = new Date();
				client.send('[' + date.toLocaleTimeString() + ']' + data + ' enter room...');
			}
		});
		
		ws.send('received');
	});
	
});
// 监听在8080和8081端口上
/*
wsHandler = function (connection) {
		connection.nickname = null
		connection.on("text", function (str) {
			var date = new Date(),
				dateStr = '[' + date.toLocaleTimeString() + '] ',
				textObj = {};
			textObj.time = dateStr;
			textObj.user = '';
			textObj.msg = '';
				
			if (connection.nickname === null) {
				connection.nickname = str;
				textObj.msg = str + '已加入聊天';
				broadcast(textObj);
			} else {
				textObj.user = connection.nickname;
				textObj.msg = str;
				broadcast(textObj);
			}
		})
		connection.on("close", function () {
			var date = new Date(),
				dateStr = '[' + date.toLocaleTimeString() + '] ',
				textObj = {};
			textObj.time = dateStr;
			textObj.user = '';
			textObj.msg = connection.nickname + '已经离开';
			broadcast(textObj);
		})
		connection.on("error", function (err) {
			console.log(err);
		})
	},
	*/
http.createServer(httpHandler).listen(8080);


