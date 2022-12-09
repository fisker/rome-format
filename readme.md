# rome-format

[![Build Status][github_actions_badge]][github_actions_link]
[![Coverage][coveralls_badge]][coveralls_link]
[![Npm Version][package_version_badge]][package_link]
[![MIT License][license_badge]][license_link]

[github_actions_badge]: https://img.shields.io/github/workflow/status/fisker/rome-format/CI/main?style=flat-square
[github_actions_link]: https://github.com/fisker/rome-format/actions?query=branch%3Amain
[coveralls_badge]: https://img.shields.io/coveralls/github/fisker/rome-format/main?style=flat-square
[coveralls_link]: https://coveralls.io/github/fisker/rome-format?branch=main
[license_badge]: https://img.shields.io/npm/l/rome-format.svg?style=flat-square
[license_link]: https://github.com/fisker/rome-format/blob/main/license
[package_version_badge]: https://img.shields.io/npm/v/rome-format.svg?style=flat-square
[package_link]: https://www.npmjs.com/package/rome-format

> Format code with [Rome](https://rome.tools/).

## Install

```bash
yarn add rome-format
```

## Usage

```js
import format from 'rome-format'

await format('hello (  "world" )')
// => hello("world");\n
```

## API

### format(source, options?)

Returns `promise` resolves with formatted code.

#### source

Type: `string`

Source code you want to format.

#### options

Type: `object`

- [`formatter` field in rome.json](https://docs.rome.tools/configuration/#formatter)
- [`javascript` field in rome.json](https://docs.rome.tools/configuration/#javascript)

except `formatter.enabled`, `formatter.ignore`

```js
await format('hello (  "world" )', {lineWidth: 10, semicolons: 'asNeeded'})
// => hello(\n\t"world",\n)\n
```

#### options.filePath

Type: `string`

## Related

- [prettier-format](https://github.com/fisker/prettier-format) auto load config and run prettier on code.
- [write-prettier-file](https://github.com/fisker/write-prettier-file) write formatted code to file.
