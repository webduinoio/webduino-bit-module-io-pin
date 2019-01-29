Blockly.JavaScript['pin_get_bit'] = function (block) {
  var input_pin_block = block.getInputTargetBlock('pin');
  var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
  var code = '';
  if (input_pin_block.type === 'pin_board_bit') {
    code = 'getPin(' + value_pin + ')';
  } else {
    code = 'getPin(board, ' + 'bitGPIO(' + value_pin + '))';
  }
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['pin_num_bit'] = function (block) {
  var dropdown_pin_ = block.getFieldValue('pin_');
  var code = dropdown_pin_;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['pin_board_bit'] = function (block) {
  var dropdown_board_ = block.getFieldValue('board_');
  var value_pin_ = Blockly.JavaScript.valueToCode(block, 'pin_', Blockly.JavaScript.ORDER_ATOMIC);
  var code = dropdown_board_ + ', bitGPIO(' + value_pin_ + ')';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['pin_set_mode'] = function (block) {
  var variable_pin_ = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('pin_'), Blockly.Variables.NAME_TYPE);
  var dropdown_mode_ = block.getFieldValue('mode_');
  var code = variable_pin_ + '.setMode(' + dropdown_mode_ + ');\n';
  return code;
};

Blockly.JavaScript['pin_read'] = function (block) {
  var variable_pin_ = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('pin_'), Blockly.Variables.NAME_TYPE);
  var code = 'await ' + variable_pin_ + '.read()';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['pin_write'] = function (block) {
  var variable_pin_ = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('pin_'), Blockly.Variables.NAME_TYPE);
  var value_value_ = Blockly.JavaScript.valueToCode(block, 'value_', Blockly.JavaScript.ORDER_ATOMIC);
  var code = variable_pin_ + '.write(' + value_value_ + ');\n';
  return code;
};