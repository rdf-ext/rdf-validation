import Report from '../Report.js'
import TermTypeValidation from '../term/TermTypeValidation.js'
import Validation from '../Validation.js'

class RdfModelValidation extends Validation {
  constructor ({ factory } = {}) {
    super({ factory })

    this.subjectValidation = new TermTypeValidation(['BlankNode', 'NamedNode'], { factory })
    this.predicateValidation = new TermTypeValidation(['NamedNode'], { factory })
    this.objectValidation = new TermTypeValidation(['BlankNode', 'Literal', 'NamedNode'], { factory })
    this.graphValidation = new TermTypeValidation(['BlankNode', 'DefaultGraph', 'NamedNode'], { factory })
  }

  clone ({ factory } = {}) {
    return new RdfModelValidation({
      factory: factory || this.factory
    })
  }

  validate (quad) {
    const results = [
      ...this.subjectValidation.validate(quad.subject).results,
      ...this.predicateValidation.validate(quad.predicate).results,
      ...this.objectValidation.validate(quad.object).results,
      ...this.graphValidation.validate(quad.graph).results
    ]

    return new Report({ results })
  }

  validateSimple (quad) {
    if (!this.subjectValidation.validateSimple(quad.subject)) {
      return false
    }

    if (!this.predicateValidation.validateSimple(quad.predicate)) {
      return false
    }

    if (!this.objectValidation.validateSimple(quad.object)) {
      return false
    }

    if (!this.graphValidation.validateSimple(quad.graph)) {
      return false
    }

    return true
  }
}

export default RdfModelValidation
