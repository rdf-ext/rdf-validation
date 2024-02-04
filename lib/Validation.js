import defaultFactory from '@rdfjs/data-model'
import Report from './Report.js'

class Validation {
  constructor ({ factory = defaultFactory } = {}) {
    this.factory = factory
  }

  clone ({ factory } = {}) {
    return new Validation({
      factory: factory || this.factory
    })
  }

  validate () {
    return new Report()
  }

  validateSimple () {
    return true
  }
}

export default Validation
