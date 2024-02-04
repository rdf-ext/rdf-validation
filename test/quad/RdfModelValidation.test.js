import { strictEqual } from 'node:assert'
import rdf from '@rdfjs/data-model'
import { describe, it } from 'mocha'
import RdfModelValidation from '../../lib/quad/RdfModelValidation.js'
import * as ns from '../support/namespaces.js'
import { isReport } from '../support/utils.js'
import { validationCloneTests, validationTests } from '../support/validationTests.js'

describe('RdfModelValidation', () => {
  it('should be a constructor', () => {
    strictEqual(typeof RdfModelValidation, 'function')
  })

  validationTests(({ factory }) => {
    const instance = new RdfModelValidation({ factory })

    instance.factory.fromTerm(ns.ex.resource)

    return instance
  })

  describe('.clone', () => {
    it('should be a method', () => {
      const validation = new RdfModelValidation()

      strictEqual(typeof validation.clone, 'function')
    })

    validationCloneTests(({ factory }) => {
      const instance = new RdfModelValidation({ factory })

      instance.factory.fromTerm(ns.ex.resource)

      return instance
    })
  })

  describe('.validate', () => {
    it('should be a method', () => {
      const validation = new RdfModelValidation()

      strictEqual(typeof validation.validate, 'function')
    })

    it('should return a report', () => {
      const quad = rdf.quad(ns.ex.resource, ns.ex.property, ns.ex.object)
      const validation = new RdfModelValidation()

      const report = validation.validate(quad)

      isReport(report)
    })

    it('should return a report with conforms equals true if all terms of the quad are named nodes', () => {
      const quad = rdf.quad(ns.ex.resource, ns.ex.property, ns.ex.object, ns.ex.graph)
      const validation = new RdfModelValidation()

      const report = validation.validate(quad)

      strictEqual(report.conforms, true)
    })

    it('should return a report with conforms equals true if the subject of the quad is a blank node', () => {
      const quad = rdf.quad(rdf.blankNode(), ns.ex.property, ns.ex.object, ns.ex.graph)
      const validation = new RdfModelValidation()

      const report = validation.validate(quad)

      strictEqual(report.conforms, true)
    })

    it('should return a report with conforms equals true if the object of the quad is a blank node', () => {
      const quad = rdf.quad(ns.ex.resource, ns.ex.property, rdf.blankNode(), ns.ex.graph)
      const validation = new RdfModelValidation()

      const report = validation.validate(quad)

      strictEqual(report.conforms, true)
    })

    it('should return a report with conforms equals true if the object of the quad is a literal', () => {
      const quad = rdf.quad(ns.ex.resource, ns.ex.property, rdf.literal('test'), ns.ex.graph)
      const validation = new RdfModelValidation()

      const report = validation.validate(quad)

      strictEqual(report.conforms, true)
    })

    it('should return a report with conforms equals true if the graph of the quad is a default graph', () => {
      const quad = rdf.quad(ns.ex.resource, ns.ex.property, ns.ex.object, rdf.defaultGraph())
      const validation = new RdfModelValidation()

      const report = validation.validate(quad)

      strictEqual(report.conforms, true)
    })

    it('should return a report with conforms equals true if the graph of the quad is a blank node', () => {
      const quad = rdf.quad(ns.ex.resource, ns.ex.property, ns.ex.object, rdf.blankNode())
      const validation = new RdfModelValidation()

      const report = validation.validate(quad)

      strictEqual(report.conforms, true)
    })

    it('should return a report with conforms equals false if the subject of the quad is a literal', () => {
      const quad = rdf.quad(rdf.literal('test'), ns.ex.property, ns.ex.object, ns.ex.graph)
      const validation = new RdfModelValidation()

      const report = validation.validate(quad)

      strictEqual(report.conforms, false)
    })

    it('should return a report with conforms equals false if the subject of the quad is a default graph', () => {
      const quad = rdf.quad(rdf.defaultGraph(), ns.ex.property, ns.ex.object, ns.ex.graph)
      const validation = new RdfModelValidation()

      const report = validation.validate(quad)

      strictEqual(report.conforms, false)
    })

    it('should return a report with conforms equals false if the subject of the quad is a variable', () => {
      const quad = rdf.quad(rdf.variable('test'), ns.ex.property, ns.ex.object, ns.ex.graph)
      const validation = new RdfModelValidation()

      const report = validation.validate(quad)

      strictEqual(report.conforms, false)
    })

    it('should return a report with conforms equals false if the predicate of the quad is a blank node', () => {
      const quad = rdf.quad(ns.ex.resource, rdf.blankNode(), ns.ex.object, ns.ex.graph)
      const validation = new RdfModelValidation()

      const report = validation.validate(quad)

      strictEqual(report.conforms, false)
    })

    it('should return a report with conforms equals false if the predicate of the quad is a literal', () => {
      const quad = rdf.quad(ns.ex.resource, rdf.literal('test'), ns.ex.object, ns.ex.graph)
      const validation = new RdfModelValidation()

      const report = validation.validate(quad)

      strictEqual(report.conforms, false)
    })

    it('should return a report with conforms equals false if the predicate of the quad is a default graph', () => {
      const quad = rdf.quad(ns.ex.resource, rdf.defaultGraph(), ns.ex.object, ns.ex.graph)
      const validation = new RdfModelValidation()

      const report = validation.validate(quad)

      strictEqual(report.conforms, false)
    })

    it('should return a report with conforms equals false if the predicate of the quad is a variable', () => {
      const quad = rdf.quad(ns.ex.resource, rdf.variable('test'), ns.ex.object, ns.ex.graph)
      const validation = new RdfModelValidation()

      const report = validation.validate(quad)

      strictEqual(report.conforms, false)
    })

    it('should return a report with conforms equals false if the object of the quad is a default graph', () => {
      const quad = rdf.quad(ns.ex.resource, ns.ex.property, rdf.defaultGraph(), ns.ex.graph)
      const validation = new RdfModelValidation()

      const report = validation.validate(quad)

      strictEqual(report.conforms, false)
    })

    it('should return a report with conforms equals false if the object of the quad is a variable', () => {
      const quad = rdf.quad(ns.ex.resource, ns.ex.property, rdf.variable('test'), ns.ex.graph)
      const validation = new RdfModelValidation()

      const report = validation.validate(quad)

      strictEqual(report.conforms, false)
    })

    it('should return a report with conforms equals false if the graph of the quad is a literal', () => {
      const quad = rdf.quad(ns.ex.resource, ns.ex.property, ns.ex.object, rdf.literal('test'))
      const validation = new RdfModelValidation()

      const report = validation.validate(quad)

      strictEqual(report.conforms, false)
    })

    it('should return a report with conforms equals false if the graph of the quad is a variable', () => {
      const quad = rdf.quad(ns.ex.resource, ns.ex.property, ns.ex.object, rdf.variable('test'))
      const validation = new RdfModelValidation()

      const report = validation.validate(quad)

      strictEqual(report.conforms, false)
    })

    it('should return a report with a result and message for the subject validaton', () => {
      const quad = rdf.quad(rdf.variable('s'), rdf.variable('p'), rdf.variable('o'), rdf.variable('g'))
      const validation = new RdfModelValidation()

      const report = validation.validate(quad)

      strictEqual(report.results.length, 4)
      strictEqual(report.results[0].message[0].value, 'term type "Variable" is not included in the list: BlankNode,NamedNode')
      strictEqual(report.results[1].message[0].value, 'term type "Variable" is not included in the list: NamedNode')
      strictEqual(report.results[2].message[0].value, 'term type "Variable" is not included in the list: BlankNode,Literal,NamedNode')
      strictEqual(report.results[3].message[0].value, 'term type "Variable" is not included in the list: BlankNode,DefaultGraph,NamedNode')
    })
  })

  describe('.validateSimple', () => {
    it('should be a method', () => {
      const validation = new RdfModelValidation()

      strictEqual(typeof validation.validateSimple, 'function')
    })

    it('should return a report with conforms equals true if all terms of the quad are named nodes', () => {
      const quad = rdf.quad(ns.ex.resource, ns.ex.property, ns.ex.object, ns.ex.graph)
      const validation = new RdfModelValidation()

      const result = validation.validateSimple(quad)

      strictEqual(result, true)
    })

    it('should return a report with conforms equals true if the subject of the quad is a blank node', () => {
      const quad = rdf.quad(rdf.blankNode(), ns.ex.property, ns.ex.object, ns.ex.graph)
      const validation = new RdfModelValidation()

      const result = validation.validateSimple(quad)

      strictEqual(result, true)
    })

    it('should return a report with conforms equals true if the object of the quad is a blank node', () => {
      const quad = rdf.quad(ns.ex.resource, ns.ex.property, rdf.blankNode(), ns.ex.graph)
      const validation = new RdfModelValidation()

      const result = validation.validateSimple(quad)

      strictEqual(result, true)
    })

    it('should return a report with conforms equals true if the object of the quad is a literal', () => {
      const quad = rdf.quad(ns.ex.resource, ns.ex.property, rdf.literal('test'), ns.ex.graph)
      const validation = new RdfModelValidation()

      const result = validation.validateSimple(quad)

      strictEqual(result, true)
    })

    it('should return a report with conforms equals true if the graph of the quad is a default graph', () => {
      const quad = rdf.quad(ns.ex.resource, ns.ex.property, ns.ex.object, rdf.defaultGraph())
      const validation = new RdfModelValidation()

      const result = validation.validateSimple(quad)

      strictEqual(result, true)
    })

    it('should return a report with conforms equals true if the graph of the quad is a blank node', () => {
      const quad = rdf.quad(ns.ex.resource, ns.ex.property, ns.ex.object, rdf.blankNode())
      const validation = new RdfModelValidation()

      const result = validation.validateSimple(quad)

      strictEqual(result, true)
    })

    it('should return a report with conforms equals false if the subject of the quad is a literal', () => {
      const quad = rdf.quad(rdf.literal('test'), ns.ex.property, ns.ex.object, ns.ex.graph)
      const validation = new RdfModelValidation()

      const result = validation.validateSimple(quad)

      strictEqual(result, false)
    })

    it('should return a report with conforms equals false if the subject of the quad is a default graph', () => {
      const quad = rdf.quad(rdf.defaultGraph(), ns.ex.property, ns.ex.object, ns.ex.graph)
      const validation = new RdfModelValidation()

      const result = validation.validateSimple(quad)

      strictEqual(result, false)
    })

    it('should return a report with conforms equals false if the subject of the quad is a variable', () => {
      const quad = rdf.quad(rdf.variable('test'), ns.ex.property, ns.ex.object, ns.ex.graph)
      const validation = new RdfModelValidation()

      const result = validation.validateSimple(quad)

      strictEqual(result, false)
    })

    it('should return a report with conforms equals false if the predicate of the quad is a blank node', () => {
      const quad = rdf.quad(ns.ex.resource, rdf.blankNode(), ns.ex.object, ns.ex.graph)
      const validation = new RdfModelValidation()

      const result = validation.validateSimple(quad)

      strictEqual(result, false)
    })

    it('should return a report with conforms equals false if the predicate of the quad is a literal', () => {
      const quad = rdf.quad(ns.ex.resource, rdf.literal('test'), ns.ex.object, ns.ex.graph)
      const validation = new RdfModelValidation()

      const result = validation.validateSimple(quad)

      strictEqual(result, false)
    })

    it('should return a report with conforms equals false if the predicate of the quad is a default graph', () => {
      const quad = rdf.quad(ns.ex.resource, rdf.defaultGraph(), ns.ex.object, ns.ex.graph)
      const validation = new RdfModelValidation()

      const result = validation.validateSimple(quad)

      strictEqual(result, false)
    })

    it('should return a report with conforms equals false if the predicate of the quad is a variable', () => {
      const quad = rdf.quad(ns.ex.resource, rdf.variable('test'), ns.ex.object, ns.ex.graph)
      const validation = new RdfModelValidation()

      const result = validation.validateSimple(quad)

      strictEqual(result, false)
    })

    it('should return a report with conforms equals false if the object of the quad is a default graph', () => {
      const quad = rdf.quad(ns.ex.resource, ns.ex.property, rdf.defaultGraph(), ns.ex.graph)
      const validation = new RdfModelValidation()

      const result = validation.validateSimple(quad)

      strictEqual(result, false)
    })

    it('should return a report with conforms equals false if the object of the quad is a variable', () => {
      const quad = rdf.quad(ns.ex.resource, ns.ex.property, rdf.variable('test'), ns.ex.graph)
      const validation = new RdfModelValidation()

      const result = validation.validateSimple(quad)

      strictEqual(result, false)
    })

    it('should return a report with conforms equals false if the graph of the quad is a literal', () => {
      const quad = rdf.quad(ns.ex.resource, ns.ex.property, ns.ex.object, rdf.literal('test'))
      const validation = new RdfModelValidation()

      const result = validation.validateSimple(quad)

      strictEqual(result, false)
    })

    it('should return a report with conforms equals false if the graph of the quad is a variable', () => {
      const quad = rdf.quad(ns.ex.resource, ns.ex.property, ns.ex.object, rdf.variable('test'))
      const validation = new RdfModelValidation()

      const result = validation.validateSimple(quad)

      strictEqual(result, false)
    })
  })
})
