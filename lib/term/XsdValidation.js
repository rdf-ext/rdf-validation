import DatatypeValidations from './DatatypeValidations.js'
import * as xsd from './xsd.js'

class XsdValidation extends DatatypeValidations {
  constructor ({ factory } = {}) {
    super({ factory, validations: { ...xsd } })
  }
}

export default XsdValidation
