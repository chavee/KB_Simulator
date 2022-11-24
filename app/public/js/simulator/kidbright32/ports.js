var ports = {
	usbsw_render_cb: null,
	output1_render_cb: null,
	output2_render_cb: null,
	input1_read_cb: null,
	input2_read_cb: null,
	input3_read_cb: null,
	input4_read_cb: null,
	usbsw_value: 0,
	out1_value: 0,
	out2_value: 0,
	usbsw_write: function(val) {
		parseInt(val) == 0 ? this.usbsw_value = 0 : this.usbsw_value = 1;
		if (this.usbsw_render_cb) {
			this.usbsw_render_cb(this.usbsw_value);
		}
	},
	usbsw_toggle: function() {
		this.usbsw_value == 0 ? this.usbsw_value = 1 : this.usbsw_value = 0;
		if (this.usbsw_render_cb) {
			this.usbsw_render_cb(this.usbsw_value);
		}
	},
	usbsw_read: function() {
		return parseInt(this.usbsw_value);
	},
	output1_write: function(val) {
		parseInt(val) == 0 ? this.out1_value = 0 : this.out1_value = 1;
		if (this.output1_render_cb) {
			this.output1_render_cb(this.out1_value);
		}
	},
	output1_toggle: function() {
		this.out1_value == 0 ? this.out1_value = 1 : this.out1_value = 0;
		if (this.output1_render_cb) {
			this.output1_render_cb(this.out1_value);
		}
	},
	output1_read: function() {
		return parseInt(this.out1_value);
	},
	output2_write: function(val) {
		parseInt(val) == 0 ? this.out2_value = 0 : this.out2_value = 1;
		if (this.output2_render_cb) {
			this.output2_render_cb(this.out2_value);
		}
	},
	output2_toggle: function() {
		this.out2_value == 0 ? this.out2_value = 1 : this.out2_value = 0;
		if (this.output2_render_cb) {
			this.output2_render_cb(this.out2_value);
		}
	},
	output2_read: function() {
		return parseInt(this.out2_value);
	},
	input1_read: function() {
		if (this.input1_read_cb) {
			return parseInt(this.input1_read_cb());
		}
		else {
			return 0;
		}
	},
	input2_read: function() {
		if (this.input2_read_cb) {
			return parseInt(this.input2_read_cb());
		}
		else {
			return 0;
		}
	},
	input3_read: function() {
		if (this.input3_read_cb) {
			return parseInt(this.input3_read_cb());
		}
		else {
			return 0;
		}
	},
	input4_read: function() {
		if (this.input4_read_cb) {
			return parseInt(this.input4_read_cb());
		}
		else {
			return 0;
		}
	}
};
