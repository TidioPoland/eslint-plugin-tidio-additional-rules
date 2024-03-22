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
  valid: [
    "<Test aria-label={trans('test')} />",
    "<Test aria-label={`${trans('test')} - ${trans('test')}`} />",
    '<Test somethingElse="Test" />',
  ],

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
    {
      code: "const variable='1';<Test aria-label={`${trans('test')} ${variable} ${trans('test')}`} />",
      errors: [
        {
          message: `aria-label should always be translated. Got a variable "variable" call in string template. Please use trans directly.`,
          type: 'JSXAttribute',
        },
      ],
    },
    {
      code: "const variable='1';<Test aria-label={`${trans('test')} ${otherFunction('test')} ${trans('test')}`} />",
      errors: [
        {
          message: `aria-label should always be translated. Got a function "otherFunction" call in string template. Please use trans directly.`,
          type: 'JSXAttribute',
        },
      ],
    },
    {
      code: "<Test aria-label={`${trans('test')} wow ${trans('test')}`} />",
      errors: [
        {
          message: `aria-label should always be translated. Got an untranslated "wow" string in string template. Please use trans.`,
          type: 'JSXAttribute',
        },
      ],
    },
    {
      code: "const more='1';<Test aria-label={`this-is-something-${more}`} />",
      errors: [
        {
          message: `aria-label should always be translated. Got a variable "more" call in string template. Please use trans directly.`,
          type: 'JSXAttribute',
        },
      ],
    },
  ],
});
