import { strictEqual } from 'node:assert'
import rdf from '@rdfjs/data-model'
import { it } from 'mocha'

function runTestCases ({ testCases, validation }) {
  for (const [strings, datatype, expected] of testCases) {
    const [, datatypeLabel] = datatype.value.match(/[#/]([^#/]*)$/)
    const expectedString = expected ? 'valid' : 'invalid'

    for (const string of Array.isArray(strings) ? strings : [strings]) {
      it(`validates a ${datatypeLabel} term with the value "${string}" as ${expectedString}`, () => {
        const term = rdf.literal(string, datatype)

        strictEqual(validation.validate(term).conforms, expected)
        strictEqual(validation.validateSimple(term), expected)
      })
    }
  }
}

export default runTestCases
