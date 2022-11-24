Blockly.Blocks['myservo'] = {
  init: function() {
    this.appendValueInput("angle")
      .setCheck("Number")
      .appendField(Blockly.Msg.MYSERVO["Servo pin"])
      .appendField(new Blockly.FieldDropdown([["Servo1","26"], ["Servo2","27"]]), "pin")
      .appendField(Blockly.Msg.MYSERVO["set angle to"]);
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(105);
    this.setTooltip(Blockly.Msg.MYSERVO["Give angle to your servo motor"]);
    this.setHelpUrl("https://www.ioxhop.com/");
  }
};

Blockly.Blocks['myservo_calibrate'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(Blockly.Msg.MYSERVO["Servo pin"])
      .appendField(new Blockly.FieldDropdown([["Servo1","26"], ["Servo2","27"]]), "pin")
      .appendField(Blockly.Msg.MYSERVO["calibrate time to"] + " (")
      .appendField(new Blockly.FieldNumber(0.5, 0, 20), "min")
      .appendField(",")
      .appendField(new Blockly.FieldNumber(2.5, 0, 20), "max")
      .appendField(")");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(105);
    this.setTooltip(Blockly.Msg.MYSERVO["Calibration your servo motor"]);
    this.setHelpUrl("https://www.ioxhop.com/");
  }
};
