
// Visuals for parent ggplot2 block.
//
Blockly.defineBlocksWithJsonArray([
    {
      "type": "ggplot_plot",
      "message0": "ggplot %1",
      "args0": [
        {
          "type": "input_statement",
          "name": "LAYERS"
        }
      ],
      previousStatement: null,
      nextStatement: null,
      style: "transform_blocks",
      tooltip: "create a ggplot",
      helpUrl: ""
    }
  ])

// Visuals for parent ggplot2 layer block.
//
Blockly.defineBlocksWithJsonArray([
    {
      "type": "ggplot_geom_point",
      "message0": "geom_point %1",
      "args0": [
        {
            "type": "input_statement",
            "name": "MAPPING"
        }
      ],
      inputsInline: true,
      previousStatement: null,
      nextStatement: null,
      style: "transform_blocks",
      tooltip: "create a ggplot layer",
      helpUrl: ""
    }
  ])

//
// Visuals for mapping block.
//
Blockly.defineBlocksWithJsonArray([
    {
      type: 'ggplot_mapping',
      message0: 'aes %1 %2',
      args0: [
        {
          type: 'field_dropdown',
          name: 'AESTHETIC',
          options: [
            ['x', 'x'],
            ['y', 'y'],
            ['color', 'color']
          ]
        },
        {
          type: 'field_input',
          name: 'COLUMN',
          text: 'column'
        }
      ],
      inputsInline: true,
      previousStatement: null,
      nextStatement: null,
      style: 'transform_blocks',
      tooltip: 'create a ggplot mapping',
      helpUrl: ''
    }
  ])
