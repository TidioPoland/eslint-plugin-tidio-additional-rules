'use strict';
//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/require-proper-argument-of-trackCall'),
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
ruleTester.run('require-proper-argument-of-trackCall', rule, {
  valid: ['trackCall("Mobile: Test");', 'trackCall("This Is A Valid Data");'],

  invalid: [
    {
      code: `trackCall("test");`,
      errors: [
        {
          message:
            'Each word in trackCall event should be capitalized. Got "test"',
          type: 'ExpressionStatement',
        },
      ],
    },
    {
      code: `trackCall("this is test");`,
      errors: [
        {
          message:
            'Each word in trackCall event should be capitalized. Got "this is test"',
          type: 'ExpressionStatement',
        },
      ],
    },
    {
      code: `trackCall("This Is test");`,
      errors: [
        {
          message:
            'Each word in trackCall event should be capitalized. Got "This Is test"',
          type: 'ExpressionStatement',
        },
      ],
    },
  ],
});
