
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

var kb_fks = {
	movement : 0,
	speed : 0,
	movejoy1 : null,
	movejoy2 : null,
	motorMovement: function(_movement, _speed) {
		this.movement = _movement;
		this.speed = _speed;
	},
	joystick_1: function(){
		if(this.movejoy1() == 1){ //Up
			return 1;
		}else if(this.movejoy1() == 2){ //Down
			return -1;
		}else {
			return 0;
		}
	},
	joystick_2: function(){
		if(this.movejoy2() == 3){ //Left
			return -1;
		}else if(this.movejoy2() == 4){ //Right
			return 1;
		}else {
			return 0;
		}
	},
	time: function(){
		
	}

};
//console.log(a + ', ' + b);
//setInterval(KB_task,100);