import Report from '../Report.js'
import Result from '../Result.js'
import DatatypeValidation from './DatatypeValidation.js'

class InValidation extends DatatypeValidation {
  constructor (values, datatypes, { factory } = {}) {
    super({ datatypes, factory })

    this.values = new Set(values)
  }

  clone ({ factory } = {}) {
    return new InValidation(this.values, this.datatypes, {
      factory: factory || this.factory
    })
  }

  validate (term) {
    const results = []

    if (!this.values.has(term.value)) {
      const messageStr = `term value "${term.value}" is not included in the list: ${[...this.values].join(',')}`
      const message = [this.factory.literal(messageStr)]

      results.push(new Result({ factory: this.factory, message }))
    }

    return new Report({ results })
  }

  validateSimple (term) {
    return this.values.has(term.value)
  }
}

export default InValidation
