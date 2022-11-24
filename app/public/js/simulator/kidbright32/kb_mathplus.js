
function KB_mathplus() {
	this._constructor = function() {

	}

	this.p_acos = function(val) {
		return Math.acos(val);
	}
	this.p_asin = function(val) {
		return Math.asin(val);
	}
	this.p_atan = function(val) {
		return Math.atan(val);
	}
	this.p_atan2 = function(a,b) {
		return Math.atan2(a,b);
	}
	this.p_cos = function(val) {
		return Math.cos(val);
	}
	this.p_cosh = function(val) {
		return Math.cosh(val);
	}
	this.p_sin = function(val) {
		return Math.sin(val);
	}
	this.p_sinh = function(val) {
		return Math.sinh(val);
	}
	this.p_tan = function(val) {
		return Math.tan(val);
	}
	this.p_tanh = function(val) {
		return Math.tanh(val);
	}
	this.p_exp = function(val) {
		return Math.exp(val);
	}
	this.p_ldexp = function(a,b) {
		return a * (Math.pow(2,b));
	}
	this.p_log = function(val) {
		return Math.log(val);
	}
	this.p_log10 = function(val) {
		return Math.log10(val);
	}
	this.p_pow = function(a,b) {
		return Math.pow(a,b);
	}
	this.p_sqrt = function(val) {
		return Math.sqrt(val);
	}
	this.p_ceil = function(val) {
		return Math.ceil(val);
	}
	this.p_fabs = function(val) {
		return Math.abs(val);
	}
	this.p_floor = function(val) {
		return Math.floor(val);
	}
	this.p_fmod = function(a,b) {
		return a % b;
	}
	//
	this._constructor();
}
//console.log(a + ', ' + b);
//setInterval(KB_task,100);