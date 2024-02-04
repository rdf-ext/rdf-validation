import { strictEqual } from 'node:assert'
import rdf from '@rdfjs/data-model'
import { describe, it } from 'mocha'
import PatternValidation from '../../lib/term/PatternValidation.js'
import { datatypeValidationCloneTests, datatypeValidationTests } from '../support/datatypeValidationTests.js'
import { isReport } from '../support/utils.js'

describe('PatternValidation', () => {
  it('should be a constructor', () => {
    strictEqual(typeof PatternValidation, 'function')
  })

  datatypeValidationTests(({ datatypes, factory }) => {
    return new PatternValidation(/.*/, datatypes, { factory })
  })

  it('should assign the given pattern', () => {
    const validation = new PatternValidation(/.*/)

    strictEqual(validation.patterns.length, 1)
    strictEqual(validation.patterns[0].toString(), '/.*/')
  })

  it('should assign the given array of patterns', () => {
    const validation = new PatternValidation([/.*/, /[0-9]/])

    strictEqual(validation.patterns.length, 2)
    strictEqual(validation.patterns[0].toString(), '/.*/')
    strictEqual(validation.patterns[1].toString(), '/[0-9]/')
  })

  describe('.clone', () => {
    it('should be a method', () => {
      const validation = new PatternValidation(/.*/)

      strictEqual(typeof validation.clone, 'function')
    })

    datatypeValidationCloneTests(({ datatypes, factory }) => {
      return new PatternValidation(/.*/, datatypes, { factory })
    })

    it('should assign the given array of patterns', () => {
      const validation = new PatternValidation([/.*/, /[0-9]/])

      const clone = validation.clone()

      strictEqual(clone.patterns.length, 2)
      strictEqual(clone.patterns[0].toString(), '/.*/')
      strictEqual(clone.patterns[1].toString(), '/[0-9]/')
    })
  })

  describe('.validate', () => {
    it('should be a method', () => {
      const validation = new PatternValidation(/.*/)

      strictEqual(typeof validation.validate, 'function')
    })

    it('should return a report', () => {
      const term = rdf.literal('test')
      const validation = new PatternValidation(/.*/)

      const report = validation.validate(term)

      isReport(report)
    })

    it('should return a report with conforms equals true if the pattern matches', () => {
      const term = rdf.literal('test')
      const validation = new PatternValidation(/.*/)

      const report = validation.validate(term)

      strictEqual(report.conforms, true)
    })

    it('should return a report with conforms equals false if the pattern doesn\'t match', () => {
      const term = rdf.literal('test')
      const validation = new PatternValidation(/[^tes]/)

      const report = validation.validate(term)

      strictEqual(report.conforms, false)
    })

    it('should return a report with a result and message if the pattern doesn\'t match', () => {
      const term = rdf.literal('test')
      const validation = new PatternValidation(/[^tes]/)

      const report = validation.validate(term)

      strictEqual(report.results.length, 1)
      strictEqual(report.results[0].message[0].value, 'term value "test" matches pattern "/[^tes]/"')
    })

    it('should return a report with a result and message for each pattern that doesn\'t match', () => {
      const term = rdf.literal('test')
      const validation = new PatternValidation([/[^tes]/, /[0-9]/])

      const report = validation.validate(term)

      strictEqual(report.results.length, 2)
      strictEqual(report.results[0].message[0].value, 'term value "test" matches pattern "/[^tes]/"')
      strictEqual(report.results[1].message[0].value, 'term value "test" matches pattern "/[0-9]/"')
    })
  })
})
