import * as ns from '../namespaces.js'
import Report from '../Report.js'
import Result from '../Result.js'
import PatternValidation from './PatternValidation.js'

const integerPattern = /^([-+]?[0-9]+)$/

class IntegerValidation extends PatternValidation {
  constructor (minInclusive = null, maxInclusive = null, datatypes, { factory } = {}) {
    super(integerPattern, datatypes, { factory })

    this.maxInclusive = null
    this.minInclusive = null

    if (typeof maxInclusive === 'string') {
      this.maxInclusive = BigInt(maxInclusive)
    }

    if (typeof minInclusive === 'string') {
      this.minInclusive = BigInt(minInclusive)
    }
  }

  clone ({ factory } = {}) {
    return new IntegerValidation(
      this.minInclusive?.toString(),
      this.maxInclusive?.toString(),
      this.datatypes, {
        factory: factory || this.factory
      }
    )
  }

  validate (term) {
    const results = super.validate(term).results

    if (!ns.shn.Debug.equals(results[0].severity)) {
      return new Report({ results })
    }

    const value = BigInt(term.value)

    if (this.minInclusive !== null && value < this.minInclusive) {
      const messageStr = `term value "${term.value}" is less than "${this.minInclusive.toString()}"`
      const message = [this.factory.literal(messageStr)]

      results.push(new Result({ factory: this.factory, message }))
    }

    if (this.maxInclusive !== null && value > this.maxInclusive) {
      const messageStr = `term value "${term.value}" is greater than "${this.maxInclusive.toString()}"`
      const message = [this.factory.literal(messageStr)]

      results.push(new Result({ factory: this.factory, message }))
    }

    return new Report({ results })
  }

  validateSimple (term) {
    if (!super.validateSimple(term)) {
      return false
    }

    const value = BigInt(term.value)

    if (this.minInclusive !== null && value < this.minInclusive) {
      return false
    }

    if (this.maxInclusive !== null && value > this.maxInclusive) {
      return false
    }

    return true
  }
}

export default IntegerValidation
