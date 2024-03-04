/**
 * @fileoverview Require aria-label to always be translated
 * @author Jarosław Salwa<jaroslaw@tidio.net>
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/aria-label-always-translated'),
  RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
RuleTester.setDefaultConfig({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
});
var ruleTester = new RuleTester();
ruleTester.run('aria-label-always-translated', rule, {
  valid: ["<Test aria-label={trans('test')} />", '<Test somethingElse="Test" />'],

  invalid: [
    {
      code: "<Test aria-label='test' />",
      errors: [
        {
          message: `aria-label should always be translated. Got "test"`,
          type: 'JSXAttribute',
        },
      ],
    },
  ],
});
