Blockly.Blocks['esp_now.get_mac'] = {
	init: function() {
		this.jsonInit({
			"message0": Blockly.Msg.ESPNOW_GET_MAC_MESSAGE,
			"output": "String",
			"colour": 60,
			"tooltip": Blockly.Msg.ESPNOW_GET_MAC_TOOLTIP,
			"helpUrl": "https://store.kidbright.info/"
		});
	}
};

Blockly.Blocks['esp_now.send'] = {
	init: function() {
		this.jsonInit({
			"message0": Blockly.Msg.ESPNOW_SEND_MESSAGE,
			"args0": [{
				"type": "input_value",
				"name": "data",
				"check": [
					"Boolean",
					"Number",
					"String"
				]
			}],
			"inputsInline": true,
			"previousStatement": null,
			"nextStatement": null,
			"colour": 60,
			"tooltip": Blockly.Msg.ESPNOW_SEND_TOOLTIP,
			"helpUrl": "https://store.kidbright.info/"
		});
	}
};

Blockly.Blocks['esp_now.send2'] = {
	init: function() {
		this.jsonInit({
			"message0": Blockly.Msg.ESPNOW_SEND2_MESSAGE,
			"args0": [{
				"type": "input_value",
				"name": "data",
				"check": [
					"Boolean",
					"Number",
					"String"
				]
			}, {
				"type": "field_input",
				"name": "mac",
				"text": "FF:FF:FF:FF:FF:FF"
			}],
			"inputsInline": true,
			"previousStatement": null,
			"nextStatement": null,
			"colour": 60,
			"tooltip": Blockly.Msg.ESPNOW_SEND2_TOOLTIP,
			"helpUrl": "https://store.kidbright.info/"
		});
	}
};

Blockly.Blocks['esp_now.recv'] = {
	init: function() {
		this.jsonInit({
			"message0": Blockly.Msg.ESPNOW_RECV_MESSAGE,
			"args0": [{
				"type": "input_dummy"
			}, {
				"type": "input_statement",
				"name": "recv_cb"
			}],
			"previousStatement": null,
			"nextStatement": null,
			"colour": 60,
			"tooltip": Blockly.Msg.ESPNOW_RECV_TOOLTIP,
			"helpUrl": "https://store.kidbright.info/"
		});
	}
};

Blockly.Blocks['esp_now.read_string'] = {
	init: function() {
		this.jsonInit({
			"message0": Blockly.Msg.ESPNOW_READ_STRING_MESSAGE,
			"output": "String",
			"colour": 60,
			"tooltip": Blockly.Msg.ESPNOW_READ_STRING_TOOLTIP,
			"helpUrl": "https://store.kidbright.info/"
		});
	}
};

Blockly.Blocks['esp_now.read_number'] = {
	init: function() {
		this.jsonInit({
			"message0": Blockly.Msg.ESPNOW_READ_NUMBER_MESSAGE,
			"output": "Number",
			"colour": 60,
			"tooltip": Blockly.Msg.ESPNOW_READ_NUMBER_TOOLTIP,
			"helpUrl": "https://store.kidbright.info/"
		});
	}
};

