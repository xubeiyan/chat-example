var messageArea = document.getElementById('messages-area'),
	usersList = document.getElementById('users-list'),
	sendMessage = document.getElementById('send-message'),
	sendButton = document.getElementById('send-button'),
	// 发送消息
	sendIt = function () {
		if (sendMessage.value == '') {
			return;
		}
		
		socket.emit('chat message', sendMessage.value);
		sendMessage.value = '';
	},
	// 增加一条消息
	addMessage = function (text) {
		messageArea.innerHTML += '<pre>' + text + '</pre>';
	};

var socket = io(window.location.search);

socket.on('connect', function () {
	console.log('connected!');
});
	
// 监听按下按钮
sendButton.addEventListener('click', sendIt);

// sendMessage.addEventListener('keypress', function (event) {
	// if (event.keyCode) {
		// console.log(event.keyCode);
	// }
// });

socket.on('chat message', function (msgObj) {
	var	text = '[' + msgObj.datetime + ']' + msgObj.from + ': ' + msgObj.chat;
	addMessage(text);
});

socket.on('user join', function (msgObj) {
	var text = '[' + msgObj.datetime + ']' + msgObj.content;
	addMessage(text);
});