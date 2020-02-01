
//
// Create a ggplot.
//
Blockly.JavaScript['ggplot_plot'] = (block) => {
    const branch = Blockly.JavaScript.statementToCode(block, "LAYERS")
          .replace(/\]\[/g, '], [')

    const layers = JSON.parse(`[ ${branch.replace(/,\s*$/, '')} ]`)
    const spec = {data: {values: null}, layer: layers}

    const suffix = TbManager.registerSuffix('')
    return `.plot(${block.tbId}, environment, ${JSON.stringify(spec)}) ${suffix}`
  }

//
// Create a single-layer ggplot.
//
Blockly.JavaScript['ggplot_geom_point'] = (block) => {
    const branch = Blockly.JavaScript.statementToCode(block, "MAPPING")
          .replace(/\]\[/g, '], [')
    
    // combine mapping items into one 'encoding'
    // backwards, because this is how it would work in the
    // actual aes() function in R if a user specified more
    // than one mapping (e.g., color)
    const mappingItems = eval(`[ ${branch} ]`);
    const encoding = {}
    for (var i = (mappingItems.length - 1); i >=0; i--) {
        const item = mappingItems[i]
        encoding[item.aesthetic] = {
            _tbId: item._tbId,
            field: item.column,
            type: 'quantitative'
        }
    }

    // generate the vega lite spec
    const spec = {
        '_tbId': block.tbId,
        'mark': 'point',
        'encoding': encoding
      }

    return `${JSON.stringify(spec)} ,`
  }

//
// Map columns to aesthetics.
//
Blockly.JavaScript['ggplot_mapping'] = (block) => {
    const aesthetic = Blockly.JavaScript.quote_(block.getFieldValue('AESTHETIC'))
    const column = Blockly.JavaScript.quote_(block.getFieldValue('COLUMN'))

    return `{
        '_tbId': ${block.tbId},
        aesthetic: ${aesthetic},
        column: ${column}
    },`
  }
