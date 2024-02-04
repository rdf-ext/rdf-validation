import { strictEqual } from 'node:assert'
import rdf from '@rdfjs/data-model'
import { describe, it } from 'mocha'
import DatatypeValidation from '../../lib/term/DatatypeValidation.js'
import { datatypeValidationCloneTests, datatypeValidationTests } from '../support/datatypeValidationTests.js'
import { isReport } from '../support/utils.js'

describe('DatatypeValidation', () => {
  it('should be a constructor', () => {
    strictEqual(typeof DatatypeValidation, 'function')
  })

  datatypeValidationTests(({ datatypes, factory }) => {
    return new DatatypeValidation({ datatypes, factory })
  })

  describe('.clone', () => {
    it('should be a method', () => {
      const validation = new DatatypeValidation()

      strictEqual(typeof validation.clone, 'function')
    })

    datatypeValidationCloneTests(({ datatypes, factory }) => {
      return new DatatypeValidation({ datatypes, factory })
    })
  })

  describe('.validate', () => {
    it('should be a method', () => {
      const validation = new DatatypeValidation()

      strictEqual(typeof validation.validate, 'function')
    })

    it('should return a report', () => {
      const term = rdf.literal('test')
      const validation = new DatatypeValidation()

      const report = validation.validate(term)

      isReport(report)
    })

    it('should return a report with conforms equals true', () => {
      const term = rdf.literal('def')
      const validation = new DatatypeValidation()

      const report = validation.validate(term)

      strictEqual(report.conforms, true)
    })
  })

  describe('.validateSimple', () => {
    it('should be a method', () => {
      const validation = new DatatypeValidation()

      strictEqual(typeof validation.validateSimple, 'function')
    })

    it('should return true', () => {
      const term = rdf.literal('test')
      const validation = new DatatypeValidation()

      const result = validation.validateSimple(term)

      strictEqual(result, true)
    })
  })
})
