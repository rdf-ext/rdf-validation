import { strictEqual } from 'node:assert'

function isResult (result) {
  strictEqual(typeof result, 'object')
  strictEqual(Array.isArray(result.message), true)
  strictEqual(result.message.every(m => m.termType === 'Literal'), true)
}

function isReport (report) {
  strictEqual(typeof report, 'object')
  strictEqual(typeof report.conforms, 'boolean')
  strictEqual(Array.isArray(report.results), true)

  for (const result of report.results) {
    isResult(result)
  }
}

export {
  isReport,
  isResult
}
