import Validation from '../Validation.js'

class DatatypeValidation extends Validation {
  constructor ({ datatypes, factory } = {}) {
    super({ factory })

    this.datatypes = []

    for (const datatype of (Array.isArray(datatypes) ? datatypes : [datatypes])) {
      if (datatype) {
        this.datatypes.push(this.factory.fromTerm(datatype))
      }
    }
  }

  clone ({ factory } = {}) {
    return new DatatypeValidation({
      datatypes: this.datatypes,
      factory: factory || this.factory
    })
  }
}

export default DatatypeValidation
