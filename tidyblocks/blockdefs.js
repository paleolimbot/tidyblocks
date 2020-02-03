
class TidyBlock {

  constructor(args = {}) {
    const keyArgs = Object.keys(args)
    for (var i = 0; i < keyArgs.length; i++) {
      this[keyArgs[i]] = args[keyArgs[i]]
    }
  }

  blocklyDefinition() {
    return {}
  }

  blocklyToObject(block, blockly) {
    return {
      _id: block.tbId,
      _type: block.type
    }
  }

  blocklyBranchToArray(block, field, blockly) {
    const branch = blockly.JavaScript.statementToCode(block, field)
      .replace(/\]\[/g, '], [')

    return JSON.parse(`[ ${branch.replace(/,\s*$/, '')} ]`)
  }

  validate() {

  }

  evaluate(environment) {

  }

  translate_r() {

  }

  translate_python() {

  }

}

class BlockLibrary {
  
  constructor() {
    this.classes = {}
  }

  register(blockClass) {
    const emptyBlock = new blockClass()
    this.classes[emptyBlock.definition().type] = blockClass
    return this
  }

  blocklyDefineAll(blockly) {
    const types = Object.keys(this.classes)
    for (var i = 0; i < types.length; i++) {
      const emptyBlock = new this.classes[types[i]]()

      // define UI
      blockly.defineBlocksWithJsonArray([
        emptyBlock.definition()
      ])

      // define handler
      blockly.JavaScript[types[i]] = (block) => {
        const obj = emptyBlock.blocklyToObject(block)
        return JSON.stringify(obj)
      }
    }
  }

  blocklyToObject(block, blockly) {
     const emptyBlock = new this.classes[block.type]()
     return emptyBlock.blocklyToObject(block, blockly)
  }

  objectToBlock(obj) {
    return new this.classes[obj._type](obj)
  }

}

class SyntaxTree {

  constructor(library, blockObjects) {
    this.blocks = {}
    this.chains = []

    if (blockObjects.length === 0) {
      return
    }
    
    let previousBlock = null
    let chainId = -1

    for (var i = 0; i < blockObjects.length; i++) {
      let blockObject = blockObjects[i]
      let block = library.objectToBlock(blockObject)
      this.blocks[blockObject._id] = block
      
      if (blockObject._start === true) {
        chainId++
        this.chains[chainId] = []
      } else {
        block._data =  previousBlock
      }

      this.chains[chainId][this.chains[chainId].length] = block
      previousBlock = block
    }
  }

  evaluate(chainId, environment) {
    let chain = this.chains[chainId]
    return chain[chain.length - 1].evaluate(environment)
  }

}

// ----- define some blocks ------

class DataIrisBlock extends TidyBlock {

  definition() {
    return {
      type: 'data_iris',
      message0: 'Iris dataset',
      nextStatement: null,
      style: 'data_blocks',
      hat: 'cap',
      tooltip: 'iris data'
    }
  }

  blocklyToObject(block, blockly) {
    const obj = super.blocklyToObject(block, blockly)
    obj._start = true
    return obj
  }

  evaluate(environment) {
    return environment.readCSV('iris.csv', true)
  }

  translate_r() {
    'iris'
  }

}

class DropBlock extends TidyBlock {

  definition() {
    return {
      type: 'transform_drop',
      message0: 'Drop %1',
      args0: [
        {
          type: 'field_input',
          name: 'MULTIPLE_COLUMNS',
          text: 'column, column'
        }
      ],
      inputsInline: true,
      previousStatement: null,
      nextStatement: null,
      style: 'transform_blocks',
      tooltip: 'drop columns by name',
      helpUrl: '',
      extensions: ['validate_MULTIPLE_COLUMNS']
    }
  }

  blocklyToObject(block, blockly) {
    const obj = super.blocklyToObject(block, blockly)
    obj.columns = block.getFieldValue('MULTIPLE_COLUMNS').split(/\s*,\s*/)
    return obj
  }

  evaluate(environment) {
    return this._data.evaluate(environment).drop(0, this.columns)
  }

  translate_r() {
    return `${this._data.translate_r()}  %>% drop(${this.columns.join(', ')})`
  }

}

// ----- register the blocks -------

const blockLibrary = new BlockLibrary()
blockLibrary.register(DataIrisBlock)
blockLibrary.register(DropBlock)
blockLibrary.blocklyDefineAll(Blockly)
