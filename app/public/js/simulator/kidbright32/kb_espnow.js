
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

var kb_espnow = {
	macaddress : '0',
	msgval : '0',
	msgval2 : '0',
	read_mac : null,
	read_string : null,
	read_num : null,
	recv : null,
	esp_getmac: function() {
		if (this.read_mac) {
			return this.read_mac();
		}
		else {
			return 0;
		}
	},
	esp_send: function(_msgval) {
		this.msgval = _msgval;
	},
	esp_send2: function(_macaddress, _msgval2) {
		this.macaddress = _macaddress;
		this.msgval2 = _msgval2;
	},
	esp_recv: function() {
		if(this.recv){
			return this.recv();

		}else {
			return 0;
		}
	},
	esp_read_string: function() {
		if (this.read_string ) {
			if(this.recv() == 1){
				return this.read_string();
			}
			else{
				return '';
			}
		}
		else {
			return '';
		}
	},
	/*esp_read_string: function() {
		if (this.read_string ) {
			return '' + this.read_string();
		}
		else {
			return '';
		}
	},*/
	esp_read_number: function() {
		if (this.read_num) {
			if(this.recv() == 1){
				return parseFloat(this.read_num());
			}
			else{
				return 0;
			}
		}
		else {
			return 0;
		}
	},
	/*esp_read_number: function() {
		if (this.read_num) {
			return parseFloat(this.read_num());
		}
		else {
			return 0;
		}
	},
	time: function(){
		
	}*/

};
//console.log(a + ', ' + b);
//setInterval(KB_task,100);