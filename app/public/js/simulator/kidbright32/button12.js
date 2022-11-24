var button12 = {
	sw1_get_cb: null,
	sw2_get_cb: null,
	sw1_get: function() {
		if (this.sw1_get_cb) {
			return parseInt(this.sw1_get_cb());
		}
		else {
			return 0;
		}
	},
	sw2_get: function() {
		if (this.sw2_get_cb) {
			return parseInt(this.sw2_get_cb());
		}
		else {
			return 0;
		}
	},	
	is_sw1_pressed: function() {
		if (this.sw1_get_cb) {
			return (this.sw1_get_cb() == 1);
		}
		else {
			return 0;
		}
	},
	is_sw1_released: function() {
		if (this.sw1_get_cb) {
			return (this.sw1_get_cb() == 0);
		}
		else {
			return 0;
		}
	},
	is_sw2_pressed: function() {
		if (this.sw2_get_cb) {
			return (this.sw2_get_cb() == 1);
		}
		else {
			return 0;
		}
	},
	is_sw2_released: function() {
		if (this.sw2_get_cb) {
			return (this.sw2_get_cb() == 0);
		}
		else {
			return 0;
		}
	},
	key_pressed: function() {
		if ((this.is_sw1_pressed()) || (this.is_sw2_pressed())) {
			return 1;
		}
		else {
			return 0;
		}
	},
	key_released: function() {
		if ((this.is_sw1_released()) && (this.is_sw2_released())) {
			return 1;
		}
		else {
			return 0;
		}
	}
};
