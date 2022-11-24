Blockly.Blocks['bt_setup'] = {
	init: function() {
		this.appendValueInput("name")
			.setCheck("String")
			.appendField(Blockly.Msg.BT_SETUP);
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(45);
		this.setTooltip("");
		this.setHelpUrl("https://store.kidbright.info/plugin/8/Bluetooth+Classic");
	}
};

Blockly.Blocks['bt_on_auth'] = {
	init: function() {
		this.appendDummyInput()
			.appendField(Blockly.Msg.BT_ON_AUTH);
		this.appendStatementInput("callback")
			.setCheck(null);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(45);
		this.setTooltip("");
		this.setHelpUrl("https://store.kidbright.info/plugin/8/Bluetooth+Classic");
	}
};

Blockly.Blocks['bt_get_password'] = {
	init: function() {
		this.appendDummyInput()
			.appendField(Blockly.Msg.BT_GET_PASS);
		this.setOutput(true, "String");
		this.setColour(45);
		this.setTooltip("");
		this.setHelpUrl("https://store.kidbright.info/plugin/8/Bluetooth+Classic");
	}
};

Blockly.Blocks['bt_on_data'] = {
	init: function() {
		this.appendDummyInput()
			.appendField(Blockly.Msg.BT_ON_RECEIVED);
		this.appendStatementInput("callback")
			.setCheck(null);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(45);
		this.setTooltip("");
		this.setHelpUrl("https://store.kidbright.info/plugin/8/Bluetooth+Classic");
	}
};

Blockly.Blocks['bt_get_data'] = {
	init: function() {
		this.appendDummyInput()
			.appendField(Blockly.Msg.BT_GET_DATA);
		this.setOutput(true, "String");
		this.setColour(45);
		this.setTooltip("");
		this.setHelpUrl("https://store.kidbright.info/plugin/8/Bluetooth+Classic");
	}
};

Blockly.Blocks['bt_send_data'] = {
	init: function() {
		this.appendValueInput("data")
			.setCheck(["Boolean", "Number", "String"])
			.appendField(Blockly.Msg.BT_SEND_DATA);
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(45);
		this.setTooltip("");
		this.setHelpUrl("https://store.kidbright.info/plugin/8/Bluetooth+Classic");
	}
};
