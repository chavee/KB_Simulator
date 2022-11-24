
'use strict';

goog.require('Blockly.JavaScript');

Blockly.JavaScript['taskNumber'] = 0;

Blockly.JavaScript.resetTaskNumber = function(block) {
	Blockly.JavaScript['taskNumber'] = 0;
};

// =============================================================================
// basic
// =============================================================================
Blockly.JavaScript['basic_led16x8'] = function(block) {
	var buf = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00];
	for (var x = 0; x < 16; x++) {
		var byte = 0;
		for (var y = 0; y < 8; y++) {
			var val = block.getFieldValue('POS_X' + x + '_Y' + y);
			if (val == 'TRUE') {
				byte |= (0x01 << y);
			};
		}
		buf[x] = byte;
	}

	var str = '';
	for (var i = 0; i < 16; i++) {
		str += '\\x' + buf[i].toString(16);;
	}

	return 'ht16k33.show((uint8_t *)"' + str + '");\n';
};

Blockly.JavaScript['basic_led16x8_clr'] = function(block) {
	return 'ht16k33.show((uint8_t *)"\\x0\\x0\\x0\\x0\\x0\\x0\\x0\\x0\\x0\\x0\\x0\\x0\\x0\\x0\\x0\\x0");\n';
};

Blockly.JavaScript['basic_led16x8_2chars'] = function(block) {
	var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';

	return 'ht16k33.scroll(' + argument0 + ', false);\n';
};

Blockly.JavaScript['basic_led16x8_scroll'] = function(block) {
	var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';

	return 'ht16k33.scroll(' + argument0 + ', true);\n';
};

Blockly.JavaScript['basic_led16x8_scroll_when_ready'] = function(block) {
	var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
	return 'if (ht16k33.idle()) { ht16k33.scroll(' + argument0 + ', true); }\n';
};

Blockly.JavaScript['basic_delay'] = function(block) {
	return 'vTaskDelay(' + parseInt(1000 * parseFloat(block.getFieldValue('VALUE'))) + ' / portTICK_RATE_MS);\n';
};

Blockly.JavaScript['basic_forever'] = function(block) {
	return 'while(1) {\n' + Blockly.JavaScript.statementToCode(block, 'HANDLER') + '}\n';
};

Blockly.JavaScript['basic_string'] = function(block) {
	return [
		'(char *)"' + block.getFieldValue('VALUE') + '"',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};


// =============================================================================
// math
// =============================================================================
Blockly.JavaScript['math_number'] = function(block) {
	return [
		'(double)' + block.getFieldValue('VALUE'),
		Blockly.JavaScript.ORDER_ATOMIC
	];
};

Blockly.JavaScript['math_arithmetic'] = function(block) {
	// Basic arithmetic operators, and power.
	var OPERATORS = {
		ADD: [' + ', Blockly.JavaScript.ORDER_ADDITION],
		MINUS: [' - ', Blockly.JavaScript.ORDER_SUBTRACTION],
		MULTIPLY: [' * ', Blockly.JavaScript.ORDER_MULTIPLICATION],
		DIVIDE: [' / ', Blockly.JavaScript.ORDER_DIVISION],
//		POWER: [' ^ ', Blockly.JavaScript.ORDER_EXPONENTIATION],
		MODULO: [' % ', Blockly.JavaScript.ORDER_DIVISION]
	};
	var tuple = OPERATORS[block.getFieldValue('OP')];
	var operator = tuple[0];
	var order = tuple[1];
	var argument0 = Blockly.JavaScript.valueToCode(block, 'A', order) || '0';
	var argument1 = Blockly.JavaScript.valueToCode(block, 'B', order) || '0';
	var code;
	/*// Power in JavaScript requires a special case since it has no operator.
	if (!operator) {
		code = 'Math.pow(' + argument0 + ', ' + argument1 + ')';
		return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
	}*/
	// modulo allow only integer
	if (block.getFieldValue('OP') == 'MODULO') {
		argument0 = '(int)(' + argument0 + ')';
		argument1 = '(int)(' + argument1 + ')';
	}
	code = argument0 + operator + argument1;

	return [code, order];
};

Blockly.JavaScript['math_variables_set'] = function(block) {
	var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
	var varName = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);

	return varName + ' = ' + argument0 + ';\n';
};

