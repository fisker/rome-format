const pick = (object, keys) =>
  Object.fromEntries(keys.map((key) => [key, object[key]]))

function getRomeConfiguration(options = {}) {
  return {
    formatter: {
      enabled: true,
      ...pick(options, [
        'formatWithErrors',
        'indentStyle',
        'indentSize',
        'lineWidth',
      ]),
    },
    javascript: {
      formatter: pick(options, [
        'quoteStyle',
        'quoteProperties',
        'trailingComma',
        'semicolons',
      ]),
    },
  }
}

export default getRomeConfiguration
