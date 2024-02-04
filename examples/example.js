import rdf from 'rdf-ext'
import { RdfModelValidation, XsdValidation } from '../index.js'

function validate (dataset) {
  const rdfModelValidation = new RdfModelValidation({ factory: rdf })
  const xsdValidation = new XsdValidation({ factory: rdf })

  console.log('  RdfModelValidation:')

  for (const quad of dataset) {
    const report = rdfModelValidation.validate(quad)

    console.log(`    ${quad.toCanonical()}: conforms: ${report.conforms}`)

    for (const result of report.results) {
      console.log(`      ${result.message[0]}`)
    }
  }

  console.log('  XsdValidation:')

  for (const quad of dataset) {
    const report = xsdValidation.validate(quad.object)

    console.log(`    ${quad.object.toCanonical()}: conforms: ${report.conforms}`)

    for (const result of report.results) {
      console.log(`      ${result.message[0]}`)
    }
  }
}

async function main () {
  try {
    const houseDataset = await rdf.io.dataset.fromText('text/turtle', `
      @base <https://housemd.rdf-ext.org/person/>. 
      @prefix schema: <http://schema.org/>.
      @prefix xsd: <http://www.w3.org/2001/XMLSchema#>.

      <gregory-house> a schema:Person;
        schema:birthDate "15.5.1959"^^xsd:date;
        schema:familyName "House";
        schema:givenName "Gregory".
    `)

    const ex = rdf.namespace('https://example.org/')

    const programmaticDataset = rdf.dataset([
      rdf.quad(rdf.literal('resource'), ex.label, rdf.literal('label of the resource')),
      rdf.quad(rdf.literal('resource'), rdf.literal('comment'), rdf.literal('programmatically generated dataset'))
    ])

    console.log('House Dataset:')
    validate(houseDataset)

    console.log('Programmatic Dataset:')
    validate(programmaticDataset)
  } catch (err) {
    console.error(err)
  }
}

main()
