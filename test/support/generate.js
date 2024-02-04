function generate () {
  const args = [...arguments]

  if (args.length === 0) {
    return ['']
  }

  const output = []

  for (const value of args[0]) {
    for (const rest of generate(...args.slice(1))) {
      output.push(value + rest)
    }
  }

  return output
}

export default generate
