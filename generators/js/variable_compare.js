Blockly.JavaScript['variable_compare'] = function(block) {
    // Comparison operator.
    var OPERATORS = {
      'EQ': '==',
      'NEQ': '!=',
      'LT': '<',
      'LTE': '<=',
      'GT': '>',
      'GTE': '>='
    };
    var operator = OPERATORS[block.getFieldValue('OP')];
    var order = (operator == '==' || operator == '!=') ?
        Blockly.JavaScript.ORDER_EQUALITY : Blockly.JavaScript.ORDER_RELATIONAL;
    var A = Blockly.JavaScript.valueToCode(block, 'A', order) || '0';
    var B = Blockly.JavaScript.valueToCode(block, 'B', order) || '0';
    var code = `${A} ${operator} ${B}`
    return [code, order];
  };