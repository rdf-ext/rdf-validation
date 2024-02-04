import { strictEqual } from 'node:assert'
import rdf from '@rdfjs/data-model'
import { describe, it } from 'mocha'
import IntegerValidation from '../../lib/term/IntegerValidation.js'
import { datatypeValidationCloneTests, datatypeValidationTests } from '../support/datatypeValidationTests.js'
import { isReport } from '../support/utils.js'

describe('IntegerValidation', () => {
  it('should be a constructor', () => {
    strictEqual(typeof IntegerValidation, 'function')
  })

  datatypeValidationTests(({ datatypes, factory }) => {
    return new IntegerValidation('0', '1', datatypes, { factory })
  })

  it('should assign the given minInclusive value', () => {
    const validation = new IntegerValidation('123')

    strictEqual(validation.minInclusive, BigInt('123'))
  })

  it('should assign the given maxInclusive value', () => {
    const validation = new IntegerValidation('123', '1234')

    strictEqual(validation.maxInclusive, BigInt('1234'))
  })

  describe('.clone', () => {
    it('should be a method', () => {
      const validation = new IntegerValidation()

      strictEqual(typeof validation.clone, 'function')
    })

    datatypeValidationCloneTests(({ datatypes, factory }) => {
      return new IntegerValidation('0', '1', datatypes, { factory })
    })

    it('should assign the given minInclusive value', () => {
      const validation = new IntegerValidation('123')

      const clone = validation.clone()

      strictEqual(clone.minInclusive, BigInt('123'))
    })

    it('should assign the given maxInclusive value', () => {
      const validation = new IntegerValidation('123', '1234')

      const clone = validation.clone()

      strictEqual(clone.maxInclusive, BigInt('1234'))
    })
  })

  describe('.validate', () => {
    it('should be a method', () => {
      const validation = new IntegerValidation()

      strictEqual(typeof validation.validate, 'function')
    })

    it('should return a report', () => {
      const term = rdf.literal('123')
      const validation = new IntegerValidation()

      const report = validation.validate(term)

      isReport(report)
    })

    it('should return a report with conforms equals true if the term is an integer', () => {
      const term = rdf.literal('123')
      const validation = new IntegerValidation()

      const report = validation.validate(term)

      strictEqual(report.conforms, true)
    })

    it('should return a report with conforms equals false if the term is not an integer', () => {
      const term = rdf.literal('test')
      const validation = new IntegerValidation()

      const report = validation.validate(term)

      strictEqual(report.conforms, false)
    })

    it('should return a report with a result and message if the term doesn\'t match the integer pattern', () => {
      const term = rdf.literal('test')
      const validation = new IntegerValidation()

      const report = validation.validate(term)

      strictEqual(report.results.length, 1)
      strictEqual(report.results[0].message[0].value, 'term value "test" matches pattern "/^([-+]?[0-9]+)$/"')
    })

    it('should return a report with a result and message if the value is less than minInclusive', () => {
      const term = rdf.literal('123')
      const validation = new IntegerValidation('1234')

      const report = validation.validate(term)

      strictEqual(report.results[1].message[0].value, 'term value "123" is less than "1234"')
    })

    it('should return a report with a result and message if the value is greater than maxInclusive', () => {
      const term = rdf.literal('1234')
      const validation = new IntegerValidation('0', '123')

      const report = validation.validate(term)

      strictEqual(report.results[1].message[0].value, 'term value "1234" is greater than "123"')
    })
  })

  describe('.validateSimple', () => {
    it('should be a method', () => {
      const validation = new IntegerValidation()

      strictEqual(typeof validation.validateSimple, 'function')
    })

    it('should return true if the term is an integer', () => {
      const term = rdf.literal('123')
      const validation = new IntegerValidation()

      const result = validation.validateSimple(term)

      strictEqual(result, true)
    })

    it('should return false if the term is not an integer', () => {
      const term = rdf.literal('test')
      const validation = new IntegerValidation()

      const result = validation.validateSimple(term)

      strictEqual(result, false)
    })

    it('should return false if the value is less than minInclusive', () => {
      const term = rdf.literal('123')
      const validation = new IntegerValidation('1234')

      const result = validation.validateSimple(term)

      strictEqual(result, false)
    })

    it('should return false if the value is greater than maxInclusive', () => {
      const term = rdf.literal('1234')
      const validation = new IntegerValidation('0', '123')

      const result = validation.validateSimple(term)

      strictEqual(result, false)
    })
  })
})
