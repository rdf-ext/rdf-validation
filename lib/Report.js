import * as ns from './namespaces.js'

class Report {
  constructor ({ results = [] } = {}) {
    this.results = results
  }

  get conforms () {
    return !this.results.some(result => {
      return (
        result.severity.equals(ns.sh.Info) ||
        result.severity.equals(ns.sh.Violation) ||
        result.severity.equals(ns.sh.Warning)
      )
    })
  }
}

export default Report
