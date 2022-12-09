function throwDiagnosticsError(diagnostics) {
  const [error] = diagnostics
  if (!error) {
    return
  }

  throw Object.assign(new SyntaxError(error.description), {diagnostics})
}

export default throwDiagnosticsError
