var ldr = {
	get_cb: null,
	get: function() {
		if (this.get_cb) {
			return parseFloat(this.get_cb());
		}
		else {
			return 0;
		}
	}
};
