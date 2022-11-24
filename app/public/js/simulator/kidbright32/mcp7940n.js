/*char *get_datetime(void);
char *get_datetime_with_second(void);
char *get_date(void);
char *get_time(void);
char *get_time_with_second(void);
int get(int index);
void write(char *str);
bool write_flag(void);
void cal(int val);
void cal_coarse(int val);*/

function Mcp7940n() {
	this._constructor = function() {

	}

	this.get_datetime = function() {
		return moment().format('DD/MM/YYYY HH:mm');
	}

	this.get_datetime_with_second = function() {
		return moment().format('DD/MM/YYYY HH:mm:ss');
	}

	this.get_date = function() {
		return moment().format('DD/MM/YYYY');
	}

	this.get_time = function() {
		return moment().format('HH:mm');
	}

	this.get_time_with_second = function() {
		return moment().format('HH:mm:ss');
	}

	this.get = function(index) {
		// 0..5 = day,month,year,hour,minute,second
		var res = 0;
		switch (index) {
			case 0:
				res = moment().format('DD');
				break;

			case 1:
				res = moment().format('MM');
				break;

			case 2:
				res = moment().format('YYYY');
				break;

			case 3:
				res = moment().format('HH');
				break;

			case 4:
				res = moment().format('mm');
				break;

			case 5:
				res = moment().format('ss');
				break;
		}

		return parseInt(res);
	}

	// initialize
	this._constructor();
}
