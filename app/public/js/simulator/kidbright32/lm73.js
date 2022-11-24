var lm73_0 = {
	error: function() {
		return true;
	},
	get: function() {
		return 0;
	}
};

var lm73_1 = {
	get_cb: null,
	error: function() {
		return false;
	},
	get: function() {
		if (this.get_cb) {
			return parseFloat(this.get_cb());
		}
		else {
			return 0;
		}
	}
};
