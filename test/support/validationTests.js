import { strictEqual } from 'node:assert'
import rdf from '@rdfjs/data-model'
import { it } from 'mocha'
import * as ns from './namespaces.js'

function validationCloneTests (create) {
  it('should return a new instance', () => {
    const validation = create({})

    const clone = validation.clone()

    strictEqual(clone === validation, false)
  })

  it('should assign the factory given to the constructor to the new instance', () => {
    const factory = {
      fromTerm: term => rdf.fromTerm(term),
      literal: (...args) => rdf.literal(...args)
    }
    const validation = create({ factory })

    const clone = validation.clone()

    strictEqual(clone.factory, factory)
  })

  it('should assign the given factory to the new instance', () => {
    const factory = {
      fromTerm: term => rdf.fromTerm(term),
      literal: (...args) => rdf.literal(...args)
    }
    const validation = create({})

    const clone = validation.clone({ factory })

    strictEqual(clone.factory, factory)
  })
}

function validationTests (create) {
  it('should use the given factory', () => {
    let count = 0
    const factory = {
      fromTerm: term => {
        count++

        return rdf.fromTerm(term)
      },
      literal: (...args) => rdf.literal(...args)
    }

    create({ datatypes: ns.ex.datatype, factory })

    strictEqual(count, 1)
  })
}

export {
  validationCloneTests,
  validationTests
}