Blockly.JavaScript['math_variables_get'] = function(block) {
	var code = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);

	return [
		code,
		Blockly.JavaScript.ORDER_ATOMIC
	];
};

// =============================================================================
// logic
// =============================================================================
Blockly.JavaScript['controls_if'] = function(block) {
	var n = 0;
	var argument = Blockly.JavaScript.valueToCode(block, 'IF' + n, Blockly.JavaScript.ORDER_NONE) || '0';
	var branch = Blockly.JavaScript.statementToCode(block, 'DO' + n);
	var code = 'if (' + argument + ') {\n' + branch + '}';

	for (n = 1; n <= block.elseifCount_; n++) {
		argument = Blockly.JavaScript.valueToCode(block, 'IF' + n, Blockly.JavaScript.ORDER_NONE) || '0';
		branch = Blockly.JavaScript.statementToCode(block, 'DO' + n);
		code += ' else if (' + argument + ') {\n' + branch + '}';
	}

	if (block.elseCount_) {
		branch = Blockly.JavaScript.statementToCode(block, 'ELSE');
		code += ' else {\n' + branch + '}';
	}

	return code + '\n';
};

Blockly.JavaScript['logic_compare'] = function(block) {
	// Comparison operator.
	var OPERATORS = {
		'EQ': '==',
		'NEQ': '!=',
		'LT': '<',
		'LTE': '<=',
		'GT': '>',
		'GTE': '>='
	};

	var operator = OPERATORS[block.getFieldValue('OP')];
	var order = (operator == '==' || operator == '!=') ?
		Blockly.JavaScript.ORDER_EQUALITY : Blockly.JavaScript.ORDER_RELATIONAL;
	var argument0 = Blockly.JavaScript.valueToCode(block, 'A', order) || '0';
	var argument1 = Blockly.JavaScript.valueToCode(block, 'B', order) || '0';

	var code = '';
	// check string compare
	if (block.childBlocks_[0].outputConnection.check_[0] == 'String') {
		code = 'strcmp(' + argument0 + ', ' + argument1 + ') ' + OPERATORS[block.getFieldValue('OP')] + ' 0';
	}
	else {
		// default is numeric
		code = argument0 + ' ' + operator + ' ' + argument1;
	}

	return [code, order];
};

Blockly.JavaScript['logic_operation'] = function(block) {
	// Operations 'and', 'or'.
	var operator = (block.getFieldValue('OP') == 'AND') ? '&&' : '||';
	var order = (operator == '&&') ? Blockly.JavaScript.ORDER_LOGICAL_AND :	Blockly.JavaScript.ORDER_LOGICAL_OR;
	var argument0 = Blockly.JavaScript.valueToCode(block, 'A', order);
	var argument1 = Blockly.JavaScript.valueToCode(block, 'B', order);

	if (!argument0 && !argument1) {
		// If there are no arguments, then the return value is false.
		argument0 = 'false';
		argument1 = 'false';
	} else {
		// Single missing arguments have no effect on the return value.
		var defaultArgument = (operator == '&&') ? 'true' : 'false';
		if (!argument0) {
			argument0 = defaultArgument;
		}
		if (!argument1) {
			argument1 = defaultArgument;
		}
	}
	var code = '(' + argument0 + ') ' + operator + ' (' + argument1 + ')';

	return [code, order];
};

Blockly.JavaScript['logic_negate'] = function(block) {
	// Negation.
	var order = Blockly.JavaScript.ORDER_LOGICAL_NOT;
	var argument0 = Blockly.JavaScript.valueToCode(block, 'BOOL', order) || 'true';
	var code = '!' + argument0;

	return [code, order];
};

