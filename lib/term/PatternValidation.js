import * as ns from '../namespaces.js'
import Report from '../Report.js'
import Result from '../Result.js'
import DatatypeValidation from './DatatypeValidation.js'

class PatternValidation extends DatatypeValidation {
  constructor (patterns, datatypes, { factory } = {}) {
    super({ datatypes, factory })

    this.message = [this.factory.literal('term value {$this} matches pattern {$pattern}')]
    this.patterns = Array.isArray(patterns) ? patterns : [patterns]
  }

  clone ({ factory } = {}) {
    return new PatternValidation(this.patterns, this.datatypes, {
      factory: factory || this.factory
    })
  }

  validate (term) {
    const results = this.patterns.map(pattern => {
      let severity

      if (pattern.test(term.value)) {
        severity = ns.shn.Debug
      }

      const args = {
        pattern: this.factory.literal(pattern.toString()),
        this: term
      }

      return new Result({
        args,
        factory: this.factory,
        message: this.message,
        severity
      })
    })

    return new Report({ results })
  }

  validateSimple (term) {
    return this.patterns.every(pattern => pattern.test(term.value))
  }
}

export default PatternValidation
