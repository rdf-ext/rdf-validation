import toNT from '@rdfjs/to-ntriples'
import * as ns from './namespaces.js'

function resolveVariables (message, args) {
  return Object.entries(args).reduce((message, [name, value]) => {
    if (value && value.termType) {
      value = toNT(value)
    }

    return message
      .replace(`{$${name}}`, value)
      .replace(`{?${name}}`, value)
  }, message)
}

class Result {
  constructor ({ args = {}, factory, message = [], severity = ns.sh.Violation } = {}) {
    this.severity = severity

    this.message = message.map(message => {
      return factory.literal(resolveVariables(message.value, args), message.language || null)
    })
  }
}

export default Result
