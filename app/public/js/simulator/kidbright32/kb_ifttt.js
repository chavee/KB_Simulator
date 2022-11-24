
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

var kb_ifttt = {

	ifttt_key : "",
	ifttt_name : "",
	ifttt_value1 : "",
	ifttt_value2 : "",
	ifttt_value3 : "",

	ift_key: function(val) {
		this.ifttt_key = val;
	},
	ift_name: function(val) {
		this.ifttt_name = val;
	},
	ift_val: function(val1, val2, val3) {
		this.ifttt_value1 = val1;
		this.ifttt_value2 = val2;
		this.ifttt_value3 = val3;
	}
};
//console.log(a + ', ' + b);
//setInterval(KB_task,100);