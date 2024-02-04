import { deepStrictEqual, strictEqual } from 'node:assert'
import rdf from '@rdfjs/data-model'
import { describe, it } from 'mocha'
import InValidation from '../../lib/term/InValidation.js'
import { datatypeValidationCloneTests, datatypeValidationTests } from '../support/datatypeValidationTests.js'
import { isReport } from '../support/utils.js'

describe('InValidation', () => {
  it('should be a constructor', () => {
    strictEqual(typeof InValidation, 'function')
  })

  datatypeValidationTests(({ datatypes, factory }) => {
    return new InValidation(['a', 'b'], datatypes, { factory })
  })

  it('should assign the given values', () => {
    const validation = new InValidation(['a', 'b'])

    deepStrictEqual([...validation.values], ['a', 'b'])
  })

  describe('.clone', () => {
    it('should be a method', () => {
      const validation = new InValidation()

      strictEqual(typeof validation.clone, 'function')
    })

    datatypeValidationCloneTests(({ datatypes, factory }) => {
      return new InValidation(['a', 'b'], datatypes, { factory })
    })

    it('should assign the given values', () => {
      const validation = new InValidation(['a', 'b'])

      const clone = validation.clone()

      deepStrictEqual([...clone.values], ['a', 'b'])
    })
  })

  describe('.validate', () => {
    it('should be a method', () => {
      const validation = new InValidation()

      strictEqual(typeof validation.validate, 'function')
    })

    it('should return a report', () => {
      const term = rdf.literal('test')
      const validation = new InValidation()

      const report = validation.validate(term)

      isReport(report)
    })

    it('should return a report with conforms equals true if the term value is in the given list', () => {
      const term = rdf.literal('def')
      const validation = new InValidation(['abc', 'def', 'ghi'])

      const report = validation.validate(term)

      strictEqual(report.conforms, true)
    })

    it('should return a report with conforms equals false if the term value is not in the given list', () => {
      const term = rdf.literal('test')
      const validation = new InValidation(['abc', 'def', 'ghi'])

      const report = validation.validate(term)

      strictEqual(report.conforms, false)
    })

    it('should return a report with a result and message if the term value is not in the given list', () => {
      const term = rdf.literal('test')
      const validation = new InValidation(['abc', 'def', 'ghi'])

      const report = validation.validate(term)

      strictEqual(report.results.length, 1)
      strictEqual(report.results[0].message[0].value, 'term value "test" is not included in the list: abc,def,ghi')
    })
  })

  describe('.validateSimple', () => {
    it('should be a method', () => {
      const validation = new InValidation()

      strictEqual(typeof validation.validateSimple, 'function')
    })

    it('should return true if the term value is in the given list', () => {
      const term = rdf.literal('def')
      const validation = new InValidation(['abc', 'def', 'ghi'])

      const result = validation.validateSimple(term)

      strictEqual(result, true)
    })

    it('should return false if the term value is not in the given list', () => {
      const term = rdf.literal('test')
      const validation = new InValidation(['abc', 'def', 'ghi'])

      const result = validation.validateSimple(term)

      strictEqual(result, false)
    })
  })
})