Blockly.JavaScript['logic_boolean'] = function(block) {
	// Boolean values true and false.
	var code = (block.getFieldValue('BOOL') == 'TRUE') ? 'true' : 'false';

	return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['logic_led16x8_scroll_ready'] = function(block) {
	return ['ht16k33.idle()', Blockly.JavaScript.ORDER_ATOMIC];
}

Blockly.JavaScript['logic_sw1_pressed'] = function(block) {
	return ['get_B1stateClicked() || button12.is_sw1_pressed()', Blockly.JavaScript.ORDER_ATOMIC];
}

Blockly.JavaScript['logic_sw1_released'] = function(block) {
	return ['(get_B1state() == 0 ) || button12.is_sw1_released()', Blockly.JavaScript.ORDER_ATOMIC];
}

Blockly.JavaScript['logic_sw2_pressed'] = function(block) {
	return ['get_B2stateClicked() || button12.is_sw2_pressed()', Blockly.JavaScript.ORDER_ATOMIC];
}

Blockly.JavaScript['logic_sw2_released'] = function(block) {
	return ['(get_B2state() == 0 ) || button12.is_sw2_released()', Blockly.JavaScript.ORDER_ATOMIC];
}

// =============================================================================
// loop
// =============================================================================
Blockly.JavaScript['controls_whileUntil'] = function(block) {
	// Do while/until loop.
	var until = block.getFieldValue('MODE') == 'UNTIL';
	var argument0 = Blockly.JavaScript.valueToCode(block, 'BOOL', until ? Blockly.JavaScript.ORDER_LOGICAL_NOT : Blockly.JavaScript.ORDER_NONE) || 'false';
	var branch = Blockly.JavaScript.statementToCode(block, 'DO');

//testbug
//console.log('controls_whileUntil');

	branch = Blockly.JavaScript.addLoopTrap(branch, block.id);

//testbug
//console.log('addLoopTrap');

	if (until) {
		argument0 = '!' + argument0;
	}

	return 'while (' + argument0 + ') {\n' + branch + '}\n';
};

Blockly.JavaScript['loop_break'] = function(block) {
	return 'break;\n';
};

Blockly.JavaScript['loop_continue'] = function(block) {
	return 'continue;\n';
};

// =============================================================================
// wait
// =============================================================================
Blockly.JavaScript['wait_led_matrix_ready'] = function(block) {
	return 'ht16k33.wait_idle();\n';
};

Blockly.JavaScript['wait_sw1_pressed'] = function(block) {
	var code = 'while(1){if ((get_B1state() == 1 ) || (get_B1state() == 2 ) || button12.is_sw1_pressed()){if(get_B1state() == 2){set_B1release();} break;}}\n';
	// button12.wait_sw1_pressed();\n
	return code;
};

Blockly.JavaScript['wait_sw1_released'] = function(block) {
	var code = 'while(1){if ((get_B1state() == 0 ) || button12.is_sw1_released()){break;}}\n';
	// return 'button12.wait_sw1_released();\n';
	return code;
};

Blockly.JavaScript['wait_sw2_pressed'] = function(block) {
	var code = 'while(1){if ((get_B2state() == 1 ) || (get_B2state() == 2 ) || button12.is_sw2_pressed()){if(get_B2state() == 2){set_B2release();} break;}}\n';
	// return 'button12.wait_sw2_pressed();\n';
	return code;
};

Blockly.JavaScript['wait_sw2_released'] = function(block) {
	var code = 'while(1){if ((get_B2state() == 0 ) || button12.is_sw2_released()){break;}}\n';
	// return 'button12.wait_sw2_released();\n';
	return code;
};

// =============================================================================
// music
// =============================================================================
Blockly.JavaScript['music_note'] = function(block) {
	var ret =
		'sound.note(' + block.getFieldValue('NOTE') + ');\n' +
		'sound.rest(' + block.getFieldValue('DURATION') + ');\n' +
		'sound.off();\n';

	return ret;
};

Blockly.JavaScript['music_rest'] = function(block) {
	return 'sound.rest(' + block.getFieldValue('DURATION') + ');\n';
};

Blockly.JavaScript['music_scale'] = function(block) {
	var ret =
		'sound.note(' + block.getFieldValue('NOTE') + ');\n' +
		'sound.rest(' + block.getFieldValue('DURATION') + ');\n' +
		'sound.off();\n';

	return ret;
};

Blockly.JavaScript['music_set_volume'] = function(block) {
	return 'sound.set_volume(' + block.getFieldValue('VALUE') + ');\n';
};

Blockly.JavaScript['music_get_volume'] = function(block) {
	return [
		'sound.get_volume()',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};

Blockly.JavaScript['music_set_tempo'] = function(block) {
	return 'sound.set_bpm(' + block.getFieldValue('VALUE') + ');\n';
};

// =============================================================================
// sensor
// =============================================================================
Blockly.JavaScript['sensor_lm73'] = function(block) {
	return [
		'(lm73_0.error() ? lm73_1.get() : lm73_0.get())',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};

Blockly.JavaScript['sensor_ldr'] = function(block) {
	return [
		'ldr.get()',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};

Blockly.JavaScript['sensor_switch1'] = function(block) {
	return [ '((int)get_B1stateClicked() || button12.sw1_get())',
		// 'button12.sw1_get()',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};

Blockly.JavaScript['sensor_switch2'] = function(block) {
	return [ '((int)get_B2stateClicked() || button12.sw2_get())',
		// 'button12.sw2_get()',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};

// =============================================================================
// rtc
// =============================================================================
Blockly.JavaScript['rtc_get'] = function(block) {
	return [
		'mcp7940n.get_datetime()',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};
Blockly.JavaScript['rtc_get_date'] = function(block) {
	return [
		'mcp7940n.get_date()',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};
Blockly.JavaScript['rtc_get_time'] = function(block) {
	return [
		'mcp7940n.get_time()',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};
Blockly.JavaScript['rtc_get_day'] = function(block) {
	return [
		'mcp7940n.get(0)',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};
Blockly.JavaScript['rtc_get_month'] = function(block) {
	return [
		'mcp7940n.get(1)',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};
Blockly.JavaScript['rtc_get_year'] = function(block) {
	return [
		'mcp7940n.get(2)',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};
Blockly.JavaScript['rtc_get_hour'] = function(block) {
	return [
		'mcp7940n.get(3)',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};
Blockly.JavaScript['rtc_get_minute'] = function(block) {
	return [
		'mcp7940n.get(4)',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};
Blockly.JavaScript['rtc_get_second'] = function(block) {
	return [
		'mcp7940n.get(5)',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};
Blockly.JavaScript['rtc_cal'] = function(block) {
	return 'mcp7940n.cal(' + block.getFieldValue('VALUE') + ');\n';
};
Blockly.JavaScript['rtc_cal_coarse'] = function(block) {
	return 'mcp7940n.cal_coarse(' + block.getFieldValue('VALUE') + ');\n';
};

// =============================================================================
// I/O
// =============================================================================
Blockly.JavaScript['output_write'] = function(block) {
	return 'ports.output' + block.getFieldValue('OUTPUT') + '_write(' + block.getFieldValue('STATUS') + ');\n';
};
Blockly.JavaScript['output_toggle'] = function(block) {
	return 'ports.output' + block.getFieldValue('OUTPUT') + '_toggle();\n';
};
Blockly.JavaScript['output_read'] = function(block) {
	return [
		'ports.output' + block.getFieldValue('OUTPUT') + '_read()',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};
Blockly.JavaScript['usbsw_write'] = function(block) {
	return 'ports.usbsw_write(' + block.getFieldValue('STATUS') + ');\n';
};
Blockly.JavaScript['usbsw_toggle'] = function(block) {
	return 'ports.usbsw_toggle();\n';
};
Blockly.JavaScript['usbsw_read'] = function(block) {
	return [
		'ports.usbsw_read()',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};
Blockly.JavaScript['input_read'] = function(block) {
	return [
		'ports.input' + block.getFieldValue('INPUT') + '_read()',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};

// =============================================================================
// number to string
// =============================================================================
Blockly.JavaScript['number-to-str'] = function(block) {
  var number_to_str = Blockly.JavaScript.valueToCode(block, 'number-to-str', Blockly.JavaScript.ORDER_ATOMIC);
  return ['"'+ number_to_str +'"', Blockly.JavaScript.ORDER_ATOMIC]
  //return ['DEV_IO.number_to_strings().numbertostring('+ number_to_str +')', Blockly.JavaScript.ORDER_ATOMIC]
}

// =============================================================================
// Advanced Math
// =============================================================================
Blockly.JavaScript['mathplus_acos'] = function(block) {
  var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  //var code = 'acos(' + value_x + ')';
  var code = 'kb_mathplus.p_acos(' + value_x + ')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['mathplus_asin'] = function(block) {
  var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  //var code = 'asin(' + value_x + ')';
  var code = 'kb_mathplus.p_asin(' + value_x + ')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['mathplus_atan'] = function(block) {
  var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  //var code = 'atan(' + value_x + ')';
  var code = 'kb_mathplus.p_atan(' + value_x + ')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['mathplus_atan2'] = function(block) {
  var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
  //var code = 'atan2(' + value_x + ', ' + value_y + ')';
  var code = 'kb_mathplus.p_atan2(' + value_x + ', ' + value_y + ')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['mathplus_cos'] = function(block) {
  var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  //var code = 'cos(' + value_x + ')';
  var code = 'kb_mathplus.p_cos(' + value_x + ')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['mathplus_cosh'] = function(block) {
  var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  //var code = 'cosh(' + value_x + ')';
  var code = 'kb_mathplus.p_cosh(' + value_x + ')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['mathplus_sin'] = function(block) {
  var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  //var code = 'sin(' + value_x + ')';
  var code = 'kb_mathplus.p_sin(' + value_x + ')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['mathplus_sinh'] = function(block) {
  var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  //var code = 'sinh(' + value_x + ')';
  var code = 'kb_mathplus.p_sinh(' + value_x + ')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['mathplus_tan'] = function(block) {
  var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  //var code = 'tan(' + value_x + ')';
  var code = 'kb_mathplus.p_tan(' + value_x + ')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['mathplus_tanh'] = function(block) {
  var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  //var code = 'tanh(' + value_x + ')';
  var code = 'kb_mathplus.p_tanh(' + value_x + ')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['mathplus_exp'] = function(block) {
  var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  //var code = 'exp(' + value_x + ')';
  var code = 'kb_mathplus.p_exp(' + value_x + ')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['mathplus_ldexp'] = function(block) {
  var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
  //var code = 'ldexp(' + value_x + ', ' + value_y + ')';
  var code = 'kb_mathplus.p_ldexp(' + value_x + ', ' + value_y + ')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['mathplus_log'] = function(block) {
  var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  //var code = 'log(' + value_x + ')';
  var code = 'kb_mathplus.p_log(' + value_x + ')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['mathplus_log10'] = function(block) {
  var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'kb_mathplus.p_log10(' + value_x + ')';
  //var code = 'log10(' + value_x + ')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['mathplus_pow'] = function(block) {
  var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
  //var code = 'pow(' + value_x + ', ' + value_y + ')';
  var code = 'kb_mathplus.p_pow(' + value_x + ', ' + value_y + ')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['mathplus_sqrt'] = function(block) {
  var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  //var code = 'sqrt(' + value_x + ')';
  var code = 'kb_mathplus.p_sqrt(' + value_x + ')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['mathplus_ceil'] = function(block) {
  var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  //var code = 'ceil(' + value_x + ')';
  var code = 'kb_mathplus.p_ceil(' + value_x + ')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['mathplus_fabs'] = function(block) {
  var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  //var code = 'fabs(' + value_x + ')';
  var code = 'kb_mathplus.p_fabs(' + value_x + ')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['mathplus_floor'] = function(block) {
  var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  //var code = 'floor(' + value_x + ')';
  var code = 'kb_mathplus.p_floor(' + value_x + ')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['mathplus_fmod'] = function(block) {
  var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
  //var code = 'fmod(' + value_x + ', ' + value_y + ')';
  var code = 'kb_mathplus.p_fmod(' + value_x + ', ' + value_y + ')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

// =============================================================================
// advance
// =============================================================================
Blockly.JavaScript['advance_task'] = function(block) {
	// generate unique function name
	Blockly.JavaScript.taskNumber++;
	var funcName = 'vTask' + Blockly.JavaScript.taskNumber;

	var branch = Blockly.JavaScript.statementToCode(block, 'STACK');
	if (Blockly.JavaScript.STATEMENT_PREFIX) {
		branch = Blockly.JavaScript.prefixLines(
			Blockly.JavaScript.STATEMENT_PREFIX.replace(/%1/g,
				'\'' + block.id + '\''), Blockly.JavaScript.INDENT) + branch;
	}
	if (Blockly.JavaScript.INFINITE_LOOP_TRAP) {
		branch = Blockly.JavaScript.INFINITE_LOOP_TRAP.replace(/%1/g,
			'\'' + block.id + '\'') + branch;
	}

	//var code = 'void ' + funcName + '(void *pvParameters) {\n' + branch +'  // kill itself\n' + '  vTaskDelete(NULL);\n' + '}';

	//var code = 'var tsk = new Task(' + funcName + ',this);\n'+
	//'function ' + funcName + '() {\n' + branch + '\n' + '}\n' + 
	//'tsk.execute();\n';

	/*var code = 
	'const supportsColor = require("supports-color");\n' + 
	'module.exports = grunt => {\n' +
		'grunt.initConfig({\n' +
			'concurrent: {\n' +
				'test: [' + funcName + ']\n' + 
			'}\n' +
		'});\n' +
		'grunt.registerTask(' + funcName + ', () => {\n' +
			branch + '\n' + 
		'});\n' +
	'};\n';*/

	/*var code = 'function ' + funcName + '(value, maxValue){\n' +
   branch + ';\n' +
  'value++;\n' +
  'if(value<=maxValue)\n' + 
        'setTimeout(function () { this.' + funcName + '(value, maxValue); }, 0);\n' +
	'}' + funcName + '(0, 10000);\n';
	*/
	//code = Blockly.JavaScript.scrub_(block, code);
	// Add % so as not to collide with helper functions in definitions list.
	//Blockly.JavaScript.definitions_['%' + funcName] = code;
	return code;
};

/* ////////////////////////////////////////////////// Plugins ///////////////////////////////////////////////// */

// Control GPIO
Blockly.JavaScript['set_gpio'] = function(block) {
  var dropdown_pin = block.getFieldValue('pin');
  var dropdown_state = block.getFieldValue('state');
  // TODO: Assemble JavaScript into code variable.
  var code = 'DEV_IO.c_gpio()' + '.set_gpio(' + dropdown_pin + ',' + dropdown_state + ');\n';
  return code;
};

Blockly.JavaScript['get_gpio'] = function(block) {
  var dropdown_gpin = block.getFieldValue('gpin');
  // TODO: Assemble JavaScript into code variable.
  var code = 'DEV_IO.c_gpio().get_gpio(' + dropdown_gpin + ')\n';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

//Display i2c
Blockly.JavaScript['lcd_i2c_20x4.clear'] = function(block) {
	return 'DEV_I2C1.LCD_I2C(' + block.getFieldValue('CHANNEL') + ', ' + block.getFieldValue('ADDRESS') + ', 20, 4).clear();\n';
};

Blockly.JavaScript['lcd_i2c_20x4.backlight'] = function(block) {
	return 'DEV_I2C1.LCD_I2C(' + block.getFieldValue('CHANNEL') + ', ' + block.getFieldValue('ADDRESS') + ', 20, 4).backlight(' + block.getFieldValue('STATUS') + ');\n';
}

Blockly.JavaScript['lcd_i2c_20x4.print'] = function(block) {
	var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';

	var column = parseInt(block.getFieldValue('COLUMN')) - 1;
	var row = parseInt(block.getFieldValue('ROW')) - 1;

	return 'DEV_I2C1.LCD_I2C(' + block.getFieldValue('CHANNEL') + ', ' + block.getFieldValue('ADDRESS') + ', 20, 4).print(' + column + ', ' + row + ', ' + argument0 + ');\n';
};

Blockly.JavaScript['lcd_i2c_20x4.print_prec'] = function(block) {
	var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';

	var column = parseInt(block.getFieldValue('COLUMN')) - 1;
	var row = parseInt(block.getFieldValue('ROW')) - 1;
	var prec = parseInt(block.getFieldValue('PREC'));
	if (prec < 0) {
		prec = 0;
	}
	if (prec > 4) {
		prec = 4;
	}

	return 'DEV_I2C1.LCD_I2C(' + block.getFieldValue('CHANNEL') + ', ' + block.getFieldValue('ADDRESS') + ', 20, 4).print(' + column + ', ' + row + ', ' + argument0 + ', ' + prec + ');\n';
};
//Display spi
Blockly.JavaScript['lcd_spi_20x4.clear'] = function(block) {
	return 'DEV_SPI.LCD_SPI(' + block.getFieldValue('CHANNEL') + ', ' + block.getFieldValue('ADDRESS') + ', 20, 4).clear();\n';
};

Blockly.JavaScript['lcd_spi_20x4.backlight'] = function(block) {
	return 'DEV_SPI.LCD_SPI(' + block.getFieldValue('CHANNEL') + ', ' + block.getFieldValue('ADDRESS') + ', 20, 4).backlight(' + block.getFieldValue('STATUS') + ');\n';
};

Blockly.JavaScript['lcd_spi_20x4.print'] = function(block) {
	var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';

	var column = parseInt(block.getFieldValue('COLUMN')) - 1;
	var row = parseInt(block.getFieldValue('ROW')) - 1;

	return 'DEV_SPI.LCD_SPI(' + block.getFieldValue('CHANNEL') + ', ' + block.getFieldValue('ADDRESS') + ', 20, 4).print(' + column + ', ' + row + ', ' + argument0 + ');\n';
};

Blockly.JavaScript['lcd_spi_20x4.print_prec'] = function(block) {
	var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';

	var column = parseInt(block.getFieldValue('COLUMN')) - 1;
	var row = parseInt(block.getFieldValue('ROW')) - 1;
	var prec = parseInt(block.getFieldValue('PREC'));
	if (prec < 0) {
		prec = 0;
	}
	if (prec > 4) {
		prec = 4;
	}

	return 'DEV_SPI.LCD_SPI(' + block.getFieldValue('CHANNEL') + ', ' + block.getFieldValue('ADDRESS') + ', 20, 4).print(' + column + ', ' + row + ', ' + argument0 + ', ' + prec + ');\n';
};

//Examples
Blockly.JavaScript['blink.start'] = function(block) {
	return 'DEV_IO.BLINK().start();\n';
};

Blockly.JavaScript['blink.stop'] = function(block) {
	return 'DEV_IO.BLINK().stop();\n';
};

//GPIO
Blockly.JavaScript['mcp23s17_16in.read'] = function(block) {
	return [
		'DEV_SPI.MCP23S17_16IN(' + block.getFieldValue('CHANNEL') + ', ' + block.getFieldValue('ADDRESS') + ')' + '.read(' + block.getFieldValue('INPUT') + ')',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};
Blockly.JavaScript['mcp23s17_16out.write'] = function(block) {
	return 'DEV_SPI.MCP23S17_16OUT(' + block.getFieldValue('CHANNEL') + ', ' + block.getFieldValue('ADDRESS') + ')' + '.write(' + block.getFieldValue('OUTPUT') + ', ' + block.getFieldValue('STATUS') + ');\n';
};

//Chain Motor
Blockly.JavaScript['drv8830.speed'] = function(block) {
	var argument0 = Blockly.JavaScript.valueToCode(block, 'SPEED', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
	return 'DEV_I2C1.DRV8830(0, ' + block.getFieldValue('ADDRESS') + ').speed((int)' + argument0 + ');\n';
};

//Special IO


// PM10/PM2.5
Blockly.JavaScript['hpma115s0.getpm2_5'] = function(block) {
	return [
		'DEV_IO.HPMA115S0(' + block.getFieldValue('TX') + ', ' + block.getFieldValue('RX') + ').get_pm2_5()',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};

Blockly.JavaScript['hpma115s0.getpm10'] = function(block) {
	return [
		'DEV_IO.HPMA115S0(' + block.getFieldValue('TX') + ', ' + block.getFieldValue('RX') + ').get_pm10()',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};