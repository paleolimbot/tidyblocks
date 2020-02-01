
ggplot_aes_list_to_encoding = (branch) => {
    
    // combine mapping items into one 'encoding'
    // backwards, because this is how it would work in the
    // actual aes() function in R if a user specified more
    // than one mapping for (e.g., color)
    const mappingItems = JSON.parse(`[ ${branch.replace(/,\s*$/, '')} ]`)
    const encoding = {}
    for (var i = (mappingItems.length - 1); i >=0; i--) {
        const item = mappingItems[i]
        encoding[item.aesthetic] = {
            _tbId: item._tbId,
            field: item.column,
            type: 'quantitative'
        }
    }

    return encoding
}

//
// Create a ggplot.
//
Blockly.JavaScript['ggplot_plot'] = (block) => {
    const branchLayers = Blockly.JavaScript.statementToCode(block, "LAYERS")
          .replace(/\]\[/g, '], [')

    const layers = JSON.parse(`[ ${branchLayers.replace(/,\s*$/, '')} ]`)
    const spec = {data: {values: null}, layer: layers}

    const suffix = TbManager.registerSuffix('')
    return `.plot(${block.tbId}, environment, ${JSON.stringify(spec)}) ${suffix}`
  }

//
// Create a point geometry layer.
//
Blockly.JavaScript['ggplot_geom_point'] = (block) => {
    const branch = Blockly.JavaScript.statementToCode(block, "MAPPING")
          .replace(/\]\[/g, '], [')

    const encoding = ggplot_aes_list_to_encoding(branch)
    
    // generate the vega lite single view spec
    const spec = {
        '_tbId': block.tbId,
        'mark': 'point',
        'encoding': encoding
      }

    return `${JSON.stringify(spec)} ,`
  }

//
// Create a smooth geometry layer.
//
Blockly.JavaScript['ggplot_geom_smooth'] = (block) => {
    const branch = Blockly.JavaScript.statementToCode(block, "MAPPING")
          .replace(/\]\[/g, '], [')
    
    const encoding = ggplot_aes_list_to_encoding(branch)

    // generate the vega lite spec
    const spec = {
        '_tbId': block.tbId,
        'mark': {
            "type": "line",
            "color": "firebrick"
        },
        "transform": [
            {
              "regression": encoding.y.field,
              "on": encoding.x.field,
              "method": "linear"
            }
        ],
        'encoding': encoding
      }

    return `${JSON.stringify(spec)} ,`
  }

//
// Map columns to aesthetics.
//
Blockly.JavaScript['ggplot_mapping'] = (block) => {
    const aesthetic = block.getFieldValue('AESTHETIC')
    const column = block.getFieldValue('COLUMN')

    const mappingItem = {
        '_tbId': block.tbId,
        'aesthetic': aesthetic,
        'column': column
    }

    return `${JSON.stringify(mappingItem)}, `
  }
