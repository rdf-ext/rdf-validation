import { strictEqual } from 'node:assert'
import rdf from '@rdfjs/data-model'
import { describe, it } from 'mocha'
import Validation from '../lib/Validation.js'
import * as ns from './support/namespaces.js'
import { isReport } from './support/utils.js'
import { validationCloneTests, validationTests } from './support/validationTests.js'

describe('Validation', () => {
  it('should be a constructor', () => {
    strictEqual(typeof Validation, 'function')
  })

  validationTests(({ factory }) => {
    const instance = new Validation({ factory })

    instance.factory.fromTerm(ns.ex.resource)

    return instance
  })

  describe('.clone', () => {
    it('should be a method', () => {
      const validation = new Validation()

      strictEqual(typeof validation.clone, 'function')
    })

    validationCloneTests(({ factory }) => {
      const instance = new Validation({ factory })

      instance.factory.fromTerm(ns.ex.resource)

      return instance
    })
  })

  describe('.validate', () => {
    it('should be a method', () => {
      const validation = new Validation()

      strictEqual(typeof validation.validate, 'function')
    })

    it('should return a report', () => {
      const term = rdf.literal('test')
      const validation = new Validation()

      const report = validation.validate(term)

      isReport(report)
    })

    it('should return a report with conforms equals true', () => {
      const term = rdf.literal('def')
      const validation = new Validation()

      const report = validation.validate(term)

      strictEqual(report.conforms, true)
    })
  })

  describe('.validateSimple', () => {
    it('should be a method', () => {
      const validation = new Validation()

      strictEqual(typeof validation.validateSimple, 'function')
    })

    it('should return true', () => {
      const term = rdf.literal('test')
      const validation = new Validation()

      const result = validation.validateSimple(term)

      strictEqual(result, true)
    })
  })
})
