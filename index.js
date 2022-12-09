import {Rome, Distribution} from '@rometools/js-api'
import romeToolsWasmModule from '@rometools/wasm-nodejs'
import getRomeConfiguration from './get-rome-configuration.js'
import throwDiagnosticsError from './throw-diagnostics-error.js'

const initRome = () => Rome.create({distribution: Distribution.NODE})

const initRomeSync = () => {
  // Based on `Rome.create`
  romeToolsWasmModule.main()
  const workspace = new romeToolsWasmModule.Workspace()
  return new Rome(romeToolsWasmModule, workspace)
}

let rome
function runRomeFormat(rome, text, options) {
  const configuration = getRomeConfiguration(options)
  rome.applyConfiguration(configuration)

  let result
  try {
    result = rome.formatContent(String(text), {
      filePath: options?.filePath ?? 'source.tsx',
    })
  } catch (error) {
    throw error?.stackTrace ?? error
  }

  throwDiagnosticsError(result.diagnostics)

  return result.content
}

const romeFormat = async (text, options) => {
  rome ??= await initRome()
  return runRomeFormat(rome, text, options)
}
const romeFormatSync = (text, options) => {
  rome ??= initRomeSync()
  return runRomeFormat(rome, text, options)
}
romeFormat.sync = romeFormatSync
export default romeFormat
