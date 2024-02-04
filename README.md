# rdf-validation

[![build status](https://img.shields.io/github/actions/workflow/status/rdf-ext/rdf-validation/test.yaml?branch=master)](https://github.com/rdf-ext/rdf-validation/actions/workflows/test.yaml)
[![npm version](https://img.shields.io/npm/v/rdf-validation.svg)](https://www.npmjs.com/package/rdf-validation)

`rdf-validation` is a modular library to validate RDF data provided as RDF/JS objects.
Different modules can be combined to tailor a validation according to personal needs.

## Install

```bash
npm install --save rdf-validation
```

## Usage

The package exports multiple validations.
All validations are classes, and it requires creating instances for them.
A validation object has a `.validate()` and a `.validateSimple()` method.
`.validate()` returns a `Report` with results for different checks and includes a message.
`.validateSimple()` is an optimized method that returns only `true` if the given object is valid and `false` in case it is not.

### Example

See the following example on how to check if quads match the RDF Model and literal values are valid according to the XSD specification:


```js
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
```

See the `examples` folder for more examples.
