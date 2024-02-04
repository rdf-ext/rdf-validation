import { strictEqual } from 'node:assert'
import { it } from 'mocha'
import * as ns from './namespaces.js'
import { validationCloneTests, validationTests } from './validationTests.js'

function datatypeValidationCloneTests (create) {
  validationCloneTests(create)

  it('should assign the given array of datatypes', () => {
    const validation = create({ datatypes: [ns.ex.datatype1, ns.ex.datatype2] })

    const clone = validation.clone()

    strictEqual(clone.datatypes.length, 2)
    strictEqual(clone.datatypes[0].equals(ns.ex.datatype1), true)
    strictEqual(clone.datatypes[1].equals(ns.ex.datatype2), true)
  })
}

function datatypeValidationTests (create) {
  validationTests(create)

  it('should assign the given datatype', () => {
    const validation = create({ datatypes: ns.ex.datatype })

    strictEqual(validation.datatypes.length, 1)
    strictEqual(validation.datatypes[0].equals(ns.ex.datatype), true)
  })

  it('should assign the given array of datatypes', () => {
    const validation = create({ datatypes: [ns.ex.datatype1, ns.ex.datatype2] })

    strictEqual(validation.datatypes.length, 2)
    strictEqual(validation.datatypes[0].equals(ns.ex.datatype1), true)
    strictEqual(validation.datatypes[1].equals(ns.ex.datatype2), true)
  })
}

export {
  datatypeValidationCloneTests,
  datatypeValidationTests
}
