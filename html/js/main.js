window.addEventListener("load", function () {
	var nickname = 'yyd';
	if (nickname) {
		var connection = new WebSocket("ws://"+window.location.hostname+":8081")
		connection.onopen = function () {
			console.log("Connection opened")
			connection.send('I am ' + nickname)
			document.getElementById("form").onsubmit = function (event) {
				var msg = document.getElementById("msg")
				if (msg.value)
					connection.send(msg.value)
				msg.value = ""
				event.preventDefault()
			}	
		}
		connection.onclose = function () {
			console.log("Connection closed")
		}
		connection.onerror = function () {
			console.error("Connection error")
		}
		connection.onmessage = function (event) {
			var div = document.createElement("div"),
				textObj = JSON.parse(event.data);
			if (textObj.user === '') {
				textObj.user = '系统消息';
				div.style.color = '#F00';
			} else if (textObj.user === nickname) {
				div.style.color = '#090';
			}
			div.textContent = '' + textObj.time + ' [' + textObj.user + ']' + textObj.msg;
			document.body.appendChild(div)
			document.body.scrollTop = document.body.scrollHeight;
		}
	}
})