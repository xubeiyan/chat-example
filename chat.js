var http = require("http")
var ws = require("nodejs-websocket")
var fs = require("fs")

http.createServer(function (req, res) {
	fs.createReadStream("chat.html").pipe(res)
}).listen(8080)

var server = ws.createServer(function (connection) {
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
})
server.listen(8081)

function broadcast(obj) {
	var str = JSON.stringify(obj);
	console.log('已广播：' + str);
	server.connections.forEach(function (connection) {
		connection.sendText(str);
	})
}
