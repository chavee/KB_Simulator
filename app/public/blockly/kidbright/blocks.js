'use strict';

// =============================================================================
// basic
// =============================================================================
var basic_colour = Blockly.Msg.BASIC_HUE;
// var basic_colour = "#32D496";
Blockly.Blocks["basic_led16x8"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(Blockly.Msg.BASIC_LED16X8_TITLE)
			.appendField("                                ")
			.appendField(new Blockly.FieldImage("/icons/shift_left_24px.svg", 24, 24, "*", function(e) {
				for (var y = 0; y < 8; y++) {
					for (var x = 0; x < 16; x++) {
						if (x != 15) {
							var val = e.sourceBlock_.getFieldValue('POS_X' + (x + 1) + '_Y' + y);
							e.sourceBlock_.setFieldValue(val, 'POS_X' + x + '_Y' + y);
						} else {
							e.sourceBlock_.setFieldValue('false', 'POS_X' + x + '_Y' + y);
						}
					}
				}
			}, true))
			.appendField(new Blockly.FieldImage("/icons/shift_right_24px.svg", 24, 24, "*", function(e) {
				for (var y = 0; y < 8; y++) {
					for (var x = 15; x >= 0; x--) {
						if (x != 0) {
							var val = e.sourceBlock_.getFieldValue('POS_X' + (x - 1) + '_Y' + y);
							e.sourceBlock_.setFieldValue(val, 'POS_X' + x + '_Y' + y);
						} else {
							e.sourceBlock_.setFieldValue('false', 'POS_X' + x + '_Y' + y);
						}
					}
				}
			}, true))
			.appendField(new Blockly.FieldImage("/icons/shift_up_24px.svg", 24, 24, "*", function(e) {
				for (var y = 7; y >= 0; y--) {
					for (var x = 0; x < 16; x++) {
						if (y != 0) {
							var val = e.sourceBlock_.getFieldValue('POS_X' + x + '_Y' + (y - 1));
							e.sourceBlock_.setFieldValue(val, 'POS_X' + x + '_Y' + y);
						} else {
							e.sourceBlock_.setFieldValue('false', 'POS_X' + x + '_Y' + y);
						}
					}
				}
			}, true))
			.appendField(new Blockly.FieldImage("/icons/shift_down_24px.svg", 24, 24, "*", function(e) {
				for (var y = 0; y < 8; y++) {
					for (var x = 0; x < 16; x++) {
						if (y != 7) {
							var val = e.sourceBlock_.getFieldValue('POS_X' + x + '_Y' + (y + 1));
							e.sourceBlock_.setFieldValue(val, 'POS_X' + x + '_Y' + y);
						} else {
							e.sourceBlock_.setFieldValue('false', 'POS_X' + x + '_Y' + y);
						}
					}
				}
			}, true));

		for (var y = 7; y >= 0; y--) {
			var line = this.appendDummyInput();
			for (var x = 0; x < 16; x++) {
				line.appendField(new Blockly.FieldCheckbox('false', null, true), 'POS_X' + x + '_Y' + y);
			}
		}
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(basic_colour);
		this.setTooltip(Blockly.Msg.BASIC_LED16X8_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.BASIC_LED16X8_HELPURL);
	}
};

Blockly.Blocks["basic_led16x8_clr"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(Blockly.Msg.BASIC_LED16X8_CLR_TITLE);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(basic_colour);
		this.setTooltip(Blockly.Msg.BASIC_LED16X8_CLR_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.BASIC_LED16X8_CLR_HELPURL);
	}
};

Blockly.Blocks["basic_led16x8_2chars"] = {
	init: function() {
		/*this.jsonInit({
			"type": "basic_led16x8_2chars",
			"message0": Blockly.Msg.BASIC_LED16X8_2CHARS_TITLE + "%1",
			"args0": [{
				"type": "input_value",
				"name": "VALUE"
			}],
			"previousStatement": null,
			"nextStatement": null,
			"colour": 160,
			"tooltip": Blockly.Msg.BASIC_LED16X8_2CHARS_TOOLTIP,
			"helpUrl": Blockly.Msg.BASIC_LED16X8_2CHARS_HELPURL
		});*/

		this.appendValueInput('VALUE')
			.appendField(Blockly.Msg.BASIC_LED16X8_2CHARS_TITLE);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(basic_colour);
		this.setTooltip(Blockly.Msg.BASIC_LED16X8_2CHARS_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.BASIC_LED16X8_2CHARS_HELPURL);
	}
};

Blockly.Blocks["basic_led16x8_scroll"] = {
	init: function() {
		this.appendValueInput('VALUE')
			.appendField(Blockly.Msg.BASIC_LED16X8_SCROLL_TITLE);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(basic_colour);
		this.setTooltip(Blockly.Msg.BASIC_LED16X8_SCROLL_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.BASIC_LED16X8_SCROLL_HELPURL);
	}
};

Blockly.Blocks["basic_led16x8_scroll_when_ready"] = {
	init: function() {
		this.appendValueInput('VALUE')
			.appendField(Blockly.Msg.BASIC_LED16X8_SCROLL_WHEN_READY_TITLE);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(basic_colour);
		this.setTooltip(Blockly.Msg.BASIC_LED16X8_SCROLL_WHEN_READY_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.BASIC_LED16X8_SCROLL_WHEN_READY_HELPURL);
	}
};

Blockly.Blocks["basic_delay"] = {
	init: function() {
		// max 1 day delay = 86400 sec.
		this.appendDummyInput()
			.appendField(Blockly.Msg.BASIC_DELAY_TITLE)
			.appendField(new Blockly.FieldNumber(0.5, 0.1, 86400, 0.1), 'VALUE');
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(basic_colour);
		this.setTooltip(Blockly.Msg.BASIC_DELAY_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.BASIC_DELAY_HELPURL);
	}
};

Blockly.Blocks["basic_forever"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(Blockly.Msg.BASIC_FOREVER_TITLE);
		this.appendStatementInput('HANDLER');
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(basic_colour);
		this.setTooltip(Blockly.Msg.BASIC_FOREVER_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.BASIC_FOREVER_HELPURL);
	}
};

Blockly.Blocks["basic_string"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldImage('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAn0lEQVQI1z3OMa5BURSF4f/cQhAKjUQhuQmFNwGJEUi0RKN5rU7FHKhpjEH3TEMtkdBSCY1EIv8r7nFX9e29V7EBAOvu7RPjwmWGH/VuF8CyN9/OAdvqIXYLvtRaNjx9mMTDyo+NjAN1HNcl9ZQ5oQMM3dgDUqDo1l8DzvwmtZN7mnD+PkmLa+4mhrxVA9fRowBWmVBhFy5gYEjKMfz9AylsaRRgGzvZAAAAAElFTkSuQmCC', 12, 12, '*'))
			.appendField(new Blockly.FieldTextInput('Hello World!'), 'VALUE')
			.appendField(new Blockly.FieldImage('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAqUlEQVQI1z3KvUpCcRiA8ef9E4JNHhI0aFEacm1o0BsI0Slx8wa8gLauoDnoBhq7DcfWhggONDmJJgqCPA7neJ7p934EOOKOnM8Q7PDElo/4x4lFb2DmuUjcUzS3URnGib9qaPNbuXvBO3sGPHJDRG6fGVdMSeWDP2q99FQdFrz26Gu5Tq7dFMzUvbXy8KXeAj57cOklgA+u1B5AoslLtGIHQMaCVnwDnADZIFIrXsoXrgAAAABJRU5ErkJggg==', 12, 12, '*'));
		this.setOutput(true, 'String');
		this.setPreviousStatement(false);
		this.setNextStatement(false);
		this.setColour(basic_colour);
		this.setTooltip(Blockly.Msg.BASIC_STRING_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.BASIC_STRING_HELPURL);
	}
};

// =============================================================================
// math
// =============================================================================
var math_colour = Blockly.Msg.MATH_HUE;
// var math_colour = "#7F94F8";
Blockly.Blocks["math_number"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldNumber(0, -9999999, 9999999, 0.01), 'VALUE');
		this.setOutput(true, 'Number');
		this.setPreviousStatement(false);
		this.setNextStatement(false);
		this.setColour(math_colour);
		this.setTooltip(Blockly.Msg.MATH_NUMBER_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.MATH_NUMBER_HELPURL);
	}
};

Blockly.Blocks['math_arithmetic'] = {
	init: function() {
		this.appendValueInput('A')
			.setCheck('Number');
		this.appendDummyInput()
			.appendField(new Blockly.FieldDropdown([
				[Blockly.Msg.MATH_ADDITION_SYMBOL, "ADD"],
				[Blockly.Msg.MATH_SUBTRACTION_SYMBOL, "MINUS"],
				[Blockly.Msg.MATH_MULTIPLICATION_SYMBOL, "MULTIPLY"],
				[Blockly.Msg.MATH_DIVISION_SYMBOL, "DIVIDE"],
				//[Blockly.Msg.MATH_POWER_SYMBOL, "POWER"],
				[Blockly.Msg.MATH_MODULO_SYMBOL, "MODULO"]
			]), 'OP');
		this.appendValueInput('B')
			.setCheck('Number');
		this.setOutput(true, 'Number');
		this.setInputsInline(true);
		this.setPreviousStatement(false);
		this.setNextStatement(false);
		this.setColour(math_colour);
		this.setTooltip(Blockly.Msg.MATH_ARITHMETIC_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.MATH_ARITHMETIC_HELPURL);
	}
};

Blockly.Blocks['math_variables_set'] = {
	init: function() {
		this.appendDummyInput()
			.appendField(Blockly.Msg.VARIABLES_SET_SET)
			.appendField(new Blockly.FieldVariable("x"), "VAR")
			.appendField(Blockly.Msg.VARIABLES_SET_TO);
		this.appendValueInput('VALUE')
			.setCheck('Number');
		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(math_colour);
		this.setTooltip(Blockly.Msg.VARIABLES_SET_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.VARIABLES_SET_HELPURL);
	}
};

Blockly.Blocks['math_variables_get'] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldVariable("x"), "VAR");
		this.setOutput(true, 'Number');
		this.setPreviousStatement(false);
		this.setNextStatement(false);
		this.setColour(math_colour);
		this.setTooltip(Blockly.Msg.VARIABLES_GET_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.VARIABLES_GET_HELPURL);
	}
};

// =============================================================================
// logic
// =============================================================================
var logic_colour = Blockly.Msg.LOGIC_HUE;
// var logic_colour = "#3597F6";
Blockly.Blocks['logic_led16x8_scroll_ready'] = {
	init: function() {
		this.appendDummyInput()
			.appendField(Blockly.Msg.LOGIC_LED16X8_SCROLL_READY_TITLE);
		this.setOutput(true, 'Boolean');
		this.setPreviousStatement(false);
		this.setNextStatement(false);
		this.setColour(logic_colour);
		this.setTooltip(Blockly.Msg.LOGIC_LED16X8_SCROLL_READY_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.LOGIC_LED16X8_SCROLL_READY_HELPURL);
	}
};

Blockly.Blocks['logic_sw1_pressed'] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldImage("/icons/sw12x12.png", 20, 20, "*"))
			.appendField(Blockly.Msg.LOGIC_SW1_PRESSED_TITLE);
		this.setOutput(true, 'Boolean');
		this.setPreviousStatement(false);
		this.setNextStatement(false);
		this.setColour(logic_colour);
		this.setTooltip(Blockly.Msg.LOGIC_SW1_PRESSED_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.LOGIC_SW1_PRESSED_HELPURL);
	}
};

Blockly.Blocks['logic_sw1_released'] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldImage("/icons/sw12x12.png", 20, 20, "*"))
			.appendField(Blockly.Msg.LOGIC_SW1_RELEASED_TITLE);
		this.setOutput(true, 'Boolean');
		this.setPreviousStatement(false);
		this.setNextStatement(false);
		this.setColour(logic_colour);
		this.setTooltip(Blockly.Msg.LOGIC_SW1_RELEASED_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.LOGIC_SW1_RELEASED_HELPURL);
	}
};

Blockly.Blocks['logic_sw2_pressed'] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldImage("/icons/sw12x12.png", 20, 20, "*"))
			.appendField(Blockly.Msg.LOGIC_SW2_PRESSED_TITLE);
		this.setOutput(true, 'Boolean');
		this.setPreviousStatement(false);
		this.setNextStatement(false);
		this.setColour(logic_colour);
		this.setTooltip(Blockly.Msg.LOGIC_SW2_PRESSED_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.LOGIC_SW2_PRESSED_HELPURL);
	}
};

Blockly.Blocks['logic_sw2_released'] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldImage("/icons/sw12x12.png", 20, 20, "*"))
			.appendField(Blockly.Msg.LOGIC_SW2_RELEASED_TITLE);
		this.setOutput(true, 'Boolean');
		this.setPreviousStatement(false);
		this.setNextStatement(false);
		this.setColour(logic_colour);
		this.setTooltip(Blockly.Msg.LOGIC_SW2_RELEASED_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.LOGIC_SW2_RELEASED_HELPURL);
	}
};

// =============================================================================
// loop
// =============================================================================
var loop_colour = Blockly.Msg.LOOPS_HUE;
// var loop_colour = "#1DC020";
Blockly.Blocks["loop_break"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(Blockly.Msg.LOOP_BREAK_TITLE);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(loop_colour);
		this.setTooltip(Blockly.Msg.LOOP_BREAK_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.LOOP_BREAK_HELPURL);
	}
};

Blockly.Blocks["loop_continue"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(Blockly.Msg.LOOP_CONTINUE_TITLE);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(loop_colour);
		this.setTooltip(Blockly.Msg.LOOP_CONTINUE_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.LOOP_CONTINUE_HELPURL);
	}
};

// =============================================================================
// wait
// =============================================================================
var wait_colour = Blockly.Msg.WAIT_HUE;
// var wait_colour = "#74B735";
Blockly.Blocks["wait_led_matrix_ready"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(Blockly.Msg.WAIT_LED_MATRIX_READY_TITLE);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(wait_colour);
		this.setTooltip(Blockly.Msg.WAIT_LED_MATRIX_READY_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.WAIT_LED_MATRIX_READY_HELPURL);
	}
};

Blockly.Blocks["wait_sw1_pressed"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldImage("/icons/sw12x12.png", 20, 20, "*"))
			.appendField(Blockly.Msg.WAIT_SW1_PRESSED_TITLE);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(wait_colour);
		this.setTooltip(Blockly.Msg.WAIT_SW1_PRESSED_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.WAIT_SW1_PRESSED_HELPURL);
	}
};

Blockly.Blocks["wait_sw1_released"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldImage("/icons/sw12x12.png", 20, 20, "*"))
			.appendField(Blockly.Msg.WAIT_SW1_RELEASED_TITLE);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(wait_colour);
		this.setTooltip(Blockly.Msg.WAIT_SW1_RELEASED_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.WAIT_SW1_RELEASED_HELPURL);
	}
};

Blockly.Blocks["wait_sw2_pressed"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldImage("/icons/sw12x12.png", 20, 20, "*"))
			.appendField(Blockly.Msg.WAIT_SW2_PRESSED_TITLE);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(wait_colour);
		this.setTooltip(Blockly.Msg.WAIT_SW2_PRESSED_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.WAIT_SW2_PRESSED_HELPURL);
	}
};

Blockly.Blocks["wait_sw2_released"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldImage("/icons/sw12x12.png", 20, 20, "*"))
			.appendField(Blockly.Msg.WAIT_SW2_RELEASED_TITLE);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(wait_colour);
		this.setTooltip(Blockly.Msg.WAIT_SW2_RELEASED_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.WAIT_SW2_RELEASED_HELPURL);
	}
};

// =============================================================================
// music
// =============================================================================
var music_colour=Blockly.Msg.MUSIC_HUE ;
// var music_colour="#FB8CC3";
Blockly.Blocks["music_duration_opt"] = [
	[{
		'src': '/icons/notes/whole.svg',
		'width': 20,
		'height': 20,
		'alt': 'Whole'
	}, "0"],
	[{
		'src': '/icons/notes/half.svg',
		'width': 20,
		'height': 20,
		'alt': 'Whole'
	}, "1"],
	[{
		'src': '/icons/notes/quarter.svg',
		'width': 20,
		'height': 20,
		'alt': 'Whole'
	}, "2"],
	[{
		'src': '/icons/notes/eighth.svg',
		'width': 20,
		'height': 20,
		'alt': 'Whole'
	}, "3"],
	[{
		'src': '/icons/notes/sixteenth.svg',
		'width': 20,
		'height': 20,
		'alt': 'Whole'
	}, "4"]
];

Blockly.Blocks["music_note"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldImage("/icons/buzzer.png", 20, 20, "*"))
			.appendField(Blockly.Msg.MUSIC_NOTE_TITLE)
			.appendField(new Blockly.FieldDropdown([
				[Blockly.Msg.MUSIC_NOTE_C7, "36"],
				[Blockly.Msg.MUSIC_NOTE_B6, "35"],
				[Blockly.Msg.MUSIC_NOTE_BB6, "34"],
				[Blockly.Msg.MUSIC_NOTE_A6, "33"],
				[Blockly.Msg.MUSIC_NOTE_GS6, "32"],
				[Blockly.Msg.MUSIC_NOTE_G6, "31"],
				[Blockly.Msg.MUSIC_NOTE_FS6, "30"],
				[Blockly.Msg.MUSIC_NOTE_F6, "29"],
				[Blockly.Msg.MUSIC_NOTE_E6, "28"],
				[Blockly.Msg.MUSIC_NOTE_EB6, "27"],
				[Blockly.Msg.MUSIC_NOTE_D6, "26"],
				[Blockly.Msg.MUSIC_NOTE_CS6, "25"],
				[Blockly.Msg.MUSIC_NOTE_C6, "24"],
				[Blockly.Msg.MUSIC_NOTE_B5, "23"],
				[Blockly.Msg.MUSIC_NOTE_BB5, "22"],
				[Blockly.Msg.MUSIC_NOTE_A5, "21"],
				[Blockly.Msg.MUSIC_NOTE_GS5, "20"],
				[Blockly.Msg.MUSIC_NOTE_G5, "19"],
				[Blockly.Msg.MUSIC_NOTE_FS5, "18"],
				[Blockly.Msg.MUSIC_NOTE_F5, "17"],
				[Blockly.Msg.MUSIC_NOTE_E5, "16"],
				[Blockly.Msg.MUSIC_NOTE_EB5, "15"],
				[Blockly.Msg.MUSIC_NOTE_D5, "14"],
				[Blockly.Msg.MUSIC_NOTE_CS5, "13"],
				[Blockly.Msg.MUSIC_NOTE_C5, "12"],
				[Blockly.Msg.MUSIC_NOTE_B4, "11"],
				[Blockly.Msg.MUSIC_NOTE_BB4, "10"],
				[Blockly.Msg.MUSIC_NOTE_A4, "9"],
				[Blockly.Msg.MUSIC_NOTE_GS4, "8"],
				[Blockly.Msg.MUSIC_NOTE_G4, "7"],
				[Blockly.Msg.MUSIC_NOTE_FS4, "6"],
				[Blockly.Msg.MUSIC_NOTE_F4, "5"],
				[Blockly.Msg.MUSIC_NOTE_E4, "4"],
				[Blockly.Msg.MUSIC_NOTE_EB4, "3"],
				[Blockly.Msg.MUSIC_NOTE_D4, "2"],
				[Blockly.Msg.MUSIC_NOTE_CS4, "1"],
				[Blockly.Msg.MUSIC_NOTE_C4, "0"]
			]), 'NOTE');

		this.appendDummyInput()
			.appendField(Blockly.Msg.MUSIC_NOTE_DURATION)
			.appendField(new Blockly.FieldDropdown(
				Blockly.Blocks["music_duration_opt"]
			), 'DURATION');
		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(music_colour);
		this.setTooltip(Blockly.Msg.MUSIC_NOTE_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.MUSIC_NOTE_HELPURL);
	}
};

Blockly.Blocks["music_rest"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldImage("/icons/buzzer.png", 20, 20, "*"))
			.appendField(Blockly.Msg.MUSIC_REST_TITLE)
			.appendField(Blockly.Msg.MUSIC_NOTE_DURATION)
			.appendField(new Blockly.FieldDropdown(
				Blockly.Blocks["music_duration_opt"]
			), 'DURATION');
		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(music_colour);
		this.setTooltip(Blockly.Msg.MUSIC_NOTE_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.MUSIC_NOTE_HELPURL);
	}
};

// https://online-musical-scales.com/c-major-scale
// https://online-musical-scales.com/c-minor-scale
Blockly.Blocks["music_scale_opt"] = [
	[ // C Maj
		[Blockly.Msg.MUSIC_NOTE_C7, "36"],
		[Blockly.Msg.MUSIC_NOTE_B6, "35"],
		[Blockly.Msg.MUSIC_NOTE_A6, "33"],
		[Blockly.Msg.MUSIC_NOTE_G6, "31"],
		[Blockly.Msg.MUSIC_NOTE_F6, "29"],
		[Blockly.Msg.MUSIC_NOTE_E6, "28"],
		[Blockly.Msg.MUSIC_NOTE_D6, "26"],
		[Blockly.Msg.MUSIC_NOTE_C6, "24"],
		[Blockly.Msg.MUSIC_NOTE_B5, "23"],
		[Blockly.Msg.MUSIC_NOTE_A5, "21"],
		[Blockly.Msg.MUSIC_NOTE_G5, "19"],
		[Blockly.Msg.MUSIC_NOTE_F5, "17"],
		[Blockly.Msg.MUSIC_NOTE_E5, "16"],
		[Blockly.Msg.MUSIC_NOTE_D5, "14"],
		[Blockly.Msg.MUSIC_NOTE_C5, "12"],
		[Blockly.Msg.MUSIC_NOTE_B4, "11"],
		[Blockly.Msg.MUSIC_NOTE_A4, "9"],
		[Blockly.Msg.MUSIC_NOTE_G4, "7"],
		[Blockly.Msg.MUSIC_NOTE_F4, "5"],
		[Blockly.Msg.MUSIC_NOTE_E4, "4"],
		[Blockly.Msg.MUSIC_NOTE_D4, "2"],
		[Blockly.Msg.MUSIC_NOTE_C4, "0"]
	],
	[ // C Minor
		[Blockly.Msg.MUSIC_NOTE_C7, "36"],
		[Blockly.Msg.MUSIC_NOTE_BB6, "34"],
		[Blockly.Msg.MUSIC_NOTE_GS6, "32"],
		[Blockly.Msg.MUSIC_NOTE_G6, "31"],
		[Blockly.Msg.MUSIC_NOTE_F6, "29"],
		[Blockly.Msg.MUSIC_NOTE_EB6, "27"],
		[Blockly.Msg.MUSIC_NOTE_D6, "26"],
		[Blockly.Msg.MUSIC_NOTE_C6, "24"],
		[Blockly.Msg.MUSIC_NOTE_BB5, "22"],
		[Blockly.Msg.MUSIC_NOTE_GS5, "20"],
		[Blockly.Msg.MUSIC_NOTE_G5, "19"],
		[Blockly.Msg.MUSIC_NOTE_F5, "17"],
		[Blockly.Msg.MUSIC_NOTE_EB5, "15"],
		[Blockly.Msg.MUSIC_NOTE_D5, "14"],
		[Blockly.Msg.MUSIC_NOTE_C5, "12"],
		[Blockly.Msg.MUSIC_NOTE_BB4, "10"],
		[Blockly.Msg.MUSIC_NOTE_GS4, "8"],
		[Blockly.Msg.MUSIC_NOTE_G4, "7"],
		[Blockly.Msg.MUSIC_NOTE_F4, "5"],
		[Blockly.Msg.MUSIC_NOTE_EB4, "3"],
		[Blockly.Msg.MUSIC_NOTE_D4, "2"],
		[Blockly.Msg.MUSIC_NOTE_C4, "0"]
	],
	[ // C# Major
		[Blockly.Msg.MUSIC_NOTE_C7, "36"],
		[Blockly.Msg.MUSIC_NOTE_BB6, "34"],
		[Blockly.Msg.MUSIC_NOTE_GS6, "32"],
		[Blockly.Msg.MUSIC_NOTE_FS6, "30"],
		[Blockly.Msg.MUSIC_NOTE_F6, "29"],
		[Blockly.Msg.MUSIC_NOTE_EB6, "27"],
		[Blockly.Msg.MUSIC_NOTE_CS6, "25"],
		[Blockly.Msg.MUSIC_NOTE_C6, "24"],
		[Blockly.Msg.MUSIC_NOTE_BB5, "22"],
		[Blockly.Msg.MUSIC_NOTE_GS5, "20"],
		[Blockly.Msg.MUSIC_NOTE_FS5, "18"],
		[Blockly.Msg.MUSIC_NOTE_F5, "17"],
		[Blockly.Msg.MUSIC_NOTE_EB5, "15"],
		[Blockly.Msg.MUSIC_NOTE_CS5, "13"],
		[Blockly.Msg.MUSIC_NOTE_C5, "12"],
		[Blockly.Msg.MUSIC_NOTE_BB4, "10"],
		[Blockly.Msg.MUSIC_NOTE_GS4, "8"],
		[Blockly.Msg.MUSIC_NOTE_FS4, "6"],
		[Blockly.Msg.MUSIC_NOTE_F4, "5"],
		[Blockly.Msg.MUSIC_NOTE_EB4, "3"],
		[Blockly.Msg.MUSIC_NOTE_CS4, "1"],
		[Blockly.Msg.MUSIC_NOTE_C4, "0"]
	],
	[ // C# Minor
		[Blockly.Msg.MUSIC_NOTE_B6, "35"],
		[Blockly.Msg.MUSIC_NOTE_A6, "33"],
		[Blockly.Msg.MUSIC_NOTE_GS6, "32"],
		[Blockly.Msg.MUSIC_NOTE_FS6, "30"],
		[Blockly.Msg.MUSIC_NOTE_E6, "28"],
		[Blockly.Msg.MUSIC_NOTE_EB6, "27"],
		[Blockly.Msg.MUSIC_NOTE_CS6, "25"],
		[Blockly.Msg.MUSIC_NOTE_B5, "23"],
		[Blockly.Msg.MUSIC_NOTE_A5, "21"],
		[Blockly.Msg.MUSIC_NOTE_GS5, "20"],
		[Blockly.Msg.MUSIC_NOTE_FS5, "18"],
		[Blockly.Msg.MUSIC_NOTE_E5, "16"],
		[Blockly.Msg.MUSIC_NOTE_EB5, "15"],
		[Blockly.Msg.MUSIC_NOTE_CS5, "13"],
		[Blockly.Msg.MUSIC_NOTE_B4, "11"],
		[Blockly.Msg.MUSIC_NOTE_A4, "9"],
		[Blockly.Msg.MUSIC_NOTE_GS4, "8"],
		[Blockly.Msg.MUSIC_NOTE_FS4, "6"],
		[Blockly.Msg.MUSIC_NOTE_E4, "4"],
		[Blockly.Msg.MUSIC_NOTE_EB4, "3"],
		[Blockly.Msg.MUSIC_NOTE_CS4, "1"]
	],
	[ // D Major
		[Blockly.Msg.MUSIC_NOTE_B6, "35"],
		[Blockly.Msg.MUSIC_NOTE_A6, "33"],
		[Blockly.Msg.MUSIC_NOTE_G6, "31"],
		[Blockly.Msg.MUSIC_NOTE_FS6, "30"],
		[Blockly.Msg.MUSIC_NOTE_E6, "28"],
		[Blockly.Msg.MUSIC_NOTE_D6, "26"],
		[Blockly.Msg.MUSIC_NOTE_CS6, "25"],
		[Blockly.Msg.MUSIC_NOTE_B5, "23"],
		[Blockly.Msg.MUSIC_NOTE_A5, "21"],
		[Blockly.Msg.MUSIC_NOTE_G5, "19"],
		[Blockly.Msg.MUSIC_NOTE_FS5, "18"],
		[Blockly.Msg.MUSIC_NOTE_E5, "16"],
		[Blockly.Msg.MUSIC_NOTE_D5, "14"],
		[Blockly.Msg.MUSIC_NOTE_CS5, "13"],
		[Blockly.Msg.MUSIC_NOTE_B4, "11"],
		[Blockly.Msg.MUSIC_NOTE_A4, "9"],
		[Blockly.Msg.MUSIC_NOTE_G4, "7"],
		[Blockly.Msg.MUSIC_NOTE_FS4, "6"],
		[Blockly.Msg.MUSIC_NOTE_E4, "4"],
		[Blockly.Msg.MUSIC_NOTE_D4, "2"],
		[Blockly.Msg.MUSIC_NOTE_CS4, "1"]
	],
	[ // D Minor
		[Blockly.Msg.MUSIC_NOTE_C7, "36"],
		[Blockly.Msg.MUSIC_NOTE_BB6, "34"],
		[Blockly.Msg.MUSIC_NOTE_A6, "33"],
		[Blockly.Msg.MUSIC_NOTE_G6, "31"],
		[Blockly.Msg.MUSIC_NOTE_F6, "29"],
		[Blockly.Msg.MUSIC_NOTE_E6, "28"],
		[Blockly.Msg.MUSIC_NOTE_D6, "26"],
		[Blockly.Msg.MUSIC_NOTE_C6, "24"],
		[Blockly.Msg.MUSIC_NOTE_BB5, "22"],
		[Blockly.Msg.MUSIC_NOTE_A5, "21"],
		[Blockly.Msg.MUSIC_NOTE_G5, "19"],
		[Blockly.Msg.MUSIC_NOTE_F5, "17"],
		[Blockly.Msg.MUSIC_NOTE_E5, "16"],
		[Blockly.Msg.MUSIC_NOTE_D5, "14"],
		[Blockly.Msg.MUSIC_NOTE_C5, "12"],
		[Blockly.Msg.MUSIC_NOTE_BB4, "10"],
		[Blockly.Msg.MUSIC_NOTE_A4, "9"],
		[Blockly.Msg.MUSIC_NOTE_G4, "7"],
		[Blockly.Msg.MUSIC_NOTE_F4, "5"],
		[Blockly.Msg.MUSIC_NOTE_E4, "4"],
		[Blockly.Msg.MUSIC_NOTE_D4, "2"],
		[Blockly.Msg.MUSIC_NOTE_C4, "0"]
	],
	[ // Eb Major
		[Blockly.Msg.MUSIC_NOTE_C7, "36"],
		[Blockly.Msg.MUSIC_NOTE_BB6, "34"],
		[Blockly.Msg.MUSIC_NOTE_GS6, "32"],
		[Blockly.Msg.MUSIC_NOTE_G6, "31"],
		[Blockly.Msg.MUSIC_NOTE_F6, "29"],
		[Blockly.Msg.MUSIC_NOTE_EB6, "27"],
		[Blockly.Msg.MUSIC_NOTE_D6, "26"],
		[Blockly.Msg.MUSIC_NOTE_C6, "24"],
		[Blockly.Msg.MUSIC_NOTE_BB5, "22"],
		[Blockly.Msg.MUSIC_NOTE_GS5, "20"],
		[Blockly.Msg.MUSIC_NOTE_G5, "19"],
		[Blockly.Msg.MUSIC_NOTE_F5, "17"],
		[Blockly.Msg.MUSIC_NOTE_EB5, "15"],
		[Blockly.Msg.MUSIC_NOTE_D5, "14"],
		[Blockly.Msg.MUSIC_NOTE_C5, "12"],
		[Blockly.Msg.MUSIC_NOTE_BB4, "10"],
		[Blockly.Msg.MUSIC_NOTE_GS4, "8"],
		[Blockly.Msg.MUSIC_NOTE_G4, "7"],
		[Blockly.Msg.MUSIC_NOTE_F4, "5"],
		[Blockly.Msg.MUSIC_NOTE_EB4, "3"],
		[Blockly.Msg.MUSIC_NOTE_D4, "2"],
		[Blockly.Msg.MUSIC_NOTE_C4, "0"]
	],
	[ // Eb Minor
		[Blockly.Msg.MUSIC_NOTE_B6, "35"],
		[Blockly.Msg.MUSIC_NOTE_BB6, "34"],
		[Blockly.Msg.MUSIC_NOTE_GS6, "32"],
		[Blockly.Msg.MUSIC_NOTE_FS6, "30"],
		[Blockly.Msg.MUSIC_NOTE_F6, "29"],
		[Blockly.Msg.MUSIC_NOTE_EB6, "27"],
		[Blockly.Msg.MUSIC_NOTE_CS6, "25"],
		[Blockly.Msg.MUSIC_NOTE_B5, "23"],
		[Blockly.Msg.MUSIC_NOTE_BB5, "22"],
		[Blockly.Msg.MUSIC_NOTE_GS5, "20"],
		[Blockly.Msg.MUSIC_NOTE_FS5, "18"],
		[Blockly.Msg.MUSIC_NOTE_F5, "17"],
		[Blockly.Msg.MUSIC_NOTE_EB5, "15"],
		[Blockly.Msg.MUSIC_NOTE_CS5, "13"],
		[Blockly.Msg.MUSIC_NOTE_B4, "11"],
		[Blockly.Msg.MUSIC_NOTE_BB4, "10"],
		[Blockly.Msg.MUSIC_NOTE_GS4, "8"],
		[Blockly.Msg.MUSIC_NOTE_FS4, "6"],
		[Blockly.Msg.MUSIC_NOTE_F4, "5"],
		[Blockly.Msg.MUSIC_NOTE_EB4, "3"],
		[Blockly.Msg.MUSIC_NOTE_CS4, "1"]
	],
	[ // E Major
		[Blockly.Msg.MUSIC_NOTE_B6, "35"],
		[Blockly.Msg.MUSIC_NOTE_A6, "33"],
		[Blockly.Msg.MUSIC_NOTE_GS6, "32"],
		[Blockly.Msg.MUSIC_NOTE_FS6, "30"],
		[Blockly.Msg.MUSIC_NOTE_E6, "28"],
		[Blockly.Msg.MUSIC_NOTE_EB6, "27"],
		[Blockly.Msg.MUSIC_NOTE_CS6, "25"],
		[Blockly.Msg.MUSIC_NOTE_B5, "23"],
		[Blockly.Msg.MUSIC_NOTE_A5, "21"],
		[Blockly.Msg.MUSIC_NOTE_GS5, "20"],
		[Blockly.Msg.MUSIC_NOTE_FS5, "18"],
		[Blockly.Msg.MUSIC_NOTE_E5, "16"],
		[Blockly.Msg.MUSIC_NOTE_EB5, "15"],
		[Blockly.Msg.MUSIC_NOTE_CS5, "13"],
		[Blockly.Msg.MUSIC_NOTE_B4, "11"],
		[Blockly.Msg.MUSIC_NOTE_A4, "9"],
		[Blockly.Msg.MUSIC_NOTE_GS4, "8"],
		[Blockly.Msg.MUSIC_NOTE_FS4, "6"],
		[Blockly.Msg.MUSIC_NOTE_E4, "4"],
		[Blockly.Msg.MUSIC_NOTE_EB4, "3"],
		[Blockly.Msg.MUSIC_NOTE_CS4, "1"]
	],
	[ // E Minor
		[Blockly.Msg.MUSIC_NOTE_C7, "36"],
		[Blockly.Msg.MUSIC_NOTE_B6, "35"],
		[Blockly.Msg.MUSIC_NOTE_A6, "33"],
		[Blockly.Msg.MUSIC_NOTE_G6, "31"],
		[Blockly.Msg.MUSIC_NOTE_FS6, "30"],
		[Blockly.Msg.MUSIC_NOTE_E6, "28"],
		[Blockly.Msg.MUSIC_NOTE_D6, "26"],
		[Blockly.Msg.MUSIC_NOTE_C6, "24"],
		[Blockly.Msg.MUSIC_NOTE_B5, "23"],
		[Blockly.Msg.MUSIC_NOTE_A5, "21"],
		[Blockly.Msg.MUSIC_NOTE_G5, "19"],
		[Blockly.Msg.MUSIC_NOTE_FS5, "18"],
		[Blockly.Msg.MUSIC_NOTE_E5, "16"],
		[Blockly.Msg.MUSIC_NOTE_D5, "14"],
		[Blockly.Msg.MUSIC_NOTE_C5, "12"],
		[Blockly.Msg.MUSIC_NOTE_B4, "11"],
		[Blockly.Msg.MUSIC_NOTE_A4, "9"],
		[Blockly.Msg.MUSIC_NOTE_G4, "7"],
		[Blockly.Msg.MUSIC_NOTE_FS4, "6"],
		[Blockly.Msg.MUSIC_NOTE_E4, "4"],
		[Blockly.Msg.MUSIC_NOTE_D4, "2"],
		[Blockly.Msg.MUSIC_NOTE_C4, "0"]
	],
	[ // F Major
		[Blockly.Msg.MUSIC_NOTE_C7, "36"],
		[Blockly.Msg.MUSIC_NOTE_BB6, "34"],
		[Blockly.Msg.MUSIC_NOTE_A6, "33"],
		[Blockly.Msg.MUSIC_NOTE_G6, "31"],
		[Blockly.Msg.MUSIC_NOTE_F6, "29"],
		[Blockly.Msg.MUSIC_NOTE_E6, "28"],
		[Blockly.Msg.MUSIC_NOTE_D6, "26"],
		[Blockly.Msg.MUSIC_NOTE_C6, "24"],
		[Blockly.Msg.MUSIC_NOTE_BB5, "22"],
		[Blockly.Msg.MUSIC_NOTE_A5, "21"],
		[Blockly.Msg.MUSIC_NOTE_G5, "19"],
		[Blockly.Msg.MUSIC_NOTE_F5, "17"],
		[Blockly.Msg.MUSIC_NOTE_E5, "16"],
		[Blockly.Msg.MUSIC_NOTE_D5, "14"],
		[Blockly.Msg.MUSIC_NOTE_C5, "12"],
		[Blockly.Msg.MUSIC_NOTE_BB4, "10"],
		[Blockly.Msg.MUSIC_NOTE_A4, "9"],
		[Blockly.Msg.MUSIC_NOTE_G4, "7"],
		[Blockly.Msg.MUSIC_NOTE_F4, "5"],
		[Blockly.Msg.MUSIC_NOTE_E4, "4"],
		[Blockly.Msg.MUSIC_NOTE_D4, "2"],
		[Blockly.Msg.MUSIC_NOTE_C4, "0"]
	],
	[ // F Minor
		[Blockly.Msg.MUSIC_NOTE_C7, "36"],
		[Blockly.Msg.MUSIC_NOTE_BB6, "34"],
		[Blockly.Msg.MUSIC_NOTE_GS6, "32"],
		[Blockly.Msg.MUSIC_NOTE_G6, "31"],
		[Blockly.Msg.MUSIC_NOTE_F6, "29"],
		[Blockly.Msg.MUSIC_NOTE_EB6, "27"],
		[Blockly.Msg.MUSIC_NOTE_CS6, "25"],
		[Blockly.Msg.MUSIC_NOTE_C6, "24"],
		[Blockly.Msg.MUSIC_NOTE_BB5, "22"],
		[Blockly.Msg.MUSIC_NOTE_GS5, "20"],
		[Blockly.Msg.MUSIC_NOTE_G5, "19"],
		[Blockly.Msg.MUSIC_NOTE_F5, "17"],
		[Blockly.Msg.MUSIC_NOTE_EB5, "15"],
		[Blockly.Msg.MUSIC_NOTE_CS5, "13"],
		[Blockly.Msg.MUSIC_NOTE_C5, "12"],
		[Blockly.Msg.MUSIC_NOTE_BB4, "10"],
		[Blockly.Msg.MUSIC_NOTE_GS4, "8"],
		[Blockly.Msg.MUSIC_NOTE_G4, "7"],
		[Blockly.Msg.MUSIC_NOTE_F4, "5"],
		[Blockly.Msg.MUSIC_NOTE_EB4, "3"],
		[Blockly.Msg.MUSIC_NOTE_CS4, "1"],
		[Blockly.Msg.MUSIC_NOTE_C4, "0"]
	],
	[ // F# Major
		[Blockly.Msg.MUSIC_NOTE_B6, "35"],
		[Blockly.Msg.MUSIC_NOTE_BB6, "34"],
		[Blockly.Msg.MUSIC_NOTE_GS6, "32"],
		[Blockly.Msg.MUSIC_NOTE_FS6, "30"],
		[Blockly.Msg.MUSIC_NOTE_F6, "29"],
		[Blockly.Msg.MUSIC_NOTE_EB6, "27"],
		[Blockly.Msg.MUSIC_NOTE_CS6, "25"],
		[Blockly.Msg.MUSIC_NOTE_B5, "23"],
		[Blockly.Msg.MUSIC_NOTE_BB5, "22"],
		[Blockly.Msg.MUSIC_NOTE_GS5, "20"],
		[Blockly.Msg.MUSIC_NOTE_FS5, "18"],
		[Blockly.Msg.MUSIC_NOTE_F5, "17"],
		[Blockly.Msg.MUSIC_NOTE_EB5, "15"],
		[Blockly.Msg.MUSIC_NOTE_CS5, "13"],
		[Blockly.Msg.MUSIC_NOTE_B4, "11"],
		[Blockly.Msg.MUSIC_NOTE_BB4, "10"],
		[Blockly.Msg.MUSIC_NOTE_GS4, "8"],
		[Blockly.Msg.MUSIC_NOTE_FS4, "6"],
		[Blockly.Msg.MUSIC_NOTE_F4, "5"],
		[Blockly.Msg.MUSIC_NOTE_EB4, "3"],
		[Blockly.Msg.MUSIC_NOTE_CS4, "1"]
	],
	[ // F# Minor
		[Blockly.Msg.MUSIC_NOTE_B6, "35"],
		[Blockly.Msg.MUSIC_NOTE_A6, "33"],
		[Blockly.Msg.MUSIC_NOTE_GS6, "32"],
		[Blockly.Msg.MUSIC_NOTE_FS6, "30"],
		[Blockly.Msg.MUSIC_NOTE_E6, "28"],
		[Blockly.Msg.MUSIC_NOTE_D6, "26"],
		[Blockly.Msg.MUSIC_NOTE_CS6, "25"],
		[Blockly.Msg.MUSIC_NOTE_B5, "23"],
		[Blockly.Msg.MUSIC_NOTE_A5, "21"],
		[Blockly.Msg.MUSIC_NOTE_GS5, "20"],
		[Blockly.Msg.MUSIC_NOTE_FS5, "18"],
		[Blockly.Msg.MUSIC_NOTE_E5, "16"],
		[Blockly.Msg.MUSIC_NOTE_D5, "14"],
		[Blockly.Msg.MUSIC_NOTE_CS5, "13"],
		[Blockly.Msg.MUSIC_NOTE_B4, "11"],
		[Blockly.Msg.MUSIC_NOTE_A4, "9"],
		[Blockly.Msg.MUSIC_NOTE_GS4, "8"],
		[Blockly.Msg.MUSIC_NOTE_FS4, "6"],
		[Blockly.Msg.MUSIC_NOTE_E4, "4"],
		[Blockly.Msg.MUSIC_NOTE_D4, "2"],
		[Blockly.Msg.MUSIC_NOTE_CS4, "1"]
	],
	[ // G Major
		[Blockly.Msg.MUSIC_NOTE_C7, "36"],
		[Blockly.Msg.MUSIC_NOTE_B6, "35"],
		[Blockly.Msg.MUSIC_NOTE_A6, "33"],
		[Blockly.Msg.MUSIC_NOTE_G6, "31"],
		[Blockly.Msg.MUSIC_NOTE_FS6, "30"],
		[Blockly.Msg.MUSIC_NOTE_E6, "28"],
		[Blockly.Msg.MUSIC_NOTE_D6, "26"],
		[Blockly.Msg.MUSIC_NOTE_C6, "24"],
		[Blockly.Msg.MUSIC_NOTE_B5, "23"],
		[Blockly.Msg.MUSIC_NOTE_A5, "21"],
		[Blockly.Msg.MUSIC_NOTE_G5, "19"],
		[Blockly.Msg.MUSIC_NOTE_FS5, "18"],
		[Blockly.Msg.MUSIC_NOTE_E5, "16"],
		[Blockly.Msg.MUSIC_NOTE_D5, "14"],
		[Blockly.Msg.MUSIC_NOTE_C5, "12"],
		[Blockly.Msg.MUSIC_NOTE_B4, "11"],
		[Blockly.Msg.MUSIC_NOTE_A4, "9"],
		[Blockly.Msg.MUSIC_NOTE_G4, "7"],
		[Blockly.Msg.MUSIC_NOTE_FS4, "6"],
		[Blockly.Msg.MUSIC_NOTE_E4, "4"],
		[Blockly.Msg.MUSIC_NOTE_D4, "2"],
		[Blockly.Msg.MUSIC_NOTE_C4, "0"]
	],
	[ // G Minor
		[Blockly.Msg.MUSIC_NOTE_C7, "36"],
		[Blockly.Msg.MUSIC_NOTE_BB6, "34"],
		[Blockly.Msg.MUSIC_NOTE_A6, "33"],
		[Blockly.Msg.MUSIC_NOTE_G6, "31"],
		[Blockly.Msg.MUSIC_NOTE_F6, "29"],
		[Blockly.Msg.MUSIC_NOTE_EB6, "27"],
		[Blockly.Msg.MUSIC_NOTE_D6, "26"],
		[Blockly.Msg.MUSIC_NOTE_C6, "24"],
		[Blockly.Msg.MUSIC_NOTE_BB5, "22"],
		[Blockly.Msg.MUSIC_NOTE_A5, "21"],
		[Blockly.Msg.MUSIC_NOTE_G5, "19"],
		[Blockly.Msg.MUSIC_NOTE_F5, "17"],
		[Blockly.Msg.MUSIC_NOTE_EB5, "15"],
		[Blockly.Msg.MUSIC_NOTE_D5, "14"],
		[Blockly.Msg.MUSIC_NOTE_C5, "12"],
		[Blockly.Msg.MUSIC_NOTE_BB4, "10"],
		[Blockly.Msg.MUSIC_NOTE_A4, "9"],
		[Blockly.Msg.MUSIC_NOTE_G4, "7"],
		[Blockly.Msg.MUSIC_NOTE_F4, "5"],
		[Blockly.Msg.MUSIC_NOTE_EB4, "3"],
		[Blockly.Msg.MUSIC_NOTE_D4, "2"],
		[Blockly.Msg.MUSIC_NOTE_C4, "0"]
	],
	[ // G# Major
		[Blockly.Msg.MUSIC_NOTE_C7, "36"],
		[Blockly.Msg.MUSIC_NOTE_BB6, "34"],
		[Blockly.Msg.MUSIC_NOTE_GS6, "32"],
		[Blockly.Msg.MUSIC_NOTE_G6, "31"],
		[Blockly.Msg.MUSIC_NOTE_F6, "29"],
		[Blockly.Msg.MUSIC_NOTE_EB6, "27"],
		[Blockly.Msg.MUSIC_NOTE_CS6, "25"],
		[Blockly.Msg.MUSIC_NOTE_C6, "24"],
		[Blockly.Msg.MUSIC_NOTE_BB5, "22"],
		[Blockly.Msg.MUSIC_NOTE_GS5, "20"],
		[Blockly.Msg.MUSIC_NOTE_G5, "19"],
		[Blockly.Msg.MUSIC_NOTE_F5, "17"],
		[Blockly.Msg.MUSIC_NOTE_EB5, "15"],
		[Blockly.Msg.MUSIC_NOTE_CS5, "13"],
		[Blockly.Msg.MUSIC_NOTE_C5, "12"],
		[Blockly.Msg.MUSIC_NOTE_BB4, "10"],
		[Blockly.Msg.MUSIC_NOTE_GS4, "8"],
		[Blockly.Msg.MUSIC_NOTE_G4, "7"],
		[Blockly.Msg.MUSIC_NOTE_F4, "5"],
		[Blockly.Msg.MUSIC_NOTE_EB4, "3"],
		[Blockly.Msg.MUSIC_NOTE_CS4, "1"],
		[Blockly.Msg.MUSIC_NOTE_C4, "0"]
	],
	[ // G# Minor
		[Blockly.Msg.MUSIC_NOTE_B6, "35"],
		[Blockly.Msg.MUSIC_NOTE_BB6, "34"],
		[Blockly.Msg.MUSIC_NOTE_GS6, "32"],
		[Blockly.Msg.MUSIC_NOTE_FS6, "30"],
		[Blockly.Msg.MUSIC_NOTE_E6, "28"],
		[Blockly.Msg.MUSIC_NOTE_EB6, "27"],
		[Blockly.Msg.MUSIC_NOTE_CS6, "25"],
		[Blockly.Msg.MUSIC_NOTE_B5, "23"],
		[Blockly.Msg.MUSIC_NOTE_BB5, "22"],
		[Blockly.Msg.MUSIC_NOTE_GS5, "20"],
		[Blockly.Msg.MUSIC_NOTE_FS5, "18"],
		[Blockly.Msg.MUSIC_NOTE_E5, "16"],
		[Blockly.Msg.MUSIC_NOTE_EB5, "15"],
		[Blockly.Msg.MUSIC_NOTE_CS5, "13"],
		[Blockly.Msg.MUSIC_NOTE_B4, "11"],
		[Blockly.Msg.MUSIC_NOTE_BB4, "10"],
		[Blockly.Msg.MUSIC_NOTE_GS4, "8"],
		[Blockly.Msg.MUSIC_NOTE_FS4, "6"],
		[Blockly.Msg.MUSIC_NOTE_E4, "4"],
		[Blockly.Msg.MUSIC_NOTE_EB4, "3"],
		[Blockly.Msg.MUSIC_NOTE_CS4, "1"]
	],
	[ // A Major
		[Blockly.Msg.MUSIC_NOTE_B6, "35"],
		[Blockly.Msg.MUSIC_NOTE_A6, "33"],
		[Blockly.Msg.MUSIC_NOTE_GS6, "32"],
		[Blockly.Msg.MUSIC_NOTE_FS6, "30"],
		[Blockly.Msg.MUSIC_NOTE_E6, "28"],
		[Blockly.Msg.MUSIC_NOTE_D6, "26"],
		[Blockly.Msg.MUSIC_NOTE_CS6, "25"],
		[Blockly.Msg.MUSIC_NOTE_B5, "23"],
		[Blockly.Msg.MUSIC_NOTE_A5, "21"],
		[Blockly.Msg.MUSIC_NOTE_GS5, "20"],
		[Blockly.Msg.MUSIC_NOTE_FS5, "18"],
		[Blockly.Msg.MUSIC_NOTE_E5, "16"],
		[Blockly.Msg.MUSIC_NOTE_D5, "14"],
		[Blockly.Msg.MUSIC_NOTE_CS5, "13"],
		[Blockly.Msg.MUSIC_NOTE_B4, "11"],
		[Blockly.Msg.MUSIC_NOTE_A4, "9"],
		[Blockly.Msg.MUSIC_NOTE_GS4, "8"],
		[Blockly.Msg.MUSIC_NOTE_FS4, "6"],
		[Blockly.Msg.MUSIC_NOTE_E4, "4"],
		[Blockly.Msg.MUSIC_NOTE_D4, "2"],
		[Blockly.Msg.MUSIC_NOTE_CS4, "1"]
	],
	[ // A Minor
		[Blockly.Msg.MUSIC_NOTE_C7, "36"],
		[Blockly.Msg.MUSIC_NOTE_B6, "35"],
		[Blockly.Msg.MUSIC_NOTE_A6, "33"],
		[Blockly.Msg.MUSIC_NOTE_G6, "31"],
		[Blockly.Msg.MUSIC_NOTE_F6, "29"],
		[Blockly.Msg.MUSIC_NOTE_E6, "28"],
		[Blockly.Msg.MUSIC_NOTE_D6, "26"],
		[Blockly.Msg.MUSIC_NOTE_C6, "24"],
		[Blockly.Msg.MUSIC_NOTE_B5, "23"],
		[Blockly.Msg.MUSIC_NOTE_A5, "21"],
		[Blockly.Msg.MUSIC_NOTE_G5, "19"],
		[Blockly.Msg.MUSIC_NOTE_F5, "17"],
		[Blockly.Msg.MUSIC_NOTE_E5, "16"],
		[Blockly.Msg.MUSIC_NOTE_D5, "14"],
		[Blockly.Msg.MUSIC_NOTE_C5, "12"],
		[Blockly.Msg.MUSIC_NOTE_B4, "11"],
		[Blockly.Msg.MUSIC_NOTE_A4, "9"],
		[Blockly.Msg.MUSIC_NOTE_G4, "7"],
		[Blockly.Msg.MUSIC_NOTE_F4, "5"],
		[Blockly.Msg.MUSIC_NOTE_E4, "4"],
		[Blockly.Msg.MUSIC_NOTE_D4, "2"],
		[Blockly.Msg.MUSIC_NOTE_C4, "0"]
	],
	[ // Bb Major
		[Blockly.Msg.MUSIC_NOTE_C7, "36"],
		[Blockly.Msg.MUSIC_NOTE_BB6, "34"],
		[Blockly.Msg.MUSIC_NOTE_A6, "33"],
		[Blockly.Msg.MUSIC_NOTE_G6, "31"],
		[Blockly.Msg.MUSIC_NOTE_F6, "29"],
		[Blockly.Msg.MUSIC_NOTE_EB6, "27"],
		[Blockly.Msg.MUSIC_NOTE_D6, "26"],
		[Blockly.Msg.MUSIC_NOTE_C6, "24"],
		[Blockly.Msg.MUSIC_NOTE_BB5, "22"],
		[Blockly.Msg.MUSIC_NOTE_A5, "21"],
		[Blockly.Msg.MUSIC_NOTE_G5, "19"],
		[Blockly.Msg.MUSIC_NOTE_F5, "17"],
		[Blockly.Msg.MUSIC_NOTE_EB5, "15"],
		[Blockly.Msg.MUSIC_NOTE_D5, "14"],
		[Blockly.Msg.MUSIC_NOTE_C5, "12"],
		[Blockly.Msg.MUSIC_NOTE_BB4, "10"],
		[Blockly.Msg.MUSIC_NOTE_A4, "9"],
		[Blockly.Msg.MUSIC_NOTE_G4, "7"],
		[Blockly.Msg.MUSIC_NOTE_F4, "5"],
		[Blockly.Msg.MUSIC_NOTE_EB4, "3"],
		[Blockly.Msg.MUSIC_NOTE_D4, "2"],
		[Blockly.Msg.MUSIC_NOTE_C4, "0"]
	],
	[ // Bb Minor
		[Blockly.Msg.MUSIC_NOTE_C7, "36"],
		[Blockly.Msg.MUSIC_NOTE_BB6, "34"],
		[Blockly.Msg.MUSIC_NOTE_GS6, "32"],
		[Blockly.Msg.MUSIC_NOTE_FS6, "30"],
		[Blockly.Msg.MUSIC_NOTE_F6, "29"],
		[Blockly.Msg.MUSIC_NOTE_EB6, "27"],
		[Blockly.Msg.MUSIC_NOTE_CS6, "25"],
		[Blockly.Msg.MUSIC_NOTE_C6, "24"],
		[Blockly.Msg.MUSIC_NOTE_BB5, "22"],
		[Blockly.Msg.MUSIC_NOTE_GS5, "20"],
		[Blockly.Msg.MUSIC_NOTE_FS5, "18"],
		[Blockly.Msg.MUSIC_NOTE_F5, "17"],
		[Blockly.Msg.MUSIC_NOTE_EB5, "15"],
		[Blockly.Msg.MUSIC_NOTE_CS5, "13"],
		[Blockly.Msg.MUSIC_NOTE_C5, "12"],
		[Blockly.Msg.MUSIC_NOTE_BB4, "10"],
		[Blockly.Msg.MUSIC_NOTE_GS4, "8"],
		[Blockly.Msg.MUSIC_NOTE_FS4, "6"],
		[Blockly.Msg.MUSIC_NOTE_F4, "5"],
		[Blockly.Msg.MUSIC_NOTE_EB4, "3"],
		[Blockly.Msg.MUSIC_NOTE_CS4, "1"],
		[Blockly.Msg.MUSIC_NOTE_C4, "0"]
	],
	[ // B Major
		[Blockly.Msg.MUSIC_NOTE_B6, "35"],
		[Blockly.Msg.MUSIC_NOTE_BB6, "34"],
		[Blockly.Msg.MUSIC_NOTE_GS6, "32"],
		[Blockly.Msg.MUSIC_NOTE_FS6, "30"],
		[Blockly.Msg.MUSIC_NOTE_E6, "28"],
		[Blockly.Msg.MUSIC_NOTE_EB6, "27"],
		[Blockly.Msg.MUSIC_NOTE_CS6, "25"],
		[Blockly.Msg.MUSIC_NOTE_B5, "23"],
		[Blockly.Msg.MUSIC_NOTE_BB5, "22"],
		[Blockly.Msg.MUSIC_NOTE_GS5, "20"],
		[Blockly.Msg.MUSIC_NOTE_FS5, "18"],
		[Blockly.Msg.MUSIC_NOTE_E5, "16"],
		[Blockly.Msg.MUSIC_NOTE_EB5, "15"],
		[Blockly.Msg.MUSIC_NOTE_CS5, "13"],
		[Blockly.Msg.MUSIC_NOTE_B4, "11"],
		[Blockly.Msg.MUSIC_NOTE_BB4, "10"],
		[Blockly.Msg.MUSIC_NOTE_GS4, "8"],
		[Blockly.Msg.MUSIC_NOTE_FS4, "6"],
		[Blockly.Msg.MUSIC_NOTE_E4, "4"],
		[Blockly.Msg.MUSIC_NOTE_EB4, "3"],
		[Blockly.Msg.MUSIC_NOTE_CS4, "1"]
	],
	[ // B Minor
		[Blockly.Msg.MUSIC_NOTE_B6, "35"],
		[Blockly.Msg.MUSIC_NOTE_A6, "33"],
		[Blockly.Msg.MUSIC_NOTE_G6, "31"],
		[Blockly.Msg.MUSIC_NOTE_FS6, "30"],
		[Blockly.Msg.MUSIC_NOTE_E6, "28"],
		[Blockly.Msg.MUSIC_NOTE_D6, "26"],
		[Blockly.Msg.MUSIC_NOTE_CS6, "25"],
		[Blockly.Msg.MUSIC_NOTE_B5, "23"],
		[Blockly.Msg.MUSIC_NOTE_A5, "21"],
		[Blockly.Msg.MUSIC_NOTE_G5, "19"],
		[Blockly.Msg.MUSIC_NOTE_FS5, "18"],
		[Blockly.Msg.MUSIC_NOTE_E5, "16"],
		[Blockly.Msg.MUSIC_NOTE_D5, "14"],
		[Blockly.Msg.MUSIC_NOTE_CS5, "13"],
		[Blockly.Msg.MUSIC_NOTE_B4, "11"],
		[Blockly.Msg.MUSIC_NOTE_A4, "9"],
		[Blockly.Msg.MUSIC_NOTE_G4, "7"],
		[Blockly.Msg.MUSIC_NOTE_FS4, "6"],
		[Blockly.Msg.MUSIC_NOTE_E4, "4"],
		[Blockly.Msg.MUSIC_NOTE_D4, "2"],
		[Blockly.Msg.MUSIC_NOTE_CS4, "1"]
	]
];

Blockly.Blocks["music_scale"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldImage("/icons/buzzer.png", 20, 20, "*"))
			.appendField(Blockly.Msg.MUSIC_SCALE_TITLE)
			.appendField(new Blockly.FieldDropdown([
				[Blockly.Msg.MUSIC_SCALE_CMAJ, "0"],
				[Blockly.Msg.MUSIC_SCALE_CMIN, "1"],
				[Blockly.Msg.MUSIC_SCALE_CSMAJ, "2"],
				[Blockly.Msg.MUSIC_SCALE_CSMIN, "3"],
				[Blockly.Msg.MUSIC_SCALE_DMAJ, "4"],
				[Blockly.Msg.MUSIC_SCALE_DMIN, "5"],
				[Blockly.Msg.MUSIC_SCALE_EBMAJ, "6"],
				[Blockly.Msg.MUSIC_SCALE_EBMIN, "7"],
				[Blockly.Msg.MUSIC_SCALE_EMAJ, "8"],
				[Blockly.Msg.MUSIC_SCALE_EMIN, "9"],
				[Blockly.Msg.MUSIC_SCALE_FMAJ, "10"],
				[Blockly.Msg.MUSIC_SCALE_FMIN, "11"],
				[Blockly.Msg.MUSIC_SCALE_FSMAJ, "12"],
				[Blockly.Msg.MUSIC_SCALE_FSMIN, "13"],
				[Blockly.Msg.MUSIC_SCALE_GMAJ, "14"],
				[Blockly.Msg.MUSIC_SCALE_GMIN, "15"],
				[Blockly.Msg.MUSIC_SCALE_GSMAJ, "16"],
				[Blockly.Msg.MUSIC_SCALE_GSMIN, "17"],
				[Blockly.Msg.MUSIC_SCALE_AMAJ, "18"],
				[Blockly.Msg.MUSIC_SCALE_AMIN, "19"],
				[Blockly.Msg.MUSIC_SCALE_BBMAJ, "20"],
				[Blockly.Msg.MUSIC_SCALE_BBMIN, "21"],
				[Blockly.Msg.MUSIC_SCALE_BMAJ, "22"],
				[Blockly.Msg.MUSIC_SCALE_BMIN, "23"]
			], function(selectedIndex) {
				this.sourceBlock_.inputList[1].fieldRow[1].menuGenerator_ = Blockly.Blocks["music_scale_opt"][selectedIndex];
				this.sourceBlock_.inputList[1].fieldRow[1].setValue(Blockly.Blocks["music_scale_opt"][selectedIndex][0][1]);
				return selectedIndex;
			}), 'SCALE');

		//https://developers.google.com/blockly/guides/create-custom-blocks/dropdown-menus#dynamic_menu
		this.appendDummyInput()
			.appendField(Blockly.Msg.MUSIC_NOTE_TITLE)
			.appendField(new Blockly.FieldDropdown(function() {
				try {
					if ((typeof(this.sourceBlock_) != "undefined") && (typeof(this.sourceBlock_.inputList) != "undefined")) {
						var scale_dropdown = this.sourceBlock_.inputList[0].fieldRow[2];
						return Blockly.Blocks["music_scale_opt"][scale_dropdown.value_];
					}
				} catch (e) {

				}
				// default
				return Blockly.Blocks["music_scale_opt"][0];
			}), 'NOTE');

		this.appendDummyInput()
			.appendField(Blockly.Msg.MUSIC_NOTE_DURATION)
			.appendField(new Blockly.FieldDropdown(
				Blockly.Blocks["music_duration_opt"]
			), 'DURATION');
		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(music_colour);
		this.setTooltip(Blockly.Msg.MUSIC_SCALE_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.MUSIC_SCALE_HELPURL);
	}
};

Blockly.Blocks["music_set_volume"] = {
	init: function() {
		// music volume 0 - 100 %
		this.appendDummyInput()
			.appendField(new Blockly.FieldImage("/icons/buzzer.png", 20, 20, "*"))
			.appendField(Blockly.Msg.MUSIC_SET_VOLUME_TITLE)
			.appendField(new Blockly.FieldNumber(50, 0, 100, 1), 'VALUE')
			.appendField("%");
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(music_colour);
		this.setTooltip(Blockly.Msg.MUSIC_SET_VOLUME_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.MUSIC_SET_VOLUME_HELPURL);
	}
};

Blockly.Blocks["music_get_volume"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldImage("/icons/buzzer.png", 20, 20, "*"))
			.appendField(Blockly.Msg.MUSIC_GET_VOLUME_TITLE);
		this.setOutput(true, 'Number');
		this.setPreviousStatement(false);
		this.setNextStatement(false);
		this.setColour(music_colour);
		this.setTooltip(Blockly.Msg.MUSIC_GET_VOLUME_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.MUSIC_GET_VOLUME_HELPURL);
	}
};

// =============================================================================
// sensor
// =============================================================================
var sensor_colour= Blockly.Msg.SENSOR_HUE ;
// var sensor_colour="#CAC745";
Blockly.Blocks["sensor_lm73"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldImage("/icons/sot23-6_1.png", 20, 20, "*"))
			.appendField(Blockly.Msg.SENSOR_LM73_TITLE);
		this.setOutput(true, 'Number');
		this.setPreviousStatement(false);
		this.setNextStatement(false);
		this.setColour(sensor_colour);
		this.setTooltip(Blockly.Msg.SENSOR_LM73_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.SENSOR_LM73_HELPURL);
	}
};

Blockly.Blocks["sensor_ldr"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldImage("/icons/ldr1.png", 20, 20, "*"))
			.appendField(Blockly.Msg.SENSOR_LDR_TITLE);
		this.setOutput(true, 'Number');
		this.setPreviousStatement(false);
		this.setNextStatement(false);
		this.setColour(sensor_colour);
		this.setTooltip(Blockly.Msg.SENSOR_LDR_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.SENSOR_LDR_HELPURL);
	}
};

Blockly.Blocks["sensor_switch1"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldImage("/icons/sw12x12.png", 20, 20, "*"))
			.appendField(Blockly.Msg.SENSOR_SWITCH1_TITLE);
		this.setOutput(true, 'Number');
		this.setPreviousStatement(false);
		this.setNextStatement(false);
		this.setColour(sensor_colour);
		this.setTooltip(Blockly.Msg.SENSOR_SWITCH1_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.SENSOR_SWITCH1_HELPURL);
	}
};

Blockly.Blocks["sensor_switch2"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldImage("/icons/sw12x12.png", 20, 20, "*"))
			.appendField(Blockly.Msg.SENSOR_SWITCH2_TITLE);
		this.setOutput(true, 'Number');
		this.setPreviousStatement(false);
		this.setNextStatement(false);
		this.setColour(sensor_colour);
		this.setTooltip(Blockly.Msg.SENSOR_SWITCH2_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.SENSOR_SWITCH2_HELPURL);
	}
};

// =============================================================================
// rtc
// =============================================================================
var rtc_colour =Blockly.Msg.RTC_HUE;
// var rtc_colour = "#F38C5D";
Blockly.Blocks["rtc_get"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(Blockly.Msg.RTC_GET_TITLE);
		this.setOutput(true, 'String');
		this.setPreviousStatement(false);
		this.setNextStatement(false);
		this.setColour(rtc_colour);
		this.setTooltip(Blockly.Msg.RTC_GET_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.RTC_GET_HELPURL);
	}
};

Blockly.Blocks["rtc_get_date"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(Blockly.Msg.RTC_GETDATE_TITLE);
		this.setOutput(true, 'String');
		this.setPreviousStatement(false);
		this.setNextStatement(false);
		this.setColour(rtc_colour);
		this.setTooltip(Blockly.Msg.RTC_GETDATE_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.RTC_GETDATE_HELPURL);
	}
};

Blockly.Blocks["rtc_get_time"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(Blockly.Msg.RTC_GETTIME_TITLE);
		this.setOutput(true, 'String');
		this.setPreviousStatement(false);
		this.setNextStatement(false);
		this.setColour(rtc_colour);
		this.setTooltip(Blockly.Msg.RTC_GETTIME_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.RTC_GETTIME_HELPURL);
	}
};

Blockly.Blocks["rtc_get_year"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(Blockly.Msg.RTC_GETYEAR_TITLE);
		this.setOutput(true, 'Number');
		this.setPreviousStatement(false);
		this.setNextStatement(false);
		this.setColour(rtc_colour);
		this.setTooltip(Blockly.Msg.RTC_GETYEAR_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.RTC_GETYEAR_HELPURL);
	}
};

Blockly.Blocks["rtc_get_month"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(Blockly.Msg.RTC_GETMONTH_TITLE);
		this.setOutput(true, 'Number');
		this.setPreviousStatement(false);
		this.setNextStatement(false);
		this.setColour(rtc_colour);
		this.setTooltip(Blockly.Msg.RTC_GETMONTH_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.RTC_GETMONTH_HELPURL);
	}
};

Blockly.Blocks["rtc_get_day"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(Blockly.Msg.RTC_GETDAY_TITLE);
		this.setOutput(true, 'Number');
		this.setPreviousStatement(false);
		this.setNextStatement(false);
		this.setColour(rtc_colour);
		this.setTooltip(Blockly.Msg.RTC_GETDAY_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.RTC_GETDAY_HELPURL);
	}
};

Blockly.Blocks["rtc_get_hour"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(Blockly.Msg.RTC_GETHOUR_TITLE);
		this.setOutput(true, 'Number');
		this.setPreviousStatement(false);
		this.setNextStatement(false);
		this.setColour(rtc_colour);
		this.setTooltip(Blockly.Msg.RTC_GETHOUR_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.RTC_GETHOUR_HELPURL);
	}
};

Blockly.Blocks["rtc_get_minute"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(Blockly.Msg.RTC_GETMINUTE_TITLE);
		this.setOutput(true, 'Number');
		this.setPreviousStatement(false);
		this.setNextStatement(false);
		this.setColour(rtc_colour);
		this.setTooltip(Blockly.Msg.RTC_GETMINUTE_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.RTC_GETMINUTE_HELPURL);
	}
};

Blockly.Blocks["rtc_get_second"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(Blockly.Msg.RTC_GETSECOND_TITLE);
		this.setOutput(true, 'Number');
		this.setPreviousStatement(false);
		this.setNextStatement(false);
		this.setColour(rtc_colour);
		this.setTooltip(Blockly.Msg.RTC_GETSECOND_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.RTC_GETSECOND_HELPURL);
	}
};

// =============================================================================
// comm
// =============================================================================
/*Blockly.Blocks["comm_uart_write"] = {
	init: function() {
		this.jsonInit({
			"type": "comm_uart_write",
			"message0": Blockly.Msg.COMM_UART_WRITE_TITLE + "%1",
			"args0": [{
				"type": "input_value",
				"name": "VALUE"
			}],
			"previousStatement": null,
			"nextStatement": null,
			"colour": 19,
			"tooltip": Blockly.Msg.COMM_UART_WRITE_TOOLTIP,
			"helpUrl": Blockly.Msg.COMM_UART_WRITE_HELPURL
		});
	}
};

Blockly.Blocks["comm_uart_writeln"] = {
	init: function() {
		this.jsonInit({
			"type": "comm_uart_writeln",
			"message0": Blockly.Msg.COMM_UART_WRITELN_TITLE + "%1",
			"args0": [{
				"type": "input_value",
				"name": "VALUE"
			}],
			"previousStatement": null,
			"nextStatement": null,
			"colour": 19,
			"tooltip": Blockly.Msg.COMM_UART_WRITELN_TOOLTIP,
			"helpUrl": Blockly.Msg.COMM_UART_WRITELN_HELPURL
		});
	}
};*/

// =============================================================================
// I/O
// =============================================================================
var io_colour = Blockly.Msg.IO_HUE;
// var io_colour = "#F66563";
Blockly.Blocks["output_write"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldImage("/icons/banana.png", 20, 20, "*"))
			.appendField(Blockly.Msg.OUTPUT_WRITE_TITLE)
			.appendField(new Blockly.FieldDropdown([
				["1", "1"],
				["2", "2"]
			]), 'OUTPUT')
			.appendField(Blockly.Msg.STATUS)
			.appendField(new Blockly.FieldDropdown([
				[Blockly.Msg.STATUS_OFF, "0"],
				[Blockly.Msg.STATUS_ON, "1"]
			]), 'STATUS');
		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(io_colour);
		this.setTooltip(Blockly.Msg.OUTPUT_WRITE_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.OUTPUT_WRITE_HELPURL);
	}
};

Blockly.Blocks["output_toggle"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldImage("/icons/banana.png", 20, 20, "*"))
			.appendField(Blockly.Msg.OUTPUT_TOGGLE_TITLE)
			.appendField(new Blockly.FieldDropdown([
				["1", "1"],
				["2", "2"]
			]), 'OUTPUT')
			.appendField(Blockly.Msg.STATUS);
		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(io_colour);
		this.setTooltip(Blockly.Msg.OUTPUT_TOGGLE_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.OUTPUT_TOGGLE_HELPURL);
	}
};

Blockly.Blocks["output_read"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldImage("/icons/banana.png", 20, 20, "*"))
			.appendField(Blockly.Msg.OUTPUT_READ_TITLE)
			.appendField(new Blockly.FieldDropdown([
				["1", "1"],
				["2", "2"]
			]), 'OUTPUT');
		this.setOutput(true, 'Number');
		this.setInputsInline(true);
		this.setPreviousStatement(null);
		this.setNextStatement(null);
		this.setColour(io_colour);
		this.setTooltip(Blockly.Msg.OUTPUT_READ_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.OUTPUT_READ_HELPURL);
	}
};

Blockly.Blocks["usbsw_write"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldImage("/icons/usb_con.png", 20, 20, "*"))
			.appendField(Blockly.Msg.USBSW_WRITE_TITLE)
			.appendField(Blockly.Msg.USBSW_WRITE_STATUS)
			.appendField(new Blockly.FieldDropdown([
				[Blockly.Msg.STATUS_OFF, "0"],
				[Blockly.Msg.STATUS_ON, "1"]
			]), 'STATUS');
		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(io_colour);
		this.setTooltip(Blockly.Msg.USBSW_WRITE_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.USBSW_WRITE_HELPURL);
	}
};

Blockly.Blocks["usbsw_toggle"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldImage("/icons/usb_con.png", 20, 20, "*"))
			.appendField(Blockly.Msg.USBSW_TOGGLE_TITLE);
		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(io_colour);
		this.setTooltip(Blockly.Msg.USBSW_TOGGLE_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.USBSW_TOGGLE_HELPURL);
	}
};

Blockly.Blocks["usbsw_read"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldImage("/icons/usb_con.png", 20, 20, "*"))
			.appendField(Blockly.Msg.USBSW_READ_TITLE);
		this.setOutput(true, 'Number');
		this.setInputsInline(true);
		this.setPreviousStatement(null);
		this.setNextStatement(null);
		this.setColour(io_colour);
		this.setTooltip(Blockly.Msg.USBSW_READ_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.USBSW_READ_HELPURL);
	}
};

Blockly.Blocks["input_read"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldImage("/icons/banana.png", 20, 20, "*"))
			.appendField(Blockly.Msg.INPUT_READ_TITLE)
			.appendField(new Blockly.FieldDropdown([
				["1", "1"],
				["2", "2"],
				["3", "3"],
				["4", "4"]
			]), 'INPUT');
		this.setOutput(true, 'Number');
		this.setInputsInline(true);
		this.setPreviousStatement(null);
		this.setNextStatement(null);
		this.setColour(io_colour);
		this.setTooltip(Blockly.Msg.INPUT_READ_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.INPUT_READ_HELPURL);
	}
};

// =============================================================================
// number to string
// =============================================================================
Blockly.Blocks['number-to-str'] = {
  init: function() {
    this.appendValueInput("number-to-str")
        .setCheck("Number")
        .appendField(Blockly.Msg.tostring_TEXT_TITLE);
    this.setOutput(true, "String");
    this.setColour(230);
 this.setTooltip(Blockly.Msg.tostring_TEXT_TOOLTIP);
 this.setHelpUrl(Blockly.Msg.tostring_TEXT_HELPURL);
  }
};

// =============================================================================
// Advanced Math
// =============================================================================
Blockly.Blocks['mathplus_acos'] = {
	init: function() {
		this.appendValueInput("x")
			.setCheck("Number")
			.appendField("acos");
		this.setInputsInline(false);
		this.setOutput(true, "Number");
		this.setColour(230);
		this.setTooltip("Returns the arc cosine of x in radians.");
		this.setHelpUrl("");
	}
};

Blockly.Blocks['mathplus_asin'] = {
	init: function() {
		this.appendValueInput("x")
			.setCheck("Number")
			.appendField("asin");
		this.setInputsInline(false);
		this.setOutput(true, "Number");
		this.setColour(230);
		this.setTooltip("Returns the arc sine of x in radians.");
		this.setHelpUrl("");
	}
};

Blockly.Blocks['mathplus_atan'] = {
	init: function() {
		this.appendValueInput("x")
			.setCheck("Number")
			.appendField("atan");
		this.setInputsInline(false);
		this.setOutput(true, "Number");
		this.setColour(230);
		this.setTooltip("Returns the arc tangent of x in radians.");
		this.setHelpUrl("");
	}
};

Blockly.Blocks['mathplus_atan2'] = {
	init: function() {
		this.appendValueInput("x")
			.setCheck("Number")
			.appendField("atan2");
		this.appendValueInput("y")
			.setCheck("Number")
			.appendField(",");
		this.setInputsInline(true);
		this.setOutput(true, "Number");
		this.setColour(230);
		this.setTooltip("Returns the arc tangent in radians of y/x based on the signs of both values to determine the correct quadrant.");
		this.setHelpUrl("");
	}
};

Blockly.Blocks['mathplus_cos'] = {
	init: function() {
		this.appendValueInput("x")
			.setCheck("Number")
			.appendField("cos");
		this.setInputsInline(false);
		this.setOutput(true, "Number");
		this.setColour(230);
		this.setTooltip("Returns the cosine of a radian angle x.");
		this.setHelpUrl("");
	}
};

Blockly.Blocks['mathplus_cosh'] = {
	init: function() {
		this.appendValueInput("x")
			.setCheck("Number")
			.appendField("cosh");
		this.setInputsInline(false);
		this.setOutput(true, "Number");
		this.setColour(230);
		this.setTooltip("Returns the hyperbolic cosine of x.");
		this.setHelpUrl("");
	}
};

Blockly.Blocks['mathplus_sin'] = {
	init: function() {
		this.appendValueInput("x")
			.setCheck("Number")
			.appendField("sin");
		this.setInputsInline(false);
		this.setOutput(true, "Number");
		this.setColour(230);
		this.setTooltip("Returns the sine of a radian angle x.");
		this.setHelpUrl("");
	}
};

Blockly.Blocks['mathplus_sinh'] = {
	init: function() {
		this.appendValueInput("x")
			.setCheck("Number")
			.appendField("sinh");
		this.setInputsInline(false);
		this.setOutput(true, "Number");
		this.setColour(230);
		this.setTooltip("Returns the hyperbolic sine of x.");
		this.setHelpUrl("");
	}
};

Blockly.Blocks['mathplus_tan'] = {
	init: function() {
		this.appendValueInput("x")
			.setCheck("Number")
			.appendField("tan");
		this.setInputsInline(false);
		this.setOutput(true, "Number");
		this.setColour(230);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};

Blockly.Blocks['mathplus_tanh'] = {
	init: function() {
		this.appendValueInput("x")
			.setCheck("Number")
			.appendField("tanh");
		this.setInputsInline(false);
		this.setOutput(true, "Number");
		this.setColour(230);
		this.setTooltip("Returns the hyperbolic tangent of x.");
		this.setHelpUrl("");
	}
};

Blockly.Blocks['mathplus_exp'] = {
	init: function() {
		this.appendValueInput("x")
			.setCheck("Number")
			.appendField("exp");
		this.setInputsInline(false);
		this.setOutput(true, "Number");
		this.setColour(230);
		this.setTooltip("Returns the value of e raised to the xth power.");
		this.setHelpUrl("");
	}
};

/*
Blockly.Blocks['mathplus_frexp'] = {
	init: function() {
		this.appendValueInput("x")
			.setCheck("Number")
			.appendField("frexp");
		this.setInputsInline(false);
		this.setOutput(true, "Number");
		this.setColour(230);
		this.setTooltip("The returned value is the mantissa and the integer pointed to by exponent is the exponent. The resultant value is x = mantissa * 2 ^ exponent.");
		this.setHelpUrl("");
	}
};
*/

Blockly.Blocks['mathplus_ldexp'] = {
	init: function() {
		this.appendValueInput("x")
			.setCheck("Number")
			.appendField("ldexp");
		this.appendValueInput("y")
			.setCheck("Number")
			.appendField(",");
		this.setInputsInline(true);
		this.setOutput(true, "Number");
		this.setColour(230);
		this.setTooltip("Returns x multiplied by 2 raised to the power of exponent.");
		this.setHelpUrl("");
	}
};

Blockly.Blocks['mathplus_log'] = {
	init: function() {
		this.appendValueInput("x")
			.setCheck("Number")
			.appendField("log");
		this.setInputsInline(false);
		this.setOutput(true, "Number");
		this.setColour(230);
		this.setTooltip("Returns the natural logarithm (base-e logarithm) of x.");
		this.setHelpUrl("");
	}
};

Blockly.Blocks['mathplus_log10'] = {
	init: function() {
		this.appendValueInput("x")
			.setCheck("Number")
			.appendField("log10");
		this.setInputsInline(false);
		this.setOutput(true, "Number");
		this.setColour(230);
		this.setTooltip("Returns the common logarithm (base-10 logarithm) of x.");
		this.setHelpUrl("");
	}
};

Blockly.Blocks['mathplus_pow'] = {
	init: function() {
		this.appendValueInput("x")
			.setCheck("Number")
			.appendField("pow");
		this.appendValueInput("y")
			.setCheck("Number")
			.appendField(",");
		this.setInputsInline(true);
		this.setOutput(true, "Number");
		this.setColour(230);
		this.setTooltip("Returns x raised to the power of y.");
		this.setHelpUrl("");
	}
};

Blockly.Blocks['mathplus_sqrt'] = {
	init: function() {
		this.appendValueInput("x")
			.setCheck("Number")
			.appendField("sqrt");
		this.setInputsInline(false);
		this.setOutput(true, "Number");
		this.setColour(230);
		this.setTooltip("Returns the square root of x.");
		this.setHelpUrl("");
	}
};

Blockly.Blocks['mathplus_ceil'] = {
	init: function() {
		this.appendValueInput("x")
			.setCheck("Number")
			.appendField("ceil");
		this.setInputsInline(false);
		this.setOutput(true, "Number");
		this.setColour(230);
		this.setTooltip("Returns the smallest integer value greater than or equal to x.");
		this.setHelpUrl("");
	}
};

Blockly.Blocks['mathplus_fabs'] = {
	init: function() {
		this.appendValueInput("x")
			.setCheck("Number")
			.appendField("fabs");
		this.setInputsInline(false);
		this.setOutput(true, "Number");
		this.setColour(230);
		this.setTooltip("Returns the absolute value of x.");
		this.setHelpUrl("");
	}
};

Blockly.Blocks['mathplus_floor'] = {
	init: function() {
		this.appendValueInput("x")
			.setCheck("Number")
			.appendField("floor");
		this.setInputsInline(false);
		this.setOutput(true, "Number");
		this.setColour(230);
		this.setTooltip("Returns the largest integer value less than or equal to x.");
		this.setHelpUrl("");
	}
};

Blockly.Blocks['mathplus_fmod'] = {
	init: function() {
		this.appendValueInput("x")
			.setCheck("Number")
			.appendField("fmod");
		this.appendValueInput("y")
			.setCheck("Number")
			.appendField(",");
		this.setInputsInline(true);
		this.setOutput(true, "Number");
		this.setColour(230);
		this.setTooltip("Returns the remainder of x divided by y.");
		this.setHelpUrl("");
	}
};

// =============================================================================
// advance
// =============================================================================
var advance_colour = Blockly.Msg.ADVANCE_HUE;
Blockly.Blocks["advance_task"] = {
	init: function() {
		this.jsonInit({
			"type": "advance_task",
			"message0": "%1 %2 %3",
			"args0": [{
				"type": "field_input",
				"name": "NAME",
				"text": Blockly.Msg.ADVANCE_TASK_TITLE
			}, {
				"type": "input_dummy"
			}, {
				"type": "input_statement",
				"name": "STACK"
			}],
			"inputsInline": false,
			// "colour": Blockly.Msg.ADVANCE_HUE,
			"colour": Blockly.Msg.ADVANCE_HUE,
			"tooltip": Blockly.Msg.ADVANCE_TASK_TOOLTIP,
			"helpUrl": Blockly.Msg.ADVANCE_TASK_HELPURL
		});
	}
};



/*Blockly.Blocks["advance_current_drain_write"] = {
	init: function() {
		this.jsonInit({
			"type": "advance_current_drain_write",
			"message0": Blockly.Msg.ADVANCE_CURRENT_DRAIN_WRITE_TITLE + "%1",
			"args0": [{
				"type": "field_dropdown",
				"name": "STATUS",
				"options": [
					[Blockly.Msg.STATUS_OFF, "0"],
					[Blockly.Msg.STATUS_ON, "1"]
				]
			}],
			"previousStatement": null,
			"nextStatement": null,
			"colour": 290,
			"tooltip": Blockly.Msg.ADVANCE_CURRENT_DRAIN_WRITE_TOOLTIP,
			"helpUrl": Blockly.Msg.ADVANCE_CURRENT_DRAIN_WRITE_HELPURL
		});
	}
};*/

Blockly.Blocks["rtc_cal"] = {
	init: function() {
		this.jsonInit({
			"type": "rtc_cal",
			"message0": Blockly.Msg.RTC_CAL_TITLE + "%1",
			"args0": [{
				"type": "field_input",
				"name": "VALUE",
				"text": "0"
				/* for android
			"type": "field_number",
			"name": "VALUE",
			"value": 0,
			"min": 0.1,
			"max": 100,
			"precision": 0.1
			*/
			}],
			"previousStatement": null,
			"nextStatement": null,
			"colour": 290,
			"tooltip": Blockly.Msg.RTC_CAL_TOOLTIP,
			"helpUrl": Blockly.Msg.RTC_CAL_HELPURL
		});
	}
};

Blockly.Blocks["rtc_cal_coarse"] = {
	init: function() {
		this.jsonInit({
			"type": "rtc_cal_coarse",
			"message0": Blockly.Msg.RTC_CAL_COARSE_TITLE + "%1",
			"args0": [{
				"type": "field_input",
				"name": "VALUE",
				"text": "0"
				/* for android
			"type": "field_number",
			"name": "VALUE",
			"value": 0,
			"min": 0.1,
			"max": 100,
			"precision": 0.1
			*/
			}],
			"previousStatement": null,
			"nextStatement": null,
			"colour": 290,
			"tooltip": Blockly.Msg.RTC_CAL_COARSE_TOOLTIP,
			"helpUrl": Blockly.Msg.RTC_CAL_COARSE_HELPURL
		});
	}
};

// =============================================================================
// utilities
// =============================================================================
Blockly.mcp23s17_address_dropdown_menu = function(spi_channel) {
	if (parseInt(spi_channel) == 0) {
		// spi channel 0, available mcp23s17 address = 0x20 to 0x23
		return [
			["0x20", "32"],
			["0x21", "33"],
			["0x22", "34"],
			["0x23", "35"]
		];
	}
	else {
		// spi channel 1 to 64, available mcp23s17 address = 0x20 to 0x27
		return [
			["0x20", "32"],
			["0x21", "33"],
			["0x22", "34"],
			["0x23", "35"],
			["0x24", "36"],
			["0x25", "37"],
			["0x26", "38"],
			["0x27", "39"]
		];
	}
};

// get address item index
Blockly.mcp23s17_get_address_item_index = function(spi_channel, address_value) {
	var address_dropdown_menu = Blockly.mcp23s17_address_dropdown_menu(spi_channel);
	for (var i = 0; i < address_dropdown_menu.length; i++) {
		if (address_dropdown_menu[i][1] == address_value) {
			break;
		}
	}

	return i;
}

/* ////////////////////////////////////////////////// Plugins ///////////////////////////////////////////////// */

// Control GPIO
Blockly.Blocks['set_gpio'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.set_gpio_TEXT_TITLE)
        .appendField(Blockly.Msg.set_gpio_TEXT_1)
        .appendField(new Blockly.FieldDropdown([["18","18"], ["19","19"], ["23","23"]]), "pin")
        .appendField(Blockly.Msg.set_gpio_TEXT_2)
        .appendField(new Blockly.FieldDropdown([["High","1"], ["Low","0"]]), "state");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip(Blockly.Msg.set_gpio_TEXT_TOOLTIP);
 this.setHelpUrl("");
  }
};


Blockly.Blocks['get_gpio'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.get_gpio_TEXT_TITLE)
        .appendField(Blockly.Msg.get_gpio_TEXT_1)
        .appendField(new Blockly.FieldDropdown([["18","18"], ["19","19"], ["23","23"]]), "gpin");
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip(Blockly.Msg.get_gpio_TEXT_TOOLTIP);
 this.setHelpUrl("");
  }
};

//Display i2c
Blockly.Blocks["lcd_i2c_20x4.clear"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(Blockly.Msg.LCD_I2C_20X4_TITLE);

		// i2c channel 0 to 64
		var channel_array = [];
		for (var i = 0;i <= 64; i++) {
			channel_array.push([String(i), String(i)]);
		}
		this.appendDummyInput()
			.appendField(Blockly.Msg.CHANNEL)
			.appendField(new Blockly.FieldDropdown(channel_array), 'CHANNEL');

		// device addess
		this.appendDummyInput()
			.appendField(Blockly.Msg.ADDRESS)
			.appendField(new Blockly.FieldDropdown([
				["0x20", "32"],
				["0x21", "33"],
				["0x22", "34"],
				["0x23", "35"],
				["0x24", "36"],
				["0x25", "37"],
				["0x26", "38"],
				["0x27", "39"]
			]), 'ADDRESS');

		this.appendDummyInput()
			.appendField(Blockly.Msg.LCD_I2C_20X4_CLR_TITLE);

		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(160);
		this.setTooltip(Blockly.Msg.LCD_I2C_20X4_CLR_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.LCD_I2C_20X4_CLR_HELPURL);
	}
};

Blockly.Blocks["lcd_i2c_20x4.backlight"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(Blockly.Msg.LCD_I2C_20X4_TITLE);

		// i2c channel 0 to 64
		var channel_array = [];
		for (var i = 0;i <= 64; i++) {
			channel_array.push([String(i), String(i)]);
		}
		this.appendDummyInput()
			.appendField(Blockly.Msg.CHANNEL)
			.appendField(new Blockly.FieldDropdown(channel_array), 'CHANNEL');

		// device addess
		this.appendDummyInput()
			.appendField(Blockly.Msg.ADDRESS)
			.appendField(new Blockly.FieldDropdown([
				["0x20", "32"],
				["0x21", "33"],
				["0x22", "34"],
				["0x23", "35"],
				["0x24", "36"],
				["0x25", "37"],
				["0x26", "38"],
				["0x27", "39"]
			]), 'ADDRESS');

		this.appendDummyInput()
			.appendField(Blockly.Msg.LCD_I2C_20X4_BACKLIGHT_TITLE)
			.appendField(new Blockly.FieldDropdown([
				[Blockly.Msg.STATUS_OFF, "0"],
				[Blockly.Msg.STATUS_ON, "1"]
			]), 'STATUS');

		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(160);
		this.setTooltip(Blockly.Msg.LCD_I2C_20X4_BACKLIGHT_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.LCD_I2C_20X4_BACKLIGHT_HELPURL);
	}
};

Blockly.Blocks["lcd_i2c_20x4.print"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(Blockly.Msg.LCD_I2C_20X4_TITLE);

		// i2c channel 0 to 64
		var channel_array = [];
		for (var i = 0;i <= 64; i++) {
			channel_array.push([String(i), String(i)]);
		}
		this.appendDummyInput()
			.appendField(Blockly.Msg.CHANNEL)
			.appendField(new Blockly.FieldDropdown(channel_array), 'CHANNEL');

		// device addess
		this.appendDummyInput()
			.appendField(Blockly.Msg.ADDRESS)
			.appendField(new Blockly.FieldDropdown([
				["0x20", "32"],
				["0x21", "33"],
				["0x22", "34"],
				["0x23", "35"],
				["0x24", "36"],
				["0x25", "37"],
				["0x26", "38"],
				["0x27", "39"]
			]), 'ADDRESS');

		this.appendValueInput('VALUE')
			.appendField(Blockly.Msg.LCD_I2C_20X4_PRINT_TITLE)
			.appendField('(')
			.appendField(new Blockly.FieldNumber(1, 1, 20, 1), 'COLUMN')
			.appendField(',')
			.appendField(new Blockly.FieldNumber(1, 1, 4, 1), 'ROW')
			.appendField(')');

		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(160);
		this.setTooltip(Blockly.Msg.LCD_I2C_20X4_PRINT_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.LCD_I2C_20X4_PRINT_HELPURL);
	}
};

Blockly.Blocks["lcd_i2c_20x4.print_prec"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(Blockly.Msg.LCD_I2C_20X4_TITLE);

		// i2c channel 0 to 64
		var channel_array = [];
		for (var i = 0;i <= 64; i++) {
			channel_array.push([String(i), String(i)]);
		}
		this.appendDummyInput()
			.appendField(Blockly.Msg.CHANNEL)
			.appendField(new Blockly.FieldDropdown(channel_array), 'CHANNEL');

		// device addess
		this.appendDummyInput()
			.appendField(Blockly.Msg.ADDRESS)
			.appendField(new Blockly.FieldDropdown([
				["0x20", "32"],
				["0x21", "33"],
				["0x22", "34"],
				["0x23", "35"],
				["0x24", "36"],
				["0x25", "37"],
				["0x26", "38"],
				["0x27", "39"]
			]), 'ADDRESS');

		this.appendValueInput('VALUE')
			.setCheck('Number')
			.appendField(Blockly.Msg.LCD_I2C_20X4_PRINT_PREC_TITLE)
			.appendField('(')
			.appendField(new Blockly.FieldNumber(1, 1, 20, 1), 'COLUMN')
			.appendField(',')
			.appendField(new Blockly.FieldNumber(1, 1, 4, 1), 'ROW')
			.appendField(')')
			.appendField(Blockly.Msg.PRECISION_TITLE)
			.appendField(new Blockly.FieldNumber(2, 0, 4, 1), 'PREC');

		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(160);
		this.setTooltip(Blockly.Msg.LCD_I2C_20X4_PRINT_PREC_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.LCD_I2C_20X4_PRINT_PREC_HELPURL);
	}
};
//Display spi
Blockly.Blocks["lcd_spi_20x4.clear"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(Blockly.Msg.LCD_SPI_20X4_TITLE);

		// spi channel 0 to 64
		var channel_array = [];
		for (var i = 0;i <= 64; i++) {
			channel_array.push([String(i), String(i)]);
		}
		this.appendDummyInput()
			.appendField(Blockly.Msg.CHANNEL)
			.appendField(
				new Blockly.FieldDropdown(channel_array, function(selectedIndex) {
					// if address item index > 3 for selected index 0, set address item index to 0
					if (selectedIndex == 0) {
						if (Blockly.mcp23s17_get_address_item_index(selectedIndex, this.sourceBlock_.inputList[2].fieldRow[1].value_) > 3) {
							this.sourceBlock_.inputList[2].fieldRow[1].setValue(Blockly.mcp23s17_address_dropdown_menu(0)[0][1]);
						}
					}
					return selectedIndex;
				}),
				'CHANNEL'
			);

		// device addess 0x20 to 0x23 for channel 0, addess 0x20 to 0x27 for channel 1 to 64
		this.appendDummyInput()
			.appendField(Blockly.Msg.ADDRESS)
			.appendField(new Blockly.FieldDropdown(function() {
				try {
					if ((typeof(this.sourceBlock_) != "undefined") && (typeof(this.sourceBlock_.inputList) != "undefined")) {
						var selected_channel = parseInt(this.sourceBlock_.inputList[1].fieldRow[1].value_);
						return Blockly.mcp23s17_address_dropdown_menu(selected_channel);
					}
				} catch (e) {

				}
				// default
				return Blockly.mcp23s17_address_dropdown_menu(0);
			}), 'ADDRESS');

		this.appendDummyInput()
			.appendField(Blockly.Msg.LCD_SPI_20X4_CLR_TITLE);

		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(160);
		this.setTooltip(Blockly.Msg.LCD_SPI_20X4_CLR_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.LCD_SPI_20X4_CLR_HELPURL);
	}
};

Blockly.Blocks["lcd_spi_20x4.backlight"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(Blockly.Msg.LCD_SPI_20X4_TITLE);

		// spi channel 0 to 64
		var channel_array = [];
		for (var i = 0;i <= 64; i++) {
			channel_array.push([String(i), String(i)]);
		}
		this.appendDummyInput()
			.appendField(Blockly.Msg.CHANNEL)
			.appendField(
				new Blockly.FieldDropdown(channel_array, function(selectedIndex) {
					// if address item index > 3 for selected index 0, set address item index to 0
					if (selectedIndex == 0) {
						if (Blockly.mcp23s17_get_address_item_index(selectedIndex, this.sourceBlock_.inputList[2].fieldRow[1].value_) > 3) {
							this.sourceBlock_.inputList[2].fieldRow[1].setValue(Blockly.mcp23s17_address_dropdown_menu(0)[0][1]);
						}
					}
					return selectedIndex;
				}),
				'CHANNEL'
			);

		// device addess 0x20 to 0x23 for channel 0, addess 0x20 to 0x27 for channel 1 to 64
		this.appendDummyInput()
			.appendField(Blockly.Msg.ADDRESS)
			.appendField(new Blockly.FieldDropdown(function() {
				try {
					if ((typeof(this.sourceBlock_) != "undefined") && (typeof(this.sourceBlock_.inputList) != "undefined")) {
						var selected_channel = parseInt(this.sourceBlock_.inputList[1].fieldRow[1].value_);
						return Blockly.mcp23s17_address_dropdown_menu(selected_channel);
					}
				} catch (e) {

				}
				// default
				return Blockly.mcp23s17_address_dropdown_menu(0);
			}), 'ADDRESS');

		this.appendDummyInput()
			.appendField(Blockly.Msg.LCD_SPI_20X4_BACKLIGHT_TITLE)
			.appendField(new Blockly.FieldDropdown([
				[Blockly.Msg.STATUS_OFF, "0"],
				[Blockly.Msg.STATUS_ON, "1"]
			]), 'STATUS');

		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(160);
		this.setTooltip(Blockly.Msg.LCD_SPI_20X4_BACKLIGHT_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.LCD_SPI_20X4_BACKLIGHT_HELPURL);
	}
};

Blockly.Blocks["lcd_spi_20x4.print"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(Blockly.Msg.LCD_SPI_20X4_TITLE);

		// spi channel 0 to 64
		var channel_array = [];
		for (var i = 0;i <= 64; i++) {
			channel_array.push([String(i), String(i)]);
		}
		this.appendDummyInput()
			.appendField(Blockly.Msg.CHANNEL)
			.appendField(
				new Blockly.FieldDropdown(channel_array, function(selectedIndex) {
					// if address item index > 3 for selected index 0, set address item index to 0
					if (selectedIndex == 0) {
						if (Blockly.mcp23s17_get_address_item_index(selectedIndex, this.sourceBlock_.inputList[2].fieldRow[1].value_) > 3) {
							this.sourceBlock_.inputList[2].fieldRow[1].setValue(Blockly.mcp23s17_address_dropdown_menu(0)[0][1]);
						}
					}
					return selectedIndex;
				}),
				'CHANNEL'
			);

		// device addess 0x20 to 0x23 for channel 0, addess 0x20 to 0x27 for channel 1 to 64
		this.appendDummyInput()
			.appendField(Blockly.Msg.ADDRESS)
			.appendField(new Blockly.FieldDropdown(function() {
				try {
					if ((typeof(this.sourceBlock_) != "undefined") && (typeof(this.sourceBlock_.inputList) != "undefined")) {
						var selected_channel = parseInt(this.sourceBlock_.inputList[1].fieldRow[1].value_);
						return Blockly.mcp23s17_address_dropdown_menu(selected_channel);
					}
				} catch (e) {

				}
				// default
				return Blockly.mcp23s17_address_dropdown_menu(0);
			}), 'ADDRESS');

		this.appendValueInput('VALUE')
			.appendField(Blockly.Msg.LCD_SPI_20X4_PRINT_TITLE)
			.appendField('(')
			.appendField(new Blockly.FieldNumber(1, 1, 20, 1), 'COLUMN')
			.appendField(',')
			.appendField(new Blockly.FieldNumber(1, 1, 4, 1), 'ROW')
			.appendField(')');

		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(160);
		this.setTooltip(Blockly.Msg.LCD_SPI_20X4_PRINT_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.LCD_SPI_20X4_PRINT_HELPURL);
	}
};

Blockly.Blocks["lcd_spi_20x4.print_prec"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(Blockly.Msg.LCD_SPI_20X4_TITLE);

		// spi channel 0 to 64
		var channel_array = [];
		for (var i = 0;i <= 64; i++) {
			channel_array.push([String(i), String(i)]);
		}
		this.appendDummyInput()
			.appendField(Blockly.Msg.CHANNEL)
			.appendField(
				new Blockly.FieldDropdown(channel_array, function(selectedIndex) {
					// if address item index > 3 for selected index 0, set address item index to 0
					if (selectedIndex == 0) {
						if (Blockly.mcp23s17_get_address_item_index(selectedIndex, this.sourceBlock_.inputList[2].fieldRow[1].value_) > 3) {
							this.sourceBlock_.inputList[2].fieldRow[1].setValue(Blockly.mcp23s17_address_dropdown_menu(0)[0][1]);
						}
					}
					return selectedIndex;
				}),
				'CHANNEL'
			);

		// device addess 0x20 to 0x23 for channel 0, addess 0x20 to 0x27 for channel 1 to 64
		this.appendDummyInput()
			.appendField(Blockly.Msg.ADDRESS)
			.appendField(new Blockly.FieldDropdown(function() {
				try {
					if ((typeof(this.sourceBlock_) != "undefined") && (typeof(this.sourceBlock_.inputList) != "undefined")) {
						var selected_channel = parseInt(this.sourceBlock_.inputList[1].fieldRow[1].value_);
						return Blockly.mcp23s17_address_dropdown_menu(selected_channel);
					}
				} catch (e) {

				}
				// default
				return Blockly.mcp23s17_address_dropdown_menu(0);
			}), 'ADDRESS');

		this.appendValueInput('VALUE')
			.setCheck('Number')
			.appendField(Blockly.Msg.LCD_SPI_20X4_PRINT_PREC_TITLE)
			.appendField('(')
			.appendField(new Blockly.FieldNumber(1, 1, 20, 1), 'COLUMN')
			.appendField(',')
			.appendField(new Blockly.FieldNumber(1, 1, 4, 1), 'ROW')
			.appendField(')')
			.appendField(Blockly.Msg.PRECISION_TITLE)
			.appendField(new Blockly.FieldNumber(2, 0, 4, 1), 'PREC');

		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(160);
		this.setTooltip(Blockly.Msg.LCD_SPI_20X4_PRINT_PREC_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.LCD_SPI_20X4_PRINT_PREC_HELPURL);
	}
};

//Examples
Blockly.Blocks["blink.start"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(Blockly.Msg.BLINK_START_TITLE);
		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(160);
		this.setTooltip(Blockly.Msg.BLINK_START_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.BLINK_START_HELPURL);
	}
};

Blockly.Blocks["blink.stop"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(Blockly.Msg.BLINK_STOP_TITLE);
		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(160);
		this.setTooltip(Blockly.Msg.BLINK_STOP_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.BLINK_STOP_HELPURL);
	}
};

//GPIO
Blockly.Blocks["mcp23s17_16in.read"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(Blockly.Msg.MCP23S17_16IN_READ_TITLE);

		// spi channel 0 to 64
		var channel_array = [];
		for (var i = 0;i <= 64; i++) {
			channel_array.push([String(i), String(i)]);
		}
		this.appendDummyInput()
			.appendField(Blockly.Msg.CHANNEL)
			.appendField(
				new Blockly.FieldDropdown(channel_array, function(selectedIndex) {
					// if address item index > 3 for selected index 0, set address item index to 0
					if (selectedIndex == 0) {
						if (Blockly.mcp23s17_get_address_item_index(selectedIndex, this.sourceBlock_.inputList[2].fieldRow[1].value_) > 3) {
							this.sourceBlock_.inputList[2].fieldRow[1].setValue(Blockly.mcp23s17_address_dropdown_menu(0)[0][1]);
						}
					}
					return selectedIndex;
				}),
				'CHANNEL'
			);

		// device addess 0 to 3 for channel 0, addess 0 to 7 for channel 1 to 64
		this.appendDummyInput()
			.appendField(Blockly.Msg.ADDRESS)
			.appendField(new Blockly.FieldDropdown(function() {
				try {
					if ((typeof(this.sourceBlock_) != "undefined") && (typeof(this.sourceBlock_.inputList) != "undefined")) {
						var selected_channel = parseInt(this.sourceBlock_.inputList[1].fieldRow[1].value_);
						return Blockly.mcp23s17_address_dropdown_menu(selected_channel);
					}
				} catch (e) {

				}
				// default
				return Blockly.mcp23s17_address_dropdown_menu(0);
			}), 'ADDRESS');

		// mcp23s17 gpio
		this.appendDummyInput()
			.appendField(Blockly.Msg.INPUT)
			.appendField(new Blockly.FieldDropdown([
				["0", "0"],
				["1", "1"],
				["2", "2"],
				["3", "3"],
				["4", "4"],
				["5", "5"],
				["6", "6"],
				["7", "7"],
				["8", "8"],
				["9", "9"],
				["10", "10"],
				["11", "11"],
				["12", "12"],
				["13", "13"],
				["14", "14"],
				["15", "15"]
			]), 'INPUT');

		this.setOutput(true, 'Number');
		this.setInputsInline(true);
		this.setPreviousStatement(null);
		this.setNextStatement(null);
		this.setColour(160);
		this.setTooltip(Blockly.Msg.MCP23S17_16IN_READ_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.MCP23S17_16IN_READ_HELPURL);
	}
};
Blockly.Blocks["mcp23s17_16out.write"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(Blockly.Msg.MCP23S17_16OUT_WRITE_TITLE);

		// spi channel 0 to 64
		var channel_array = [];
		for (var i = 0;i <= 64; i++) {
			channel_array.push([String(i), String(i)]);
		}
		this.appendDummyInput()
			.appendField(Blockly.Msg.CHANNEL)
			.appendField(
				new Blockly.FieldDropdown(channel_array, function(selectedIndex) {
					// if address item index > 3 for selected index 0, set address item index to 0
					if (selectedIndex == 0) {
						if (Blockly.mcp23s17_get_address_item_index(selectedIndex, this.sourceBlock_.inputList[2].fieldRow[1].value_) > 3) {
							this.sourceBlock_.inputList[2].fieldRow[1].setValue(Blockly.mcp23s17_address_dropdown_menu(0)[0][1]);
						}
					}
					return selectedIndex;
				}),
				'CHANNEL'
			);

		// device addess 0 to 3 for channel 0, addess 0 to 7 for channel 1 to 64
		this.appendDummyInput()
			.appendField(Blockly.Msg.ADDRESS)
			.appendField(new Blockly.FieldDropdown(function() {
				try {
					if ((typeof(this.sourceBlock_) != "undefined") && (typeof(this.sourceBlock_.inputList) != "undefined")) {
						var selected_channel = parseInt(this.sourceBlock_.inputList[1].fieldRow[1].value_);
						return Blockly.mcp23s17_address_dropdown_menu(selected_channel);
					}
				} catch (e) {

				}
				// default
				return Blockly.mcp23s17_address_dropdown_menu(0);
			}), 'ADDRESS');

		// mcp23s17 gpio
		this.appendDummyInput()
			.appendField(Blockly.Msg.OUTPUT)
			.appendField(new Blockly.FieldDropdown([
				["0", "0"],
				["1", "1"],
				["2", "2"],
				["3", "3"],
				["4", "4"],
				["5", "5"],
				["6", "6"],
				["7", "7"],
				["8", "8"],
				["9", "9"],
				["10", "10"],
				["11", "11"],
				["12", "12"],
				["13", "13"],
				["14", "14"],
				["15", "15"]
			]), 'OUTPUT')
			.appendField(Blockly.Msg.STATUS)
			.appendField(new Blockly.FieldDropdown([
				[Blockly.Msg.STATUS_OFF, "0"],
				[Blockly.Msg.STATUS_ON, "1"]
			]), 'STATUS');

		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(160);
		this.setTooltip(Blockly.Msg.MCP23S17_16OUT_WRITE_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.MCP23S17_16OUT_WRITE_HELPURL);
	}
};

//Chain Motor
Blockly.Blocks["drv8830.speed"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(Blockly.Msg.DRV8830_SPEED_TITLE);

		// i2c channel 0 to 64
/*		var channel_array = [];
		for (var i = 0;i <= 64; i++) {
			channel_array.push([String(i), String(i)]);
		}
		this.appendDummyInput()
			.appendField(Blockly.Msg.CHANNEL)
			.appendField(new Blockly.FieldDropdown(channel_array), 'CHANNEL');*/

		// device addess
		this.appendDummyInput()
			.appendField(Blockly.Msg.MOTOR)
			.appendField(new Blockly.FieldDropdown( [
/*				["0x60", "96"],
				["0x61", "97"],
				["0x62", "98"],
				["0x63", "99"],
				["0x64", "100"],
				["0x65", "101"],
				["0x66", "102"],
				["0x67", "103"],
				["0x68", "104"]*/
				["1", "102"],
				["2", "104"]
			]), 'ADDRESS');

		this.appendValueInput("SPEED")
			.appendField(Blockly.Msg.MOTOR_SPEED + '(%)')
			.setCheck('Number');

/*		this.appendDummyInput()
			.appendField(Blockly.Msg.MOTOR_STATE).appendField(new Blockly.FieldDropdown([
				[Blockly.Msg.MOTOR_STANDBY, "hbl_standby"],
				[Blockly.Msg.MOTOR_REVERSE, "hbl_reverse"],
				[Blockly.Msg.MOTOR_FORWARD, "hbl_forward"],
				[Blockly.Msg.MOTOR_BRAKE, "hbl_brake"]
			]), 'STATE');*/

		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(160);
		this.setTooltip(Blockly.Msg.DRV8830_SPEED_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.DRV8830_SPEED_HELPURL);
	}
};

//Special IO


// PM10/PM2.5
Blockly.Blocks["hpma115s0.getpm2_5"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(Blockly.Msg.HPMA115S0_GET_PM2_5_TITLE);

		this.appendDummyInput()
			.appendField(Blockly.Msg.HPMA115S0_PM_TX)
			.appendField(new Blockly.FieldDropdown([
				["OUT1", "OUT1_GPIO"],
				["OUT2", "OUT2_GPIO"]
			]), 'TX');

		// device addess
		this.appendDummyInput()
			.appendField(Blockly.Msg.HPMA115S0_PM_RX)
			.appendField(new Blockly.FieldDropdown([
				["IN1", "IN1_GPIO"],
				["IN2", "IN2_GPIO"],
				["IN3", "IN3_GPIO"],
				["IN4", "IN4_GPIO"]
			]), 'RX');

		this.setOutput(true, 'Number');
		this.setInputsInline(true);
		this.setPreviousStatement(false);
		this.setNextStatement(false);
		this.setColour(58);
		this.setTooltip(Blockly.Msg.HPMA115S0_GET_PM2_5_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.HPMA115S0_GET_PM2_5_HELPURL);
	}
};
Blockly.Blocks["hpma115s0.getpm10"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(Blockly.Msg.HPMA115S0_GET_PM10_TITLE);

		this.appendDummyInput()
			.appendField(Blockly.Msg.HPMA115S0_PM_TX)
			.appendField(new Blockly.FieldDropdown([
				["OUT1", "OUT1_GPIO"],
				["OUT2", "OUT2_GPIO"]
			]), 'TX');

		// device addess
		this.appendDummyInput()
			.appendField(Blockly.Msg.HPMA115S0_PM_RX)
			.appendField(new Blockly.FieldDropdown([
				["IN1", "IN1_GPIO"],
				["IN2", "IN2_GPIO"],
				["IN3", "IN3_GPIO"],
				["IN4", "IN4_GPIO"]
			]), 'RX');

		this.setOutput(true, 'Number');
		this.setInputsInline(true);
		this.setPreviousStatement(false);
		this.setNextStatement(false);
		this.setColour(58);
		this.setTooltip(Blockly.Msg.HPMA115S0_GET_PM10_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.HPMA115S0_GET_PM10_HELPURL);
	}
};