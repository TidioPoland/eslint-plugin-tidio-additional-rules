'use strict';
//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/no-trans-in-tests'),
  RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
RuleTester.setDefaultConfig({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
});
var ruleTester = new RuleTester();
ruleTester.run('no-trans-in-tests', rule, {
  valid: [
    {
      code: `func(1)`,
      filename: 'packages/webApp/Main.test.jsx',
    },
    {
      code: `trans(1)`,
      filename: 'packages/webApp/Main.jsx',
    },
  ],

  invalid: [
    {
      code: `trans(1)`,
      filename: 'packages/webApp/Main.test.tsx',
      errors: [
        {
          message: `Do not use trans in tests. Put the text directly.`,
          type: 'CallExpression',
        },
      ],
    },
  ],
});
