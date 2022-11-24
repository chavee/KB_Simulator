
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

var kb_iot = {
	gauge_iot_value1 : 0,
	gauge_iot_value2 : 0,
	gauge_iot_title1 : "",
	gauge_iot_title2 : "",
	gauge_iot_unit1 : "",
	gauge_iot_unit2 : "",
	gauge_iot_color1 : "",
	gauge_iot_color2 : "",
	gauge_iot_max1 : 0,
	gauge_iot_max2 : 0,
	feed_iot_value1 : 0,
	feed_iot_value2 : 0,
	feed_iot_title : "",
	feed_iot_color1 : "",
	feed_iot_color2 : "",

	gauge_Value1: function(val) {
		this.gauge_iot_value1 = val;
	},
	gauge_Value2: function(val) {
		this.gauge_iot_value2 = val;
	},
	gauge_title1: function(val) {
		this.gauge_iot_title1 = val;
	},
	gauge_title2: function(val) {
		this.gauge_iot_title2 = val;
	},
	gauge_unit1: function(val) {
		this.gauge_iot_unit1 = val;
	},
	gauge_unit2: function(val) {
		this.gauge_iot_unit2 = val;
	},
	gauge_color1: function(val) {
		this.gauge_iot_color1 = val;
	},
	gauge_color2: function(val) {
		this.gauge_iot_color2 = val;
	},
	gauge_max1: function(max) {
		this.gauge_iot_max1 = max;
	},
	gauge_max2: function(max) {
		this.gauge_iot_max2 = max;
	},
	feed_Value1: function(val) {
		this.feed_iot_value1 = val;
	},
	feed_Value2: function(val) {
		this.feed_iot_value2 = val;
	},
	feed_title: function(val) {
		this.feed_iot_title = val;
	},
	feed_color1: function(val) {
		this.feed_iot_color1 = val;
	},
	feed_color2: function(val) {
		this.feed_iot_color2 = val;
	}
};
//console.log(a + ', ' + b);
//setInterval(KB_task,100);