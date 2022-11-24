
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

var kb_servo = {
	angle : 0,
	outputA : 0,
	outputC : 0,
	time1 : 0.5,
	time2 : 2.5,
	setAngle: function(out,val) {
		this.angle = val;
		this.outputA = out;
	},
	calibrate: function(out,min,max) {
		this.time1 = min;
		this.time2 = max;
		this.outputC = out;
	}
};
//console.log(a + ', ' + b);
//setInterval(KB_task,100);