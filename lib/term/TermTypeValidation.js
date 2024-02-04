import Report from '../Report.js'
import Result from '../Result.js'
import Validation from '../Validation.js'

class TermTypeValidation extends Validation {
  constructor (termTypes, { factory } = {}) {
    super({ factory })

    this.termTypes = new Set(termTypes)
  }

  clone ({ factory } = {}) {
    return new TermTypeValidation(this.termTypes, {
      factory: factory || this.factory
    })
  }

  validate (term) {
    const results = []

    if (!this.termTypes.has(term.termType)) {
      const messageStr = `term type "${term.termType}" is not included in the list: ${[...this.termTypes].join(',')}`
      const message = [this.factory.literal(messageStr)]

      results.push(new Result({ factory: this.factory, message }))
    }

    return new Report({ results })
  }

  validateSimple (term) {
    return this.termTypes.has(term.termType)
  }
}

export default TermTypeValidation
