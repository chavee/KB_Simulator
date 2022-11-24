
/*function KB_servo() {
	this._constructor = function() {

	}

	this.setAngle = function(val) {
		return Math.log10(val);
	}
	this.calibrate = function(a,b,c) {
		return Math.log10(val);
	}
	//
	this._constructor();
}*/

var kb_specio = {
	analog_input1_read_cb: null,
	analog_input2_read_cb: null,
	analog_input3_read_cb: null,
	analog_input4_read_cb: null,

	inputI1_read: function() {
		if (this.analog_input1_read_cb) {
			return parseInt(this.analog_input1_read_cb());
		}
		else {
			return 0;
		}
	},
	inputI2_read: function() {
		if (this.analog_input2_read_cb) {
			return parseInt(this.analog_input2_read_cb());
		}
		else {
			return 0;
		}
	},
	inputI3_read: function() {
		if (this.analog_input3_read_cb) {
			return parseInt(this.analog_input3_read_cb());
		}
		else {
			return 0;
		}
	},
	inputI4_read: function() {
		if (this.analog_input4_read_cb) {
			return parseInt(this.analog_input4_read_cb());
		}
		else {
			return 0;
		}
	}
};
//console.log(a + ', ' + b);
//setInterval(KB_task,100);