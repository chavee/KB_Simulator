
Blockly.JavaScript['spec_ios.get_analog_raw'] = function(block) {

 	var code = 'kb_specio.input' + block.getFieldValue('INPUT') + '_read()';
	//return [
		// input = IN1(gpio 32), IN2(gpio 33), IN3(gpio 34), IN4(gpio 35)

		//'DEV_IO.SPEC_IOS(' + block.getFieldValue('INPUT')  + ')' + '.get_analog_raw()',
		//'kb_specio.input1_read()',
		//'kb_specio.input' + block.getFieldValue('INPUT') + '_read()',
		//Blockly.JavaScript.ORDER_ATOMIC
	//];
	return [code ,Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['specialoutput_write'] = function(block) {
	return 'ports.output' + block.getFieldValue('OUTPUT') + '_write(' + block.getFieldValue('STATUS') + ');\n';
};
