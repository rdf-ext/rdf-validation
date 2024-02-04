import rdf from 'rdf-ext'
import { RdfModelValidation, XsdValidation } from '../index.js'

const rdfModelValidation = new RdfModelValidation({ factory: rdf })
const xsdValidation = new XsdValidation({ factory: rdf })

const quad = rdf.quad(
  rdf.literal('resource'),
  rdf.namedNode('https://example.org/date'),
  rdf.literal('1.1.2001', rdf.namedNode('http://www.w3.org/2001/XMLSchema#date'))
)

const rdfReport = rdfModelValidation.validate(quad)
console.log(`conforms: ${rdfReport.conforms}`)
console.log(`message: ${rdfReport.results[0].message[0]}`)
console.log(`validateSimple: ${rdfModelValidation.validateSimple(quad)}`)

const xsdReport = xsdValidation.validate(quad.object)
console.log(`conforms: ${xsdReport.conforms}`)
console.log(`message: ${xsdReport.results[0].message[0]}`)
console.log(`validateSimple: ${xsdValidation.validateSimple(quad.object)}`)
