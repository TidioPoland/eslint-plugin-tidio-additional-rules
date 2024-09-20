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
  },
});
var ruleTester = new RuleTester();
ruleTester.run('require-proper-argument-of-trans', rule, {
  valid: ['trans("Mobile: Test");', "trans('Mobile: Test');"],
  invalid: [
    {
      code: 'trans(`test`);',
      errors: [
        {
          message: 'Argument of trans should be string. Got TemplateLiteral.',
          type: 'ExpressionStatement',
        },
      ],
    },
    {
      code: `trans(VARIABLE);`,
      errors: [
        {
          message: 'Argument of trans should be string. Got Identifier.',
          type: 'ExpressionStatement',
        },
      ],
    },
  ],
});
