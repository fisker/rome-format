import {Buffer} from 'node:buffer'
import test from 'ava'
import dedent from 'dedent'
import format from './index.js'

async function formatTester(t, {input, expected, options}) {
  expected += '\n'
  const actual = format(input, options)
  t.truthy(actual.then)
  t.is(await actual, expected)
}

test('main', async (t) => {
  await formatTester(t, {
    input: dedent`
      var bar = function fooBarFooBarFooBarFooBarFooBarFooBarFooBarFooBarFooBar
      (fooBarFooBarFooBarFooBarFooBarFooBarFooBarFooBarFooBarFooBarFooBarFooBar
      , anotherParam)
      {
                var foo
                            =
                'bar'; // comment
      }
    `,
    expected: dedent`
      var bar = function fooBarFooBarFooBarFooBarFooBarFooBarFooBarFooBarFooBar(
      	fooBarFooBarFooBarFooBarFooBarFooBarFooBarFooBarFooBarFooBarFooBarFooBar,
      	anotherParam,
      ) {
      	var foo = "bar"; // comment
      };
    `,
  })
})

test('support buffer', async (t) => {
  await formatTester(t, {
    input: Buffer.from('foo ( )'),
    expected: 'foo();',
  })
})

test('sync', (t) => {
  t.is(format.sync('foo ( )'), 'foo();\n')
})

test('error', async (t) => {
  await t.throwsAsync(() => format('foo ( )', {filePath: 'source.unknown'}))
  await t.throwsAsync(() => format('1++'))
})
