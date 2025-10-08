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
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
});

var ruleTester = new RuleTester();
ruleTester.run('no-trans-in-tests', rule, {
  valid: [
    {
      code: 'const deleteButton = screen.getByText("Delete");',
      filename: 'file.test.js',
    },
    {
      code: 'const text = "some text";',
      filename: 'file.test.ts',
    },
    {
      code: 'expect(element).toHaveTextContent("Hello World");',
      filename: 'Component.spec.tsx',
    },
    // trans is allowed in non-test files
    {
      code: 'trans("aiAssistant.delete")',
      filename: 'Component.tsx',
    },
    {
      code: 'const text = trans("key");',
      filename: 'file.js',
    },
  ],
  invalid: [
    {
      code: 'const deleteButton = screen.getByText(trans("aiAssistant.delete"));',
      filename: 'file.test.js',
      errors: [
        {
          message:
            'Do not use trans() in test files. Use hardcoded strings instead.',
          type: 'CallExpression',
        },
      ],
    },
    {
      code: 'trans("key")',
      filename: 'Component.test.tsx',
      errors: [
        {
          message:
            'Do not use trans() in test files. Use hardcoded strings instead.',
          type: 'CallExpression',
        },
      ],
    },
    {
      code: 'const text = trans("message.key");',
      filename: 'file.spec.js',
      errors: [
        {
          message:
            'Do not use trans() in test files. Use hardcoded strings instead.',
          type: 'CallExpression',
        },
      ],
    },
    {
      code: '<Component text={trans("test")} />',
      filename: 'Component.test.tsx',
      errors: [
        {
          message:
            'Do not use trans() in test files. Use hardcoded strings instead.',
          type: 'CallExpression',
        },
      ],
    },
  ],
});
