import defaultFactory from '@rdfjs/data-model'
import TermMap from '@rdfjs/term-map'
import Report from '../Report.js'

class DatatypeValidations {
  constructor ({ factory = defaultFactory, validations } = {}) {
    this.factory = factory
    this.validations = new TermMap()

    if (validations) {
      for (const validation of Object.values(validations)) {
        const clone = validation.clone({ factory: this.factory })

        for (const datatype of clone.datatypes) {
          this.validations.set(datatype, clone)
        }
      }
    }
  }

  validate (term) {
    const validation = this.validations.get(term.datatype)

    if (!validation) {
      return new Report()
    }

    return validation.validate(term)
  }

  validateSimple (term) {
    const validation = this.validations.get(term.datatype)

    if (!validation) {
      return true
    }

    return validation.validateSimple(term)
  }
}

export default DatatypeValidations
