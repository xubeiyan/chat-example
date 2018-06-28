var time = function () {
	var that = {
		localeString: function () {
			var datetime = new Date();
			return datetime.toLocaleString();
		}	
	}
	return that;
}

module.exports = time();