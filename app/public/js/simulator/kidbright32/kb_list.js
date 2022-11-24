
/*var kb_list = {
	
	get_length: function() {
		//return 0;
		return global_nums.length;
	}
	get_index: function(val) {
		//return 0;
		return global_nums[val];
	}
};*/

var global_nums = ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0',
	'0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0',
	'0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0',
	'0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0',
	'0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'];
var a = new Array(100);
function KB_list() {
	
	this._constructor = function() {

	}
	this.set_multi = function(_length, _code){
		var c = "" + _code;
		if(_length <= 100){
			for(var i = 0; i <_length; i++){
				
				a[i] = c.slice(i * 3, (i * 3) + 1);
				global_nums[i] = a[i];
			}
		}
	}
	this.get_length = function() {
		return global_nums.length;
	}
	this.get_index = function(val) {
		return global_nums[val];
	}
	this.set_index = function(val, index) {
		global_nums[index] = val;
	}
	this.insert_first_value = function(val) {
		global_nums.unshift(val);
	}
	this.insert_last_value = function(val) {
		global_nums.push(val);
	}
	this.insert_value_index = function(val, index) {
		global_nums.splice(index, 0, val);
	}
	this.get_list_text = function(from, to) {
		return (global_nums.slice(from, to)).toString();
	}
	this._constructor();
}

