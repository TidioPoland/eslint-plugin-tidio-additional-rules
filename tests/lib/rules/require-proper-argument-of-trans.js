'use strict';
//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/require-proper-argument-of-trans'),
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
ruleTester.run('require-proper-argument-of-trans', rule, {
  valid: ['trans("Mobile: Test");', "trans('Mobile: Test');", "<Component text={trans('string')} />"],
  invalid: [
    {
      code: 'trans(`test`);',
      errors: [
        {
          message: 'Argument of trans should be string. Got TemplateLiteral.',
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `trans(VARIABLE);`,
      errors: [
        {
          message: 'Argument of trans should be string. Got Identifier.',
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `<Component text={trans(VARIABLE)} />`,
      errors: [
        {
          message: 'Argument of trans should be string. Got Identifier.',
          type: 'CallExpression',
        },
      ],
    },
  ],
});
