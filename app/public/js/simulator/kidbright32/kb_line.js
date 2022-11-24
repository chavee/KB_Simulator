
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

var kb_line = {

	line_access_token : "",
	line_message : "",
	line_image_thumbnail : "",
	line_image_fullsize : "",
	line_sticker_pack : "",
	line_sticker_id : "",

	line_token: function(val) {
		this.line_access_token = val;
	},
	line_msg: function(val) {
		this.line_message = val;
	},
	line_img_1: function(val) {
		this.line_image_thumbnail = val;
	},
	line_img_2: function(val) {
		this.line_image_fullsize = val;
	},
	line_stk_pack: function(val) {
		this.line_sticker_pack = val;
	},
	line_stk_id: function(val) {
		this.line_sticker_id = val;
	}
};
//console.log(a + ', ' + b);
//setInterval(KB_task,100);