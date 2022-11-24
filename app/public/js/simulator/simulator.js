const portTICK_RATE_MS = 1;

function Simulator() {
	var initialised = false;
	var svgDoc = null;
	var motor_run_flag = false;
	var output1_timer = null;
	var _this = this;
	var simulator_running = false;
	var sound = new Sound();
	var mcp7940n = new Mcp7940n();
	var kb_list = new KB_list();
	var kb_math = new KB_math();
	//var kb_task = new KB_task();
	var kb_mathplus = new KB_mathplus();
	var interpreter; 

	var runSim = 0;
	var initFunc = null;
	var closeInit = 0;
	var code_;

	var codeBlock;

	var bt_nummsg = 0;

	var nummsg = 0;
	var numstk = 0;
	var stkpackid = null;
	var linetoken = null;

	var ifttt_nummsg = 0;

	var ip_c;
	var initLED = true;
	var sceneGame = 0;
	var langugeGame = 0; //eng

	var LEDSTRING = null;
	// workers can not access objects => window, document, parent
	var ht16k33 = {
		worker: null,
		busy: false
	};
	
	this._constructor = function() {
		// on svg document loaded
		
		
		$('#svgDoc')[0].addEventListener('load', function() {
			svgDoc = $("#svgDoc")[0].contentDocument;

			// =================================================================
			// ht16k33 worker
			// =================================================================
			/*$("[id^=x]", svgDoc).css({
				fill: '#646464',
				stroke: '#404040'
			});*/
			
			$("[id^=x]", svgDoc).html('0'); //ningEdit
			if (typeof(Worker) !== 'undefined') {
				if (!ht16k33.worker) {
					ht16k33.worker = new Worker("/js/simulator/workers/ht16k33.js");
					// ht16k33 worker message
					ht16k33.worker.onmessage = function(e) {

						var msg = e.data;
						switch (msg.type) {
							case 'busy_changed':
								ht16k33.busy = msg.busy;

								break;

							case 'render':
								$("#x" + msg.x + "y" + msg.y, svgDoc).css({
									fill: msg.f,
									stroke: msg.s
								});
								
								break;
						}
						if(msg.f == '#646464'){
							$("#x" + msg.x + "y" + msg.y, svgDoc).html('0');
						}
						else{
							$("#x" + msg.x + "y" + msg.y, svgDoc).html('1');
						}

					};
						
				}
				// init ht16k33 worker
				ht16k33.worker.postMessage({
					type: 'init'
				});
			} else {
				
				
				//document.getElementById("result").innerHTML = "Sorry! No Web Worker support.";
			}
			
			////////////////////////////////////////////// Ning Edit

			setInterval(fromUnity,1);
			function fromUnity(){

				if ($("#TextClose", svgDoc).text() == '1'){
					$("#TextClose", svgDoc).html('0');
					$('.modal-simulator button.close').click();
				}

				if ($("#TextRun", svgDoc).text() == '0'){
					if(runSim != 0)
					{
						if (output1_timer) {
							clearTimeout(output1_timer);
							output1_timer = null;
						}
						//$("#TIRE_PATTERN_2", svgDoc).hide();
						//$("#TIRE_PATTERN_1", svgDoc).show();
						motor_run_flag = false;

						sound.off();
						simulator_running = false;
						runSim = 0;
					}
					//Output Clear
					for(var i = 0; i < 16; i++)
					{
						for(var j = 0; j < 8; j++)
						{
							$("#x" + i + "y" + j, svgDoc).html('0');
						}
					}
					$("#TextUSB", svgDoc).html('USB_Off');
					$("#TextOutput1", svgDoc).html('Output1_Off');
					$("#TextOutput2", svgDoc).html('Output2_Off');
				} 
				else 
				{
					if(runSim == 0)
					{
						//simulator_running = true;
						$('.modal-simulator button.run').click();
						sound.init();
						runSim = 1;
					}
				}
				if(sceneGame == 0){// Ning Edit
					$("#TextScene", svgDoc).html('SceneKV'); 
					$("#SceneExc", svgDoc).html('0'); 
				}
				else if(sceneGame == 1){
					$("#TextScene", svgDoc).html('SceneFKS'); 
				}
				else{
					$("#TextScene", svgDoc).html('SceneKV'); 
					$("#SceneExc", svgDoc).html('1'); 
				}

				if(langugeGame == 0){
					$("#TextLanguage", svgDoc).html('0'); 
				}
				else
				{
					$("#TextLanguage", svgDoc).html('1'); 
				}
				/*if(exitKV == true)
				{
					if($("#TextClose", svgDoc).text() == '0')
					{
						//filesystem.writeFile("msg_time.txt", $("#TextSaveTime", svgDoc).text(), (err) => {
                			//if (err) throw err;
                			//console.log('The "data to append" was appended to file!');
            			//});
            			$("#TextExitKV", svgDoc).html('1');
					}
					else
					{
						simulator_running = false;
						$('.modal-simulator').modal('hide');

						exitKV = false;
					}
				}
				else
				{
					$("#TextClose", svgDoc).html('0');
					$("#TextExitKV", svgDoc).html('0');
				}*/
				$("#CodeBlock", svgDoc).html(codeBlock);
				$("#IP_Client", svgDoc).html(ip_c);
				//$("#IP_Client", svgDoc).html(ip.address());
				if ($("#TextExitFKS", svgDoc).text() == '1') {

					$("#TextExitFKS", svgDoc).html('0');
					closeInit = 1;
					
					$('.modal-simulator button.close').click();
				}



				if(closeInit == 1){
					$("#TextExitFKS", svgDoc).html('0');
					closeInit = 0;
				}
				if(bt_nummsg > 0){
					if ($("#Text_nummsg_BT", svgDoc).text() == '0'){
						bt_nummsg = 0;
					}
				}
				
			}

			// =================================================================
			// Servo
			// =================================================================
			kb_servo.setAngle = function(out,val) {
				if(out == 26){
					$("#TextServoP1", svgDoc).html('1');
					$("#TextServoP2", svgDoc).html('0');

					if(val > 180){
						$("#TextServo", svgDoc).html(180);
					}else{
						$("#TextServo", svgDoc).html(val);
					}
				}
				else if(out == 27){
					$("#TextServoP1", svgDoc).html('0');
					$("#TextServoP2", svgDoc).html('1');

					if(val > 180){
						$("#TextServo", svgDoc).html(180);
					}else{
						$("#TextServo", svgDoc).html(val);
					}
				}
				else{
					$("#TextServoP1", svgDoc).html('0');
					$("#TextServoP2", svgDoc).html('0');
				}
				
			};
			kb_servo.calibrate = function(out,min,max) {


				//(0.5, 2.5) = (0, 180)
				/*if(out == 26){
					servoCal_O1 = ((max - min) - (2.5 - 0.5)) / (2 / 180);
				}
				else if(out == 27){
					servoCal_O2 = ((max - min) - (2.5 - 0.5)) / (2 / 180);
				}*/
			};

			// =================================================================
			// IOT
			// =================================================================
			kb_iot.gauge_Value1 = function(val) {
				$("#Text_iot_gaugevalue1", svgDoc).html(val);
			};
			kb_iot.gauge_Value2 = function(val) {
				$("#Text_iot_gaugevalue2", svgDoc).html(val);
			};
			kb_iot.gauge_title1 = function(val) {
				$("#Text_iot_gaugetitle1", svgDoc).html(val);
			};
			kb_iot.gauge_title2 = function(val) {
				$("#Text_iot_gaugetitle2", svgDoc).html(val);
			};
			kb_iot.gauge_unit1 = function(val) {
				$("#Text_iot_gaugeunit1", svgDoc).html(val);
			};
			kb_iot.gauge_unit2 = function(val) {
				$("#Text_iot_gaugeunit2", svgDoc).html(val);
			};
			kb_iot.gauge_color1 = function(val) {
				$("#Text_iot_gaugecolor1", svgDoc).html(val);
			};
			kb_iot.gauge_color2 = function(val) {
				$("#Text_iot_gaugecolor2", svgDoc).html(val);
			};
			kb_iot.gauge_max1 = function(max) {
				$("#Text_iot_gaugemax1", svgDoc).html(max);	
			};
			kb_iot.gauge_max2 = function(max) {
				$("#Text_iot_gaugemax2", svgDoc).html(max);	
			};
			kb_iot.feed_Value1 = function(val) {
				$("#Text_iot_feedvalue1", svgDoc).html(val);
			};
			kb_iot.feed_Value2 = function(val) {
				$("#Text_iot_feedvalue2", svgDoc).html(val);
			};
			kb_iot.feed_title = function(val) {
				$("#Text_iot_feedtitle", svgDoc).html(val);
			};
			kb_iot.feed_color1 = function(val) {
				$("#Text_iot_feedcolor1", svgDoc).html(val);
			};
			kb_iot.feed_color2 = function(val) {
				$("#Text_iot_feedcolor2", svgDoc).html(val);
			};

			//$("#Text_iot_gaugecolor1", svgDoc).html('ff0000');
			//$("#Text_iot_gaugevalue1", svgDoc).html(50);
			//$("#Text_iot_gaugevalue2", svgDoc).html(0);

			//$("#Text_iot_gaugemax1", svgDoc).html(100);
			//$("#Text_iot_gaugemax2", svgDoc).html(100);
			//$("#Text_iot_gaugetitle1", svgDoc).html("Brightness");
			//$("#Text_iot_gaugetitle2", svgDoc).html("Brightness");
			// =================================================================
			// Motorv3
			// =================================================================
			kb_motorv3.motorMovement = function(mov, speed){
				$("#TextMV3Move", svgDoc).html(mov);
				$("#TextMV3Speed", svgDoc).html(speed);
			}
			// =================================================================
			// FKS
			// =================================================================
			kb_fks.motorMovement = function(mov, speed){
				$("#TextFKSMove", svgDoc).html(mov);
				$("#TextFKSSpeed", svgDoc).html(speed);
			}
			kb_fks.movejoy1 = function() {
				return ($("#Text_joy1", svgDoc).text());
			};
			kb_fks.movejoy2 = function() {
				return ($("#Text_joy2", svgDoc).text());
			};

			// =================================================================
			// Line
			// =================================================================
			kb_line.line_token = function(val) {
				$("#Text_line_token", svgDoc).html(val);
				if(val == "" || val == null){
				}else{
					linetoken = val;
				}
			};
			kb_line.line_msg = function(val) {
				$("#Text_line_msg", svgDoc).html(val);
				if(val == "" || val == null){
				}else{
					if(linetoken == "" || linetoken == null){
					}else{
						nummsg++;
					}
				}
				
				$("#Text_nummsg_line", svgDoc).html(nummsg);
			};
			kb_line.line_img_1 = function(val) {
				$("#Text_line_img_1", svgDoc).html(val);
			};
			kb_line.line_img_2 = function(val) {
				$("#Text_line_img_2", svgDoc).html(val);
			};
			kb_line.line_stk_pack = function(val) {
				$("#Text_line_stk_pack", svgDoc).html(val);
				stkpackid = val;
			};
			kb_line.line_stk_id = function(val) {
				$("#Text_line_stk_id", svgDoc).html(val);
				if ((stkpackid == 1) && val == "1" || val == "2" || val == "3" || val == "4" || val == "5" || val == "6" || val == "7" || val == "8" || val == "9" || val == "10" ||
                   	val == "11" || val == "12" || val == "13" || val == "14" || val == "15" || val == "16" || val == "17" || val == "21" || val == "100" || val == "101" ||
                   	val == "102" || val == "103" || val == "104" || val == "105" || val == "106" ||val == "107" || val == "108" || val == "109" || val == "110" || val == "111"){
					if(linetoken == "" || linetoken == null){
					}else{
						numstk++;
					}
				}

				$("#Text_numstk_line", svgDoc).html(numstk);
			};

			// =================================================================
			// Bluetooth
			// =================================================================
			kb_bluetooth.bluetooth_setup = function(val) {
				$("#Text_BT_name", svgDoc).html(val);
			};
			kb_bluetooth.bluetooth_send_data = function(val) {
				$("#Text_BT_msg", svgDoc).html(val);
				if(val == "" || val == null){
				}else{
					bt_nummsg++;
				}
				
				$("#Text_nummsg_BT", svgDoc).html(bt_nummsg);
			};

			// =================================================================
			// IFTTT 
			// =================================================================
			kb_ifttt.ift_key = function(val) {
				$("#Text_ift_key", svgDoc).html(val);
			};
			kb_ifttt.ift_name = function(val) {
				$("#Text_ift_name", svgDoc).html(val);
			};
			kb_ifttt.ift_val = function(val1, val2, val3) {
				$("#Text_ift_val1", svgDoc).html(val1);
				$("#Text_ift_val2", svgDoc).html(val2);
				$("#Text_ift_val3", svgDoc).html(val3);
				if((val1 == "" || val1 == null) && (val2 == "" || val2 == null) && (val3 == "" || val3 == null)){
				}else{
					ifttt_nummsg++;
				}
				$("#Text_nummsg_ift", svgDoc).html(ifttt_nummsg);
			};

			// =================================================================
			// ESP Now
			// =================================================================

			kb_espnow.esp_send = function(val){
				$("#Text_esp_send_val", svgDoc).html(val);
			}
			kb_espnow.esp_send2 = function(mac, val){
				$("#Text_esp_send2_mac", svgDoc).html(mac);
				$("#Text_esp_send2_val", svgDoc).html(val);
			}
			kb_espnow.read_mac = function() {
				return ($("#Text_esp_getmac", svgDoc).text());
			};
			kb_espnow.read_string = function() {
				return ($("#Text_esp_readstring", svgDoc).text());
			};
			kb_espnow.read_num = function() {
				return ($("#Text_esp_readnum", svgDoc).text());
			};
			kb_espnow.recv = function() {
				if ($("#Text_esp_recv", svgDoc).text() == '0') {
					return 0;
				} else {
					return 1;
				}
			};
			// =================================================================
			// ldr
			// =================================================================
			ldr.get_cb = function() {
				//console.log($(".range#light")[0]); //.getCurrentStep() .getInfo()
				//return parseFloat($(".range#light")[0].vGet());
				return parseFloat($("#TextLightSensor", svgDoc).text()); //ningEdit
			};

			// =================================================================
			// lm73
			// =================================================================
			lm73_1.get_cb = function() {
				//return parseFloat($(".range#temperature")[0].vGet());
				return parseFloat($("#TextTempSensor", svgDoc).text()); //ningEdit
			};

			// =================================================================
			// ports
			// =================================================================
			// usbsw
			ports.usbsw_render_cb = function(val) {
				//val == 0 ? $("#USB_LAMP_OFF", svgDoc).show() : $("#USB_LAMP_OFF", svgDoc).hide();
				val == 0 ? $("#TextUSB", svgDoc).html('USB_Off') : $("#TextUSB", svgDoc).html('USB_On'); //ningEdit
			};
			// output1
			//$("#TIRE_PATTERN_2", svgDoc).hide();
			ports.output1_render_cb = function(val) {
				if (val == 0) {
					$("#TextOutput1", svgDoc).html('Output1_Off'); //ningEdit
				} else {
					$("#TextOutput1", svgDoc).html('Output1_On'); //ningEdit
				}
			};
			//$("#LED_ON", svgDoc).hide();
			ports.output2_render_cb = function(val) {
				if (val == 0) {
					$("#TextOutput2", svgDoc).html('Output2_Off'); //ningEdit
				} else {
					$("#TextOutput2", svgDoc).html('Output2_On'); //ningEdit
				}

			};
			// input1
			/*$("#SLIDE_DOOR_OPENED", svgDoc).hide();
			$("[id^=SLIDE_DOOR]", svgDoc).css('cursor', 'pointer');

			$("#SLIDE_DOOR_CLOSED", svgDoc).click(function(e) {
				$("#SLIDE_DOOR_CLOSED", svgDoc).hide();
				$("#SLIDE_DOOR_OPENED", svgDoc).show();
			});
			$("#SLIDE_DOOR_OPENED", svgDoc).click(function(e) {
				$("#SLIDE_DOOR_OPENED", svgDoc).hide();
				$("#SLIDE_DOOR_CLOSED", svgDoc).show();
			});*/
			ports.input1_read_cb = function() {
				if ($("#TextInput1", svgDoc).text() == '0') {
					return 0;
				} else {
					return 1;
				}
			};
			// input2
			ports.input2_read_cb = function() {
				if ($("#TextInput2", svgDoc).text() == '0') {
					return 0;
				} else {
					return 1;
				}
			};
			// input3
			ports.input3_read_cb = function() {
				/*if ($("#INPUT_3 > text > tspan", svgDoc).text() == '0') {
					return 0;
				} else {
					return 1;
				}*/
				if ($("#TextInput3", svgDoc).text() == '0') {
					return 0;
				} else {
					return 1;
				}
			};
			// input4
			ports.input4_read_cb = function() {
				/*if ($("#INPUT_4 > text > tspan", svgDoc).text() == '0') {
					return 0;
				} else {
					return 1;
				}*/
				if ($("#TextInput4", svgDoc).text() == '0') {
					return 0;
				} else {
					return 1;
				}
			};
			// =================================================================
			// Analog Input
			// =================================================================
			kb_specio.analog_input1_read_cb = function() {
				return ($("#TextAnalogInput1", svgDoc).text());
			};
			// input2
			kb_specio.analog_input2_read_cb = function() {
				return ($("#TextAnalogInput2", svgDoc).text());
			};
			// input3
			kb_specio.analog_input3_read_cb = function() {
				return ($("#TextAnalogInput3", svgDoc).text());
			};
			// input4
			kb_specio.analog_input4_read_cb = function() {
				return ($("#TextAnalogInput4", svgDoc).text());
			};	
			// =================================================================
			// button12
			// =================================================================
			button12.sw1_get_cb = function() {
				/*if ($("#SWITCH_1 > text > tspan", svgDoc).text() == '0') {
					return 0;
				} else {
					return 1;
				}*/

				//ningEdit
				if ($("#TextSwitch1", svgDoc).text() == '0') {
					return 0;
				} else {
					return 1;
				}
			};
			button12.sw2_get_cb = function() {
				/*if ($("#SWITCH_2 > text > tspan", svgDoc).text() == '0') {
					return 0;
				} else {
					return 1;
				}*/
				
				//ningEdit
				if ($("#TextSwitch2", svgDoc).text() == '0') {
					return 0;
				} else {
					return 1;
				}
			};

			// =================================================================
			// sound
			// =================================================================
			//sound.init();
			// =================================================================
			// sliders
			// =================================================================
			if (!initialised) {
				/*const temperature_values = [15, 60];
				const temperature_posfix = '℃';
				$(".range#temperature")
					.noUiSlider({
						start: 25,
						step: 0.25,
						range: {
							min: 10,
							max: 65
						}
					})
					.noUiSlider_pips({
						mode: 'values',
						density: 5,
						values: temperature_values,
						stepped: true,
						format: wNumb({
							decimals: 0,
							//prefix: '+',
							postfix: temperature_posfix
						})
					})
					.Link('lower').to('-inline-<div class="tooltip"></div>', function(value) {
						//$(this).html('<span>' + "+" + float2int(value) + "℃" + '</span>');
						$(this).html('<span>' + value + '&nbsp;' + temperature_posfix + '</span>');
					})
					.on('set', function(event, value) {
						if (value < temperature_values[0]) {
							$(this).val(temperature_values[0]);
						} else if (value > temperature_values[1]) {
							$(this).val(temperature_values[1]);
						}
					});
				$(".tail-bottom#temperature-tail-bottom").css('left', '60%');

				const light_values = [0, 100];
				const light_posfix = '%';
				$(".range#light")
					.noUiSlider({
						start: 50,
						step: 1,
						range: {
							min: 0,
							max: 100
						}
					})
					.noUiSlider_pips({
						mode: 'values',
						density: 5,
						values: light_values,
						stepped: true,
						format: wNumb({
							decimals: 0,
							//prefix: '+',
							postfix: light_posfix
						})
					})
					.Link('lower').to('-inline-<div class="tooltip"></div>', function(value) {
						//$(this).html('<span>' + "+" + float2int(value) + "℃" + '</span>');
						$(this).html('<span>' + parseInt(value) + '&nbsp;' + light_posfix + '</span>');
					})
					.on('set', function(event, value) {
						if (value < light_values[0]) {
							$(this).val(light_values[0]);
						} else if (value > light_values[1]) {
							$(this).val(light_values[1]);
						}
					});
				$(".tail-bottom#light-tail-bottom").css('left', '5%');
				// set tooltip visible
				$(".tooltip").css({
					'opacity': '1'
				});

				initialised = true;*/
			} else {
				//$(".range#temperature")[0].vSet(25);
				//$(".range#light")[0].vSet(50);
			}

			// =====================================================================
			// switches,inputs,outputs
			// =====================================================================
			/*$("#SWITCH_1", svgDoc).html('<title>Switch 1</title>');
			$("#SWITCH_2", svgDoc).html('<title>Switch 2</title>');
			$("#switch_reset", svgDoc).html('<title>Reset Switch</title>');*/
			// set cursor to pointer
			/*$("[id^=SWITCH_1],[id^=SWITCH_2],[id^=INPUT]", svgDoc).css('cursor', 'pointer');
			// disable text pointer-events
			$("[id^=SWITCH_2] > text,[id^=SWITCH_2] > text,[id^=INPUT] > text,[id^=OUTPUT] > text", svgDoc).css('pointer-events', 'none');
			// set switch hover in/out
			$("[id^=SWITCH_1],[id^=SWITCH_2],[id^=INPUT]", svgDoc).hover(function(e) {
				$(e.target).css({
					fill: '#f0f0f0'
				});
			}, function(e) {
				$(e.target).css({
					fill: '#151515'
				});
			});
			// set switch mouse down
			$("[id^=SWITCH_1],[id^=SWITCH_2]", svgDoc).mousedown(function(e) {
				var target = $(e.target).parent();
				var tspan = target.find('text > tspan');
				tspan.text('1');
			});
			// set switch mouse up
			$("[id^=SWITCH_1],[id^=SWITCH_2]", svgDoc).mouseup(function(e) {
				var target = $(e.target).parent();
				var tspan = target.find('text > tspan');
				tspan.text('0');
			});
			// set click
			$("[id^=INPUT]", svgDoc).click(function(e) {
				var target = $(e.target).parent();
				var tspan = target.find('text > tspan');
				if (tspan.text() == '0') {
					tspan.text('1');
				} else {
					tspan.text('0');
				}
			});*/
			

		});
	}
	/*this.sendIP = function(ip_client) { //// ning edit
		ip_c = ip_client;
	}*/

	//this.run = function(code_, scene) 
	this.run = function(code_str, scene, lang) {
		codeBlock = code_str;
		sceneGame = scene;
		langugeGame = lang;
		$('.modal-simulator').modal({
			show: true,
			keyboard: false,
			backdrop: 'static'
		});
		$('.modal-simulator button.close').click(function() {
			if (output1_timer) {
				clearTimeout(output1_timer);
				output1_timer = null;
			}
			//$("#TIRE_PATTERN_2", svgDoc).hide();
			//$("#TIRE_PATTERN_1", svgDoc).show();
			motor_run_flag = false;

			sound.off();
			simulator_running = false;
			$('.modal-simulator').modal('hide');
		});
		$('.modal-simulator').unbind('shown.bs.modal').on('shown.bs.modal', function() {
			var code_strlst = code_str.split('\n');
			var code = '';
			for (var i = 0; i < code_strlst.length; i++) {
				var line = code_strlst[i];
				if (line == '') {
					continue;
				}

				// remove c++ type casting
				line = line.replace(/\(uint8_t \*\)/g, '');
				line = line.replace(/\(double\)/g, '');
				line = line.replace(/\(char \*\)/g, '');
				line = line.replace(/\(int\)/g, '');
				// replace freertos tick
				line = line.replace(/portTICK_RATE_MS/g, portTICK_RATE_MS);

				// ht16k33.show javascript hex format
				if (line.indexOf('ht16k33.show') != -1) {
					var strlst = line.split('\\x');
					var inst = strlst[0];

					strlst[strlst.length - 1] = strlst[strlst.length - 1].replace(/\"\);/g, '');
					strlst.shift();
					var new_statement = '';
					for (var j in strlst) {
						if (strlst[j].length == 1) {
							new_statement += '\\x0' + strlst[j];
						} else {
							new_statement += '\\x' + strlst[j];
						}
					}

					line = inst + new_statement + '");';
				}

				code += line + '\n';
			}
			//console.log(code);
			code_ = code;
			//==================================================================
			// JS-Interpreter
			//==================================================================
			initFunc = function(interpreter, scope) {
				// =============================================================
				// freertos
				// =============================================================
				var vtaskdelay = function(val, callback) {
					setTimeout(function() {
						callback();
					}, val);
				};
				interpreter.setProperty(scope, 'vTaskDelay', interpreter.createAsyncFunction(vtaskdelay));

				// =============================================================
				// ht16k33
				// =============================================================
				HT16K33 = interpreter.createObject(interpreter.OBJECT);
				interpreter.setProperty(scope, 'ht16k33', HT16K33);

				function ht16k33_idle_get() {
					return !ht16k33.busy;
				}
				var ht16k33_idle = function() {
					return interpreter.createPrimitive(ht16k33_idle_get());
				};
				interpreter.setProperty(HT16K33, 'idle', interpreter.createNativeFunction(ht16k33_idle));

				var ht16k33_wait_idle = function(callback) {
					function wait_idle() {
						if (ht16k33.busy) {
							setTimeout(wait_idle, 50);
						} else {
							callback();
						}
					}
					wait_idle();
				};
				interpreter.setProperty(HT16K33, 'wait_idle', interpreter.createAsyncFunction(ht16k33_wait_idle));

				var ht16k33_show = function(buf) {
					return interpreter.createPrimitive(
						ht16k33.worker.postMessage({
							type: 'show',
							buf: buf
						})
					);
				};
				interpreter.setProperty(HT16K33, 'show', interpreter.createNativeFunction(ht16k33_show));

				var ht16k33_scroll = function(buf, scroll_flag) {
					return interpreter.createPrimitive(
						ht16k33.worker.postMessage({
							type: 'scroll',
							buf: buf,
							scroll_flag: scroll_flag
						})
					);
				};
				interpreter.setProperty(HT16K33, 'scroll', interpreter.createNativeFunction(ht16k33_scroll));
				// =============================================================
				// ldr
				// =============================================================
				LDR = interpreter.createObject(interpreter.OBJECT);
				interpreter.setProperty(scope, 'ldr', LDR);

				var ldr_get = function(buf) {
					return interpreter.createPrimitive(ldr.get());
				};
				interpreter.setProperty(LDR, 'get', interpreter.createNativeFunction(ldr_get));

				// =============================================================
				// lm73
				// =============================================================
				LM73_1 = interpreter.createObject(interpreter.OBJECT);
				interpreter.setProperty(scope, 'lm73_1', LM73_1);

				var lm73_1_get = function(buf) {
					return interpreter.createPrimitive(lm73_1.get());
				};
				interpreter.setProperty(LM73_1, 'get', interpreter.createNativeFunction(lm73_1_get));

				LM73_0 = interpreter.createObject(interpreter.OBJECT);
				interpreter.setProperty(scope, 'lm73_0', LM73_0);

				var lm73_0_get = function(buf) {
					return interpreter.createPrimitive(lm73_0.get());
				};
				interpreter.setProperty(LM73_0, 'get', interpreter.createNativeFunction(lm73_0_get));

				var lm73_0_error = function(buf) {
					return interpreter.createPrimitive(lm73_0.error());
				};
				interpreter.setProperty(LM73_0, 'error', interpreter.createNativeFunction(lm73_0_error));

				// =============================================================
				// ports
				// =============================================================
				PORTS = interpreter.createObject(interpreter.OBJECT);
				interpreter.setProperty(scope, 'ports', PORTS);

				var ports_usbsw_write = function(val) {
					return interpreter.createPrimitive(ports.usbsw_write(val));
				};
				interpreter.setProperty(PORTS, 'usbsw_write', interpreter.createNativeFunction(ports_usbsw_write));

				var ports_usbsw_toggle = function() {
					return interpreter.createPrimitive(ports.usbsw_toggle());
				};
				interpreter.setProperty(PORTS, 'usbsw_toggle', interpreter.createNativeFunction(ports_usbsw_toggle));

				var ports_usbsw_read = function() {
					return interpreter.createPrimitive(ports.usbsw_read());
				};
				interpreter.setProperty(PORTS, 'usbsw_read', interpreter.createNativeFunction(ports_usbsw_read));

				var ports_output1_write = function(val) {
					return interpreter.createPrimitive(ports.output1_write(val));
				};
				interpreter.setProperty(PORTS, 'output1_write', interpreter.createNativeFunction(ports_output1_write));

				var ports_output1_toggle = function() {
					return interpreter.createPrimitive(ports.output1_toggle());
				};
				interpreter.setProperty(PORTS, 'output1_toggle', interpreter.createNativeFunction(ports_output1_toggle));

				var ports_output1_read = function() {
					return interpreter.createPrimitive(ports.output1_read());
				};
				interpreter.setProperty(PORTS, 'output1_read', interpreter.createNativeFunction(ports_output1_read));

				var ports_output2_write = function(val) {
					return interpreter.createPrimitive(ports.output2_write(val));
				};
				interpreter.setProperty(PORTS, 'output2_write', interpreter.createNativeFunction(ports_output2_write));

				var ports_output2_toggle = function() {
					return interpreter.createPrimitive(ports.output2_toggle());
				};
				interpreter.setProperty(PORTS, 'output2_toggle', interpreter.createNativeFunction(ports_output2_toggle));

				var ports_output2_read = function() {
					return interpreter.createPrimitive(ports.output2_read());
				};
				interpreter.setProperty(PORTS, 'output2_read', interpreter.createNativeFunction(ports_output2_read));

				var ports_input1_read = function() {
					return interpreter.createPrimitive(ports.input1_read());
				};
				interpreter.setProperty(PORTS, 'input1_read', interpreter.createNativeFunction(ports_input1_read));

				var ports_input2_read = function() {
					return interpreter.createPrimitive(ports.input2_read());
				};
				interpreter.setProperty(PORTS, 'input2_read', interpreter.createNativeFunction(ports_input2_read));

				var ports_input3_read = function() {
					return interpreter.createPrimitive(ports.input3_read());
				};
				interpreter.setProperty(PORTS, 'input3_read', interpreter.createNativeFunction(ports_input3_read));

				var ports_input4_read = function() {
					return interpreter.createPrimitive(ports.input4_read());
				};
				interpreter.setProperty(PORTS, 'input4_read', interpreter.createNativeFunction(ports_input4_read));

				// =============================================================
				// ports Analog
				// =============================================================
				KB_SPECIO = interpreter.createObject(interpreter.OBJECT);
				interpreter.setProperty(scope, 'kb_specio', KB_SPECIO);

				var portsA_input1_read = function() {
					return interpreter.createPrimitive(kb_specio.inputI1_read());
				};
				interpreter.setProperty(KB_SPECIO, 'input1_read', interpreter.createNativeFunction(portsA_input1_read));

				var portsA_input2_read = function() {
					return interpreter.createPrimitive(kb_specio.inputI2_read());
				};
				interpreter.setProperty(KB_SPECIO, 'input2_read', interpreter.createNativeFunction(portsA_input2_read));

				var portsA_input3_read = function() {
					return interpreter.createPrimitive(kb_specio.inputI3_read());
				};
				interpreter.setProperty(KB_SPECIO, 'input3_read', interpreter.createNativeFunction(portsA_input3_read));

				var portsA_input4_read = function() {
					return interpreter.createPrimitive(kb_specio.inputI4_read());
				};
				interpreter.setProperty(KB_SPECIO, 'input4_read', interpreter.createNativeFunction(portsA_input4_read));

				// =============================================================
				// kb_list
				// =============================================================
				KB_LIST = interpreter.createObject(interpreter.OBJECT);
				interpreter.setProperty(scope, 'kb_list', KB_LIST);

				var kb_list_create_with = function(_length, _code) {
					return interpreter.createPrimitive(kb_list.set_multi(_length, _code));
				};
				interpreter.setProperty(KB_LIST, 'set_multi', interpreter.createNativeFunction(kb_list_create_with));

				var kb_list_get_length = function() {
					return interpreter.createPrimitive(kb_list.get_length());
				};
				interpreter.setProperty(KB_LIST, 'get_length', interpreter.createNativeFunction(kb_list_get_length));

				var kb_list_get_index = function(val) {
					return interpreter.createPrimitive(kb_list.get_index(val));
				};
				interpreter.setProperty(KB_LIST, 'get_index', interpreter.createNativeFunction(kb_list_get_index));

				var kb_list_set_index = function(val, index) {
					return interpreter.createPrimitive(kb_list.set_index(val, index));
				};
				interpreter.setProperty(KB_LIST, 'set_index', interpreter.createNativeFunction(kb_list_set_index));

				var kb_list_insert_first_value = function(val) {
					return interpreter.createPrimitive(kb_list.insert_first_value(val));
				};
				interpreter.setProperty(KB_LIST, 'insert_first_value', interpreter.createNativeFunction(kb_list_insert_first_value));

				var kb_list_insert_last_value = function(val) {
					return interpreter.createPrimitive(kb_list.insert_last_value(val));
				};
				interpreter.setProperty(KB_LIST, 'insert_last_value', interpreter.createNativeFunction(kb_list_insert_last_value));

				var kb_list_insert_value_index = function(val, index) {
					return interpreter.createPrimitive(kb_list.insert_value_index(val, index));
				};
				interpreter.setProperty(KB_LIST, 'insert_value_index', interpreter.createNativeFunction(kb_list_insert_value_index));

				var kb_list_get_list_text = function(from, to) {
					return interpreter.createPrimitive(kb_list.get_list_text(from, to));
				};
				interpreter.setProperty(KB_LIST, 'get_list_text', interpreter.createNativeFunction(kb_list_get_list_text));

				// =============================================================
				// kb_math
				// =============================================================
				KB_MATH = interpreter.createObject(interpreter.OBJECT);
				interpreter.setProperty(scope, 'kb_math', KB_MATH);

				var kb_math_log10 = function(val) {
					return interpreter.createPrimitive(kb_math._log10(val));
				};
				interpreter.setProperty(KB_MATH, '_log10', interpreter.createNativeFunction(kb_math_log10));

				// =============================================================
				// kb_mathplus
				// =============================================================
				KB_MATHPLUS = interpreter.createObject(interpreter.OBJECT);
				interpreter.setProperty(scope, 'kb_mathplus', KB_MATHPLUS);

				var kb_mathplus_acos = function(val) {
					return interpreter.createPrimitive(kb_mathplus.p_acos(val));
				};
				interpreter.setProperty(KB_MATHPLUS, 'p_acos', interpreter.createNativeFunction(kb_mathplus_acos));

				var kb_mathplus_asin = function(val) {
					return interpreter.createPrimitive(kb_mathplus.p_asin(val));
				};
				interpreter.setProperty(KB_MATHPLUS, 'p_asin', interpreter.createNativeFunction(kb_mathplus_asin));

				var kb_mathplus_atan = function(val) {
					return interpreter.createPrimitive(kb_mathplus.p_atan(val));
				};
				interpreter.setProperty(KB_MATHPLUS, 'p_atan', interpreter.createNativeFunction(kb_mathplus_atan));

				var kb_mathplus_atan2 = function(a,b) {
					return interpreter.createPrimitive(kb_mathplus.p_atan2(a,b));
				};
				interpreter.setProperty(KB_MATHPLUS, 'p_atan2', interpreter.createNativeFunction(kb_mathplus_atan2));

				var kb_mathplus_cos = function(val) {
					return interpreter.createPrimitive(kb_mathplus.p_cos(val));
				};
				interpreter.setProperty(KB_MATHPLUS, 'p_cos', interpreter.createNativeFunction(kb_mathplus_cos));

				var kb_mathplus_cosh = function(val) {
					return interpreter.createPrimitive(kb_mathplus.p_cosh(val));
				};
				interpreter.setProperty(KB_MATHPLUS, 'p_cosh', interpreter.createNativeFunction(kb_mathplus_cosh));

				var kb_mathplus_sin = function(val) {
					return interpreter.createPrimitive(kb_mathplus.p_sin(val));
				};
				interpreter.setProperty(KB_MATHPLUS, 'p_sin', interpreter.createNativeFunction(kb_mathplus_sin));

				var kb_mathplus_sinh = function(val) {
					return interpreter.createPrimitive(kb_mathplus.p_sinh(val));
				};
				interpreter.setProperty(KB_MATHPLUS, 'p_sinh', interpreter.createNativeFunction(kb_mathplus_sinh));

				var kb_mathplus_tan = function(val) {
					return interpreter.createPrimitive(kb_mathplus.p_tan(val));
				};
				interpreter.setProperty(KB_MATHPLUS, 'p_tan', interpreter.createNativeFunction(kb_mathplus_tan));

				var kb_mathplus_tanh = function(val) {
					return interpreter.createPrimitive(kb_mathplus.p_tanh(val));
				};
				interpreter.setProperty(KB_MATHPLUS, 'p_tanh', interpreter.createNativeFunction(kb_mathplus_tanh));

				var kb_mathplus_exp = function(val) {
					return interpreter.createPrimitive(kb_mathplus.p_exp(val));
				};
				interpreter.setProperty(KB_MATHPLUS, 'p_exp', interpreter.createNativeFunction(kb_mathplus_exp));

				var kb_mathplus_ldexp = function(a,b) {
					return interpreter.createPrimitive(kb_mathplus.p_ldexp(a,b));
				};
				interpreter.setProperty(KB_MATHPLUS, 'p_ldexp', interpreter.createNativeFunction(kb_mathplus_ldexp));

				var kb_mathplus_log = function(val) {
					return interpreter.createPrimitive(kb_mathplus.p_log(val));
				};
				interpreter.setProperty(KB_MATHPLUS, 'p_log', interpreter.createNativeFunction(kb_mathplus_log));

				var kb_mathplus_log10 = function(val) {
					return interpreter.createPrimitive(kb_mathplus.p_log10(val));
				};
				interpreter.setProperty(KB_MATHPLUS, 'p_log10', interpreter.createNativeFunction(kb_mathplus_log10));

				var kb_mathplus_pow = function(a,b) {
					return interpreter.createPrimitive(kb_mathplus.p_pow(a,b));
				};
				interpreter.setProperty(KB_MATHPLUS, 'p_pow', interpreter.createNativeFunction(kb_mathplus_pow));

				var kb_mathplus_sqrt = function(val) {
					return interpreter.createPrimitive(kb_mathplus.p_sqrt(val));
				};
				interpreter.setProperty(KB_MATHPLUS, 'p_sqrt', interpreter.createNativeFunction(kb_mathplus_sqrt));

				var kb_mathplus_ceil = function(val) {
					return interpreter.createPrimitive(kb_mathplus.p_ceil(val));
				};
				interpreter.setProperty(KB_MATHPLUS, 'p_ceil', interpreter.createNativeFunction(kb_mathplus_ceil));

				var kb_mathplus_fabs = function(val) {
					return interpreter.createPrimitive(kb_mathplus.p_fabs(val));
				};
				interpreter.setProperty(KB_MATHPLUS, 'p_fabs', interpreter.createNativeFunction(kb_mathplus_fabs));

				var kb_mathplus_floor = function(val) {
					return interpreter.createPrimitive(kb_mathplus.p_floor(val));
				};
				interpreter.setProperty(KB_MATHPLUS, 'p_floor', interpreter.createNativeFunction(kb_mathplus_floor));

				var kb_mathplus_fmod = function(a,b) {
					return interpreter.createPrimitive(kb_mathplus.p_fmod(a,b));
				};
				interpreter.setProperty(KB_MATHPLUS, 'p_fmod', interpreter.createNativeFunction(kb_mathplus_fmod));

				// =============================================================
				// kb_servo
				// =============================================================
				KB_SERVO = interpreter.createObject(interpreter.OBJECT);
				interpreter.setProperty(scope, 'kb_servo', KB_SERVO);

				var kb_servo_setAngle = function(out,val) {
					return interpreter.createPrimitive(kb_servo.setAngle(out,val));
				};
				interpreter.setProperty(KB_SERVO, 'setAngle', interpreter.createNativeFunction(kb_servo_setAngle));

				var kb_servo_calibrate = function(out,min,max) {
					return interpreter.createPrimitive(kb_servo.calibrate(out,min,max));
				};
				interpreter.setProperty(KB_SERVO, 'calibrate', interpreter.createNativeFunction(kb_servo_calibrate));

				// =============================================================
				// kb_iot
				// =============================================================
				KB_IOT = interpreter.createObject(interpreter.OBJECT);
				interpreter.setProperty(scope, 'kb_iot', KB_IOT);

				var kb_iot_gauge_Value1 = function(val) {
					return interpreter.createPrimitive(kb_iot.gauge_Value1(val));
				};
				interpreter.setProperty(KB_IOT, 'gauge_Value1', interpreter.createNativeFunction(kb_iot_gauge_Value1));

				var kb_iot_gauge_Value2 = function(val) {
					return interpreter.createPrimitive(kb_iot.gauge_Value2(val));
				};
				interpreter.setProperty(KB_IOT, 'gauge_Value2', interpreter.createNativeFunction(kb_iot_gauge_Value2));

				var kb_iot_gauge_title1 = function(val) {
					return interpreter.createPrimitive(kb_iot.gauge_title1(val));
				};
				interpreter.setProperty(KB_IOT, 'gauge_title1', interpreter.createNativeFunction(kb_iot_gauge_title1));

				var kb_iot_gauge_title2 = function(val) {
					return interpreter.createPrimitive(kb_iot.gauge_title2(val));
				};
				interpreter.setProperty(KB_IOT, 'gauge_title2', interpreter.createNativeFunction(kb_iot_gauge_title2));

				var kb_iot_gauge_unit1 = function(val) {
					return interpreter.createPrimitive(kb_iot.gauge_unit1(val));
				};
				interpreter.setProperty(KB_IOT, 'gauge_unit1', interpreter.createNativeFunction(kb_iot_gauge_unit1));

				var kb_iot_gauge_unit2 = function(val) {
					return interpreter.createPrimitive(kb_iot.gauge_unit2(val));
				};
				interpreter.setProperty(KB_IOT, 'gauge_unit2', interpreter.createNativeFunction(kb_iot_gauge_unit2));

				var kb_iot_gauge_color1 = function(val) {
					return interpreter.createPrimitive(kb_iot.gauge_color1(val));
				};
				interpreter.setProperty(KB_IOT, 'gauge_color1', interpreter.createNativeFunction(kb_iot_gauge_color1));

				var kb_iot_gauge_color2 = function(val) {
					return interpreter.createPrimitive(kb_iot.gauge_color2(val));
				};
				interpreter.setProperty(KB_IOT, 'gauge_color2', interpreter.createNativeFunction(kb_iot_gauge_color2));

				var kb_iot_gauge_max1 = function(max) {
					return interpreter.createPrimitive(kb_iot.gauge_max1(max));
				};
				interpreter.setProperty(KB_IOT, 'gauge_max1', interpreter.createNativeFunction(kb_iot_gauge_max1));

				var kb_iot_gauge_max2 = function(max) {
					return interpreter.createPrimitive(kb_iot.gauge_max2(max));
				};
				interpreter.setProperty(KB_IOT, 'gauge_max2', interpreter.createNativeFunction(kb_iot_gauge_max2));

				var kb_iot_feed_Value1 = function(val) {
					return interpreter.createPrimitive(kb_iot.feed_Value1(val));
				};
				interpreter.setProperty(KB_IOT, 'feed_Value1', interpreter.createNativeFunction(kb_iot_feed_Value1));

				var kb_iot_feed_Value2 = function(val) {
					return interpreter.createPrimitive(kb_iot.feed_Value2(val));
				};
				interpreter.setProperty(KB_IOT, 'feed_Value2', interpreter.createNativeFunction(kb_iot_feed_Value2));

				var kb_iot_feed_title = function(val) {
					return interpreter.createPrimitive(kb_iot.feed_title(val));
				};
				interpreter.setProperty(KB_IOT, 'feed_title', interpreter.createNativeFunction(kb_iot_feed_title));

				var kb_iot_feed_color1 = function(val) {
					return interpreter.createPrimitive(kb_iot.feed_color1(val));
				};
				interpreter.setProperty(KB_IOT, 'feed_color1', interpreter.createNativeFunction(kb_iot_feed_color1));

				var kb_iot_feed_color2 = function(val) {
					return interpreter.createPrimitive(kb_iot.feed_color2(val));
				};
				interpreter.setProperty(KB_IOT, 'feed_color2', interpreter.createNativeFunction(kb_iot_feed_color2));

				// =============================================================
				// kb_MotorV3
				// =============================================================
				KB_MOTORV3 = interpreter.createObject(interpreter.OBJECT);
				interpreter.setProperty(scope, 'kb_motorv3', KB_MOTORV3);

				var kb_motorv3_motorMovement = function(mov,spd) {
					return interpreter.createPrimitive(kb_motorv3.motorMovement(mov,spd));
				};
				interpreter.setProperty(KB_MOTORV3, 'motorMovement', interpreter.createNativeFunction(kb_motorv3_motorMovement));

				// =============================================================
				// kb_FKS
				// =============================================================
				KB_FKS = interpreter.createObject(interpreter.OBJECT);
				interpreter.setProperty(scope, 'kb_fks', KB_FKS);

				var kb_fks_motorMovement = function(mov,spd) {
					return interpreter.createPrimitive(kb_fks.motorMovement(mov,spd));
				};
				interpreter.setProperty(KB_FKS, 'motorMovement', interpreter.createNativeFunction(kb_fks_motorMovement));

				var kb_fks_joystick_1 = function() {
					return interpreter.createPrimitive(kb_fks.joystick_1());
				};
				interpreter.setProperty(KB_FKS, 'joystick_1', interpreter.createNativeFunction(kb_fks_joystick_1));

				var kb_fks_joystick_2 = function() {
					return interpreter.createPrimitive(kb_fks.joystick_2());
				};
				interpreter.setProperty(KB_FKS, 'joystick_2', interpreter.createNativeFunction(kb_fks_joystick_2));

				// =============================================================
				// kb_line
				// =============================================================
				KB_LINE = interpreter.createObject(interpreter.OBJECT);
				interpreter.setProperty(scope, 'kb_line', KB_LINE);

				var kb_line_token = function(val) {
					return interpreter.createPrimitive(kb_line.line_token(val));
				};
				interpreter.setProperty(KB_LINE, 'line_token', interpreter.createNativeFunction(kb_line_token));

				var kb_line_msg = function(val) {
					return interpreter.createPrimitive(kb_line.line_msg(val));
				};
				interpreter.setProperty(KB_LINE, 'line_msg', interpreter.createNativeFunction(kb_line_msg));

				var kb_line_img_1 = function(val) {
					return interpreter.createPrimitive(kb_line.line_img_1(val));
				};
				interpreter.setProperty(KB_LINE, 'line_img_1', interpreter.createNativeFunction(kb_line_img_1));

				var kb_line_img_2 = function(val) {
					return interpreter.createPrimitive(kb_line.line_img_2(val));
				};
				interpreter.setProperty(KB_LINE, 'line_img_2', interpreter.createNativeFunction(kb_line_img_2));

				var kb_line_stk_pack = function(val) {
					return interpreter.createPrimitive(kb_line.line_stk_pack(val));
				};
				interpreter.setProperty(KB_LINE, 'line_stk_pack', interpreter.createNativeFunction(kb_line_stk_pack));

				var kb_line_stk_id = function(val) {
					return interpreter.createPrimitive(kb_line.line_stk_id(val));
				};
				interpreter.setProperty(KB_LINE, 'line_stk_id', interpreter.createNativeFunction(kb_line_stk_id));

				// =============================================================
				// kb_Bluetooth
				// =============================================================
				KB_BLUETOOTH = interpreter.createObject(interpreter.OBJECT);
				interpreter.setProperty(scope, 'kb_bluetooth', KB_BLUETOOTH);

				var kb_bt_name = function(val) {
					return interpreter.createPrimitive(kb_bluetooth.bluetooth_setup(val));
				};
				interpreter.setProperty(KB_BLUETOOTH, 'bluetooth_setup', interpreter.createNativeFunction(kb_bt_name));

				var kb_bt_msg = function(val) {
					return interpreter.createPrimitive(kb_bluetooth.bluetooth_send_data(val));
				};
				interpreter.setProperty(KB_BLUETOOTH, 'bluetooth_send_data', interpreter.createNativeFunction(kb_bt_msg));
				
				// =============================================================
				// kb_ifttt
				// =============================================================
				KB_IFTTT = interpreter.createObject(interpreter.OBJECT);
				interpreter.setProperty(scope, 'kb_ifttt', KB_IFTTT);

				var kb_ifttt_key = function(val) {
					return interpreter.createPrimitive(kb_ifttt.ift_key(val));
				};
				interpreter.setProperty(KB_IFTTT, 'ift_key', interpreter.createNativeFunction(kb_ifttt_key));

				var kb_ifttt_name = function(val) {
					return interpreter.createPrimitive(kb_ifttt.ift_name(val));
				};
				interpreter.setProperty(KB_IFTTT, 'ift_name', interpreter.createNativeFunction(kb_ifttt_name));

				var kb_ifttt_val = function(val1, val2, val3) {
					return interpreter.createPrimitive(kb_ifttt.ift_val(val1, val2, val3));
				};
				interpreter.setProperty(KB_IFTTT, 'ift_val', interpreter.createNativeFunction(kb_ifttt_val));

				// =============================================================
				// kb_ESP-Now
				// =============================================================
				KB_ESPNOW = interpreter.createObject(interpreter.OBJECT);
				interpreter.setProperty(scope, 'kb_espnow', KB_ESPNOW);

				var kb_espnow_esp_getmac = function() {
					return interpreter.createPrimitive(kb_espnow.esp_getmac());
				};
				interpreter.setProperty(KB_ESPNOW, 'esp_getmac', interpreter.createNativeFunction(kb_espnow_esp_getmac));

				var kb_espnow_esp_send = function(val) {
					return interpreter.createPrimitive(kb_espnow.esp_send(val));
				};
				interpreter.setProperty(KB_ESPNOW, 'esp_send', interpreter.createNativeFunction(kb_espnow_esp_send));

				var kb_espnow_esp_send2 = function(mac,val) {
					return interpreter.createPrimitive(kb_espnow.esp_send2(mac,val));
				};
				interpreter.setProperty(KB_ESPNOW, 'esp_send2', interpreter.createNativeFunction(kb_espnow_esp_send2));

				var kb_espnow_esp_read_string = function() {
					return interpreter.createPrimitive(kb_espnow.esp_read_string());
				};
				interpreter.setProperty(KB_ESPNOW, 'esp_read_string', interpreter.createNativeFunction(kb_espnow_esp_read_string));

				var kb_espnow_esp_read_number = function() {
					return interpreter.createPrimitive(kb_espnow.esp_read_number());
				};
				interpreter.setProperty(KB_ESPNOW, 'esp_read_number', interpreter.createNativeFunction(kb_espnow_esp_read_number));

				var kb_espnow_esp_recv = function() {
					return interpreter.createPrimitive(kb_espnow.esp_recv());
				};
				interpreter.setProperty(KB_ESPNOW, 'esp_recv', interpreter.createNativeFunction(kb_espnow_esp_recv));

				// =============================================================
				// kb_PM
				// =============================================================
				KB_PM = interpreter.createObject(interpreter.OBJECT);
				interpreter.setProperty(scope, 'kb_pm', KB_PM);

				var kb_pm_get_pm2_5 = function(val) {
					return interpreter.createPrimitive(kb_pm.setAngle(val));
				};
				interpreter.setProperty(KB_PM, 'get_pm2_5', interpreter.createNativeFunction(kb_pm_get_pm2_5));

				var kb_pm_get_pm10 = function(val) {
					return interpreter.createPrimitive(kb_pm.calibrate(val));
				};
				interpreter.setProperty(KB_PM, 'get_pm10', interpreter.createNativeFunction(kb_pm_get_pm10));

				// =============================================================
				// button12
				// =============================================================
				BUTTON12 = interpreter.createObject(interpreter.OBJECT);
				interpreter.setProperty(scope, 'button12', BUTTON12);

				var button12_sw1_get = function() {
					return interpreter.createPrimitive(button12.sw1_get());
				};
				interpreter.setProperty(BUTTON12, 'sw1_get', interpreter.createNativeFunction(button12_sw1_get));

				var button12_sw2_get = function() {
					return interpreter.createPrimitive(button12.sw2_get());
				};
				interpreter.setProperty(BUTTON12, 'sw2_get', interpreter.createNativeFunction(button12_sw2_get));

				var button12_sw2_get = function() {
					return interpreter.createPrimitive(button12.sw2_get());
				};
				interpreter.setProperty(BUTTON12, 'sw2_get', interpreter.createNativeFunction(button12_sw2_get));

				var button12_wait_sw1_pressed = function(callback) {
					function wait_sw1_pressed() {
						if (button12.sw1_get() == 0) {
							setTimeout(wait_sw1_pressed, 50);
						} else {
							callback();
						}
					}
					wait_sw1_pressed();
				};
				interpreter.setProperty(BUTTON12, 'wait_sw1_pressed', interpreter.createAsyncFunction(button12_wait_sw1_pressed));

				var button12_wait_sw1_released = function(callback) {
					function wait_sw1_released() {
						if (button12.sw1_get() == 0) {
							setTimeout(wait_sw1_released, 50);
						} else {
							callback();
						}
					}
					wait_sw1_released();
				};
				interpreter.setProperty(BUTTON12, 'wait_sw1_released', interpreter.createAsyncFunction(button12_wait_sw1_released));

				var button12_wait_sw2_pressed = function(callback) {
					function wait_sw2_pressed() {
						if (button12.sw2_get() == 0) {
							setTimeout(wait_sw2_pressed, 50);
						} else {
							callback();
						}
					}
					wait_sw2_pressed();
				};
				interpreter.setProperty(BUTTON12, 'wait_sw2_pressed', interpreter.createAsyncFunction(button12_wait_sw2_pressed));

				var button12_wait_sw2_released = function(callback) {
					function wait_sw2_released() {
						if (button12.sw2_get() == 0) {
							setTimeout(wait_sw2_released, 50);
						} else {
							callback();
						}
					}
					wait_sw2_released();
				};
				interpreter.setProperty(BUTTON12, 'wait_sw2_released', interpreter.createAsyncFunction(button12_wait_sw2_released));

				var button12_is_sw1_pressed = function() {
					return interpreter.createPrimitive(button12.is_sw1_pressed());
				};
				interpreter.setProperty(BUTTON12, 'is_sw1_pressed', interpreter.createNativeFunction(button12_is_sw1_pressed));

				var button12_is_sw1_released = function() {
					return interpreter.createPrimitive(button12.is_sw1_released());
				};
				interpreter.setProperty(BUTTON12, 'is_sw1_released', interpreter.createNativeFunction(button12_is_sw1_released));

				var button12_is_sw2_pressed = function() {
					return interpreter.createPrimitive(button12.is_sw2_pressed());
				};
				interpreter.setProperty(BUTTON12, 'is_sw2_pressed', interpreter.createNativeFunction(button12_is_sw2_pressed));

				var button12_is_sw2_released = function() {
					return interpreter.createPrimitive(button12.is_sw2_released());
				};
				interpreter.setProperty(BUTTON12, 'is_sw2_released', interpreter.createNativeFunction(button12_is_sw2_released));

				var button12_key_pressed = function() {
					return interpreter.createPrimitive(button12.key_pressed());
				};
				interpreter.setProperty(BUTTON12, 'key_pressed', interpreter.createNativeFunction(button12_key_pressed));

				var button12_key_released = function() {
					return interpreter.createPrimitive(button12.key_released());
				};
				interpreter.setProperty(BUTTON12, 'key_released', interpreter.createNativeFunction(button12_key_released));

				// =============================================================
				// kbiot
				// =============================================================
				var kbiot_get_B1state = function() {
					return interpreter.createPrimitive(get_B1state());
				};
				interpreter.setProperty(scope, 'get_B1state', interpreter.createNativeFunction(kbiot_get_B1state));

				var kbiot_get_B2state = function() {
					return interpreter.createPrimitive(get_B2state());
				};
				interpreter.setProperty(scope, 'get_B2state', interpreter.createNativeFunction(kbiot_get_B2state));

				var kbiot_get_B1stateClicked = function() {
					return interpreter.createPrimitive(get_B1stateClicked());
				};
				interpreter.setProperty(scope, 'get_B1stateClicked', interpreter.createNativeFunction(kbiot_get_B1stateClicked));

				var kbiot_get_B2stateClicked = function() {
					return interpreter.createPrimitive(get_B2stateClicked());
				};
				interpreter.setProperty(scope, 'get_B2stateClicked', interpreter.createNativeFunction(kbiot_get_B2stateClicked));

				var kbiot_set_B1release = function() {
					return interpreter.createPrimitive(set_B1release());
				};
				interpreter.setProperty(scope, 'set_B1release', interpreter.createNativeFunction(kbiot_set_B1release));

				var kbiot_set_B2release = function() {
					return interpreter.createPrimitive(set_B2release());
				};
				interpreter.setProperty(scope, 'set_B2release', interpreter.createNativeFunction(kbiot_set_B2release));

				// =============================================================
				// sound
				// =============================================================
				SOUND = interpreter.createObject(interpreter.OBJECT);
				interpreter.setProperty(scope, 'sound', SOUND);

				var sound_note = function(note) {
					return interpreter.createPrimitive(sound.note(note));
				};
				interpreter.setProperty(SOUND, 'note', interpreter.createNativeFunction(sound_note));

				var sound_rest = function(duration, callback) {
					var bpm = 120;
					var quarter_delay;
					var delay = 0;
					/*
					[120 bpm]
					whole = 2000 ms
					haft = 1000 ms
					quarter delay = 60*1000/120 = 500 ms
					eighth = 250 ms
					sixteenth = 125
					*/
					quarter_delay = (60 * 1000) / bpm;
					switch (duration) {
						case 0:
							delay = 4 * quarter_delay;
							break;

						case 1:
							delay = 2 * quarter_delay;
							break;

						case 2:
							delay = quarter_delay;
							break;

						case 3:
							delay = quarter_delay / 2;
							break;

						case 4:
							delay = quarter_delay / 4;
							break;

						default:
							delay = quarter_delay / 4;
							break;
					}

					if (delay > 0) {
						sound.oscillator.stop(sound.currentTime + (delay / 1000));
						sound.oscillator.onended = function(e) {
							callback();
						}
					} else {
						callback();
					}
				};
				interpreter.setProperty(SOUND, 'rest', interpreter.createAsyncFunction(sound_rest));

				var sound_off = function() {
					return interpreter.createPrimitive(sound.off());
				};
				interpreter.setProperty(SOUND, 'off', interpreter.createNativeFunction(sound_off));

				var sound_get_volume = function() {
					return interpreter.createPrimitive(sound.get_volume());
				};
				interpreter.setProperty(SOUND, 'get_volume', interpreter.createNativeFunction(sound_get_volume));

				var sound_set_volume = function(val) {
					return interpreter.createPrimitive(sound.set_volume(val));
				};
				interpreter.setProperty(SOUND, 'set_volume', interpreter.createNativeFunction(sound_set_volume));

				// =============================================================
				// mcp7940n
				// =============================================================
				MCP7940N = interpreter.createObject(interpreter.OBJECT);
				interpreter.setProperty(scope, 'mcp7940n', MCP7940N);

				var mcp7940n_get_datetime = function() {
					return interpreter.createPrimitive(mcp7940n.get_datetime());
				};
				interpreter.setProperty(MCP7940N, 'get_datetime', interpreter.createNativeFunction(mcp7940n_get_datetime));

				var mcp7940n_get_datetime_with_second = function() {
					return interpreter.createPrimitive(mcp7940n.get_datetime_with_second());
				};
				interpreter.setProperty(MCP7940N, 'get_datetime_with_second', interpreter.createNativeFunction(mcp7940n_get_datetime_with_second));

				var mcp7940n_get_date = function() {
					return interpreter.createPrimitive(mcp7940n.get_date());
				};
				interpreter.setProperty(MCP7940N, 'get_date', interpreter.createNativeFunction(mcp7940n_get_date));

				var mcp7940n_get_time = function() {
					return interpreter.createPrimitive(mcp7940n.get_time());
				};
				interpreter.setProperty(MCP7940N, 'get_time', interpreter.createNativeFunction(mcp7940n_get_time));

				var mcp7940n_get_time_with_second = function() {
					return interpreter.createPrimitive(mcp7940n.get_time_with_second());
				};
				interpreter.setProperty(MCP7940N, 'get_time_with_second', interpreter.createNativeFunction(mcp7940n_get_time_with_second));

				var mcp7940n_get = function(val) {
					return interpreter.createPrimitive(mcp7940n.get(val));
				};
				interpreter.setProperty(MCP7940N, 'get', interpreter.createNativeFunction(mcp7940n_get));
			}
			//var interpreter = new Interpreter(code, initFunc);
		});
		$('.modal-simulator button.run').click(function() {
			//var interpreter = new Interpreter(code_, initFunc);
			interpreter = new Interpreter(code_, initFunc);
			simulator_running = true;
			
			setTimeout(function () {
				function main_stepInterpreter() {
					try {
						//var ok = interpreter.step();
						if (simulator_running) {
							setTimeout(main_stepInterpreter, 0);
						}
					} finally {
						//if (!ok) {

						//}
					}
				}
				main_stepInterpreter();
			}, 1000); //from 1000
		});
	}
	// initialize
	this._constructor();
}
