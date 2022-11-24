
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

var kb_bluetooth = {
	bt_name : "",
	bt_auth : null,
	bt_password : "0",
	bt_recv : null,
	bt_get : "0",
	bt_send : "",
	bluetooth_setup: function(val) {
		this.bt_name = val;
	},
	bluetooth_on_auth: function() {
		/*if(this.bt_auth){
			return this.bt_auth();

		}else {
			return 0;
		}*/
	},
	bluetooth_get_password: function() {
		//if(this.bt_password){
			//return this.bt_password();
		if(this.bt_password){
			return '140502';
		}else {
			return '140502';
		}
	},
	bluetooth_on_data: function() {
		/*if(this.bt_recv){
			return this.bt_recv();

		}else {
			return 0;
		}*/
	},
	bluetooth_get_data: function() {
		/*if (this.bt_get ) {
			return this.bt_get();
		}
		else {
			return '0';
		}*/
		return '0';
	},
	bluetooth_send_data: function(val) {
		this.bt_send = val;
	},
};
//console.log(a + ', ' + b);
//setInterval(KB_task,100);