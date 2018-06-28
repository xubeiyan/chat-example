var rnd = function () {
	var that = {
		// 生成随机roomid
		rndRoomId: function (length = 5) {
			var nameStr = 'abcdefghijklnmopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
				lastResult = '';
				
			if (!Number.isInteger(length) || length <= 0) {
				return 'error';
			}
				
			for (var i = 0; i < length; ++i) {
				lastResult += nameStr[Math.floor(nameStr.length * Math.random())];
			}
			
			return lastResult;
		},
		// 生成随机username
		rndUsername: function () {
			var firstName = ['Alice', 'Bob', 'Cathy'],
				lastName = ['Computer', 'Chair', 'Desk'],
				rndFirst = Math.floor(firstName.length * Math.random()),
				rndLast = Math.floor(lastName.length * Math.random());
				
			return firstName[rndFirst] + lastName[rndLast];
		}
	}
	return that;
}

module.exports = rnd();