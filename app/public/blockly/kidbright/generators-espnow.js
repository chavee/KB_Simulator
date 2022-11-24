Blockly.JavaScript['esp_now.get_mac'] = function(block) {
	//var code = 'DEV_IO.ESP_NOW_CLASS().getMAC()';
	var code = 'kb_espnow.esp_getmac()';
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['esp_now.send'] = function(block) {
	var value_data = Blockly.JavaScript.valueToCode(block, 'data', Blockly.JavaScript.ORDER_ATOMIC) || '\"\"';
	var code = 'kb_espnow.esp_send(' + value_data + ');\n';
	return code;
};

Blockly.JavaScript['esp_now.send2'] = function(block) {
	var value_data = Blockly.JavaScript.valueToCode(block, 'data', Blockly.JavaScript.ORDER_ATOMIC) || '\"\"';
	var text_mac = block.getFieldValue('mac');
	//var code = 'DEV_IO.ESP_NOW_CLASS().send("' + text_mac + '", ' + value_data + ');\n';
	var code = 'kb_espnow.esp_send2(' + text_mac + ', ' + value_data + ');\n';
	return code;
};

Blockly.JavaScript['esp_now.recv'] = function(block) {
	var statements_recv_cb = Blockly.JavaScript.statementToCode(block, 'recv_cb');
	//var code = 'DEV_IO.ESP_NOW_CLASS().onRecv([]() { ' + statements_recv_cb + ' });\n';
	var code = 'if(kb_espnow.esp_recv() == 1) { ' + statements_recv_cb + ' }\n';
	return code;
};

Blockly.JavaScript['esp_now.read_string'] = function(block) {
	//var code = 'DEV_IO.ESP_NOW_CLASS().readString()';
	var code = 'kb_espnow.esp_read_string()';
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['esp_now.read_number'] = function(block) {
	//var code = 'DEV_IO.ESP_NOW_CLASS().readNumber()';
	var code = 'kb_espnow.esp_read_number()';
	return [code, Blockly.JavaScript.ORDER_NONE];
};
