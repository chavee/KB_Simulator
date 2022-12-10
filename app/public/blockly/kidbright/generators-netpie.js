Blockly.JavaScript['netpie_write_shadow'] = function(block) {
    var value_field = block.getFieldValue('field');
    var value_data = Blockly.JavaScript.valueToCode(block, 'data', Blockly.JavaScript.ORDER_ATOMIC);

    var code = `netpie.writeshadow("${value_field}", ${value_data});\n`;
    return code;
};
Blockly.JavaScript['netpie_on_receive_message'] = function(block) {
    var value_topic = block.getFieldValue('topic');
    var statements_on_receive_message = Blockly.JavaScript.statementToCode(block, 'on_receive_message');
    var code = 'netpie_on_message_topic("@msg/' + value_topic + '", function(payload) {\n' + 
        statements_on_receive_message + '});\n';
    return code;
};
Blockly.JavaScript['netpie_received_message'] = function(block) {
    var dropdown_type = block.getFieldValue('type');
    var code = '';
    if(dropdown_type === 'number'){
        code = 'Number(payload)';
    } else if(dropdown_type === 'string'){
        code = 'String(payload)';
    }
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['netpie_publish_message'] = function(block) {
    var value_topic = block.getFieldValue('topic');
    var value_data = Blockly.JavaScript.valueToCode(block, 'data', Blockly.JavaScript.ORDER_ATOMIC);
    var code = 'netpie.publish("@msg/' + value_topic + '", '+ value_data +');\n';
    return code;
};

Blockly.JavaScript['netpie_subscribe'] = function(block) {
    var value_topic = block.getFieldValue('topic');
    var code = 'netpie.subscribe("@msg/' + value_topic + '");\n';
    return code;
};

Blockly.JavaScript['netpie_on_shadow_updated'] = function(block) {
    var statements_shadow_updated = Blockly.JavaScript.statementToCode(block, 'shadow_updated');
    var code = 'netpie_on_shadow_updated(function(shadow) {\n'
                 + statements_shadow_updated + '});\n';
    return code;
};

Blockly.JavaScript['netpie_received_shadow_updated'] = function(block) {
    var value_field = block.getFieldValue('field');
    var dropdown_type = block.getFieldValue('type');
    var fields = value_field.split('.');

    var code = '';
    var field_code = '["data"]';
    for(i in fields){
        field_code += `["${fields[i]}"]`;
    }
    if(dropdown_type === 'number'){
        code += `Number(shadow${field_code})`;
    } else if(dropdown_type === 'string'){
        code += `String(shadow${field_code})`;
    }

    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['netpie_shadow_variable_defined'] = function(block) {
    var value_field = Blockly.JavaScript.valueToCode(block, 'field', Blockly.JavaScript.ORDER_ATOMIC);
    var code = `isVariableDefined(${value_field})`;
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['netpie_read_entire_shadow'] = function(block) {
    var statements_on_read_shadow = Blockly.JavaScript.statementToCode(block, 'on_read_shadow');
    var code = 'netpie_read_entire_shadow(function(shadow) {\n' + 
        statements_on_read_shadow + '});\n';
    return code;
};
Blockly.JavaScript['netpie_on_connected'] = function(block) {
    var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');

    var code = `function netpie_on_connected(){\n` + 
        statements_name + '}\n';

    return code;
};
Blockly.JavaScript['netpie_on_disconnected'] = function(block) {
    var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
    var code = `function netpie_on_disconnected(){\n` + 
        statements_name + '}\n';

    return code;
};
Blockly.JavaScript['netpie_connect'] = function(block) {
    var text_device_id = block.getFieldValue('DEVICE_ID');
    var text_device_token = block.getFieldValue('DEVICE_TOKEN');
    var code =  `
        var mcb = {};
        var scb = [];
        var gcb = [];
 
        function netpie_message_handle(topic, payload) {
            var func = mcb[topic];
            if (func) {
                func(payload);
            }
        };

        function netpie_shadow_updated_handle(shadowtext) {
            var shadow = JSON.parse(shadowtext);
            for (var i=0; i<scb.length; i++) {
                var func = scb[i];
                if (func) {
                    func(shadow);
                }
            }
        }

        function netpie_shadow_get_handle(shadowtext) {
            var shadow = JSON.parse(shadowtext);
            for (var i=0; i<gcb.length; i++) {
                var func = gcb[i];
                if (func) {
                    func(shadow);
                }
            }
            gcb = [];
        }

        function netpie_on_message_topic(topic, callback) {
            mcb[topic] = callback;
        }
        function netpie_on_shadow_updated(callback) {
            scb.push(callback);
        }

        function netpie_read_entire_shadow(callback) {
            gcb.push(callback);
            if (gcb.length == 1) {
                netpie.publish('@shadow/data/get','');
            }
        }

        netpie.connect(",mqtt.netpie.io:443", "${text_device_id}", "${text_device_token}");
        `;
    return code;
  };
 