Blockly.JavaScript['drv8833.move'] = function(block) {
  var moveDirect = block.getFieldValue('DIRECTION');
  var speed = Blockly.JavaScript.valueToCode(block, 'SPEED', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  // return [
  //  'DEV_IO.DRV8833().move(' + block.getFieldValue('DIRECTION') + ', ' + speed + ');\n',
  //  Blockly.JavaScript.ORDER_ATOMIC
  // ];
  var code = '';

  if (moveDirect == 0) {
    code = 'kb_fks.motorMovement(1, ' + speed + ');\n';
  } else if (moveDirect == 1) {
    code = 'kb_fks.motorMovement(2, ' + speed + ');\n';
  } else if (moveDirect == 2) {
    code = 'kb_fks.motorMovement(3, ' + speed + ');\n';
  } else if (moveDirect == 3) {
    code = 'kb_fks.motorMovement(4, ' + speed + ');\n';
  }
  //return 'DEV_IO.DRV8833().move(' + block.getFieldValue('DIRECTION') + ', ' + speed + ');\n';
  return code;
}

Blockly.JavaScript['drv8833.stop'] = function(block) {
  //return 'DEV_IO.DRV8833().stop();\n';
  return 'kb_fks.motorMovement(0, 0);\n';
}

/*Blockly.JavaScript["drv8833.speed_number"] = function(block) {
  // Numeric value.
  var code = parseFloat(block.getFieldValue('VALUE'));
  var order = code >= 0 ? Blockly.JavaScript.ORDER_ATOMIC : Blockly.JavaScript.ORDER_UNARY_NEGATION;
  return [code, order];
};*/

Blockly.JavaScript['joystick_1.position'] = function(block) {
  /*return [
    'DEV_IO.JOYSTICK(OUT1_GPIO, IN1_GPIO)' + '.get_position()',
    Blockly.JavaScript.ORDER_ATOMIC
  ];*/
  return ['kb_fks.joystick_1()', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['joystick_2.position'] = function(block) {
  /*return [
    'DEV_IO.JOYSTICK(OUT2_GPIO, IN2_GPIO)' + '.get_position()',
    Blockly.JavaScript.ORDER_ATOMIC
  ];*/
  return ['kb_fks.joystick_2()', Blockly.JavaScript.ORDER_ATOMIC];
};
