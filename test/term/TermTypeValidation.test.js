import { deepStrictEqual, strictEqual } from 'node:assert'
import rdf from '@rdfjs/data-model'
import { describe, it } from 'mocha'
import TermTypeValidation from '../../lib/term/TermTypeValidation.js'
import * as ns from '../support/namespaces.js'
import { isReport } from '../support/utils.js'
import { validationCloneTests, validationTests } from '../support/validationTests.js'

describe('TermTypeValidation', () => {
  it('should be a constructor', () => {
    strictEqual(typeof TermTypeValidation, 'function')
  })

  validationTests(({ factory }) => {
    const instance = new TermTypeValidation(['BlankNode', 'NamedNode'], { factory })

    instance.factory.fromTerm(ns.ex.resource)

    return instance
  })

  it('should assign the given termTypes', () => {
    const validation = new TermTypeValidation(['BlankNode', 'NamedNode'])

    deepStrictEqual([...validation.termTypes], ['BlankNode', 'NamedNode'])
  })

  describe('.clone', () => {
    it('should be a method', () => {
      const validation = new TermTypeValidation()

      strictEqual(typeof validation.clone, 'function')
    })

    validationCloneTests(({ factory }) => {
      const instance = new TermTypeValidation(['BlankNode', 'NamedNode'], { factory })

      instance.factory.fromTerm(ns.ex.resource)

      return instance
    })

    it('should assign the given termTypes', () => {
      const validation = new TermTypeValidation(['BlankNode', 'NamedNode'])

      const clone = validation.clone()

      deepStrictEqual([...clone.termTypes], ['BlankNode', 'NamedNode'])
    })
  })

  describe('.validate', () => {
    it('should be a method', () => {
      const validation = new TermTypeValidation()

      strictEqual(typeof validation.validate, 'function')
    })

    it('should return a report', () => {
      const term = rdf.literal('test')
      const validation = new TermTypeValidation()

      const report = validation.validate(term)

      isReport(report)
    })

    it('should return a report with conforms equals true if the term type is in the given list', () => {
      const term = rdf.literal('test')
      const validation = new TermTypeValidation(['Literal', 'NamedNode'])

      const report = validation.validate(term)

      strictEqual(report.conforms, true)
    })

    it('should return a report with conforms equals false if the term type is not in the given list', () => {
      const term = rdf.literal('test')
      const validation = new TermTypeValidation(['BlankNode', 'NamedNode'])

      const report = validation.validate(term)

      strictEqual(report.conforms, false)
    })

    it('should return a report with a result and message if the term type is not in the given list', () => {
      const term = rdf.literal('test')
      const validation = new TermTypeValidation(['BlankNode', 'NamedNode'])

      const report = validation.validate(term)

      strictEqual(report.results.length, 1)
      strictEqual(report.results[0].message[0].value, 'term type "Literal" is not included in the list: BlankNode,NamedNode')
    })
  })

  describe('.validateSimple', () => {
    it('should be a method', () => {
      const validation = new TermTypeValidation()

      strictEqual(typeof validation.validateSimple, 'function')
    })

    it('should return true if the term type is in the given list', () => {
      const term = rdf.literal('test')
      const validation = new TermTypeValidation(['Literal', 'NamedNode'])

      const result = validation.validateSimple(term)

      strictEqual(result, true)
    })

    it('should return false if the term type is not in the given list', () => {
      const term = rdf.literal('test')
      const validation = new TermTypeValidation(['BlankNode', 'NamedNode'])

      const result = validation.validateSimple(term)

      strictEqual(result, false)
    })
  })
})
