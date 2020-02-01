
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

// Visuals for the geom_point block.
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
      tooltip: "create a point geometry layer",
      helpUrl: ""
    }
  ])

// Visuals for the geom_smooth block.
//
Blockly.defineBlocksWithJsonArray([
    {
      "type": "ggplot_geom_smooth",
      "message0": "geom_smooth %1",
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
      tooltip: "create a smooth geometry layer",
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
