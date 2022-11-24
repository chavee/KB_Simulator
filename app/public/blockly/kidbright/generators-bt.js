Blockly.JavaScript['bt_setup'] = function(block) {
	var value_name = Blockly.JavaScript.valueToCode(block, 'name', Blockly.JavaScript.ORDER_ATOMIC);
	//var code = 'DEV_IO.BT().setup(' + value_name + ');\n';
	var code = 'kb_bluetooth.bluetooth_setup(' + value_name + ');\n';
	return code;
};

Blockly.JavaScript['bt_on_auth'] = function(block) {
	var statements_callback = Blockly.JavaScript.statementToCode(block, 'callback');
	//var code = 'DEV_IO.BT().on_auth([]() {\n' + statements_callback + '});\n';
	var code = '';
	return code;
};

Blockly.JavaScript['bt_get_password'] = function(block) {
	//var code = 'DEV_IO.BT().get_password()';
	var code = '140502';
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['bt_on_data'] = function(block) {
	var statements_callback = Blockly.JavaScript.statementToCode(block, 'callback');
	//var code = 'DEV_IO.BT().on_data([]() {\n' + statements_callback + '});\n';
	var code = '';
	return code;
};

Blockly.JavaScript['bt_get_data'] = function(block) {
	//var code = 'DEV_IO.BT().get_data()';
	var code = '0';
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['bt_send_data'] = function(block) {
	var value_data = Blockly.JavaScript.valueToCode(block, 'data', Blockly.JavaScript.ORDER_ATOMIC);
	//var code = 'DEV_IO.BT().send(' + value_data + ');';
	var code = 'kb_bluetooth.bluetooth_send_data(' + value_data + ');\n';
	return code;
};