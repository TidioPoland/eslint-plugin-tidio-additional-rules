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
    ecmaFeatures: {
      jsx: true,
    },
  },
});
var ruleTester = new RuleTester();
ruleTester.run('require-proper-argument-of-trackCall', rule, {
  valid: [
    'trackCall("Mobile: Test");',
    'trackCall("This Is A Valid Data");',
    'trackCall("This Is A 24h Valid Data");',
    'trackCall("The Event Which Is Longer Than 50 Characters By Few Letters");',
    '<Component test={trackCall("Test")} />',
    {
      code: 'trackCall("The Event Which Is Longer Than 50 Characters By Few Letters");',
      options: [{ characterLimit: 60 }],
    },
  ],

  invalid: [
    {
      code: `trackCall("test");`,
      errors: [
        {
          message:
            'Each word in trackCall event should be capitalized. Got not-capitalized first-letter in "test" word in "test".',
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `trackCall("this is test");`,
      errors: [
        {
          message:
            'Each word in trackCall event should be capitalized. Got not-capitalized first-letter in "this", "is", "test" words in "this is test".',
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `trackCall("This Is test");`,
      errors: [
        {
          message:
            'Each word in trackCall event should be capitalized. Got not-capitalized first-letter in "test" word in "This Is test".',
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `<Component test={trackCall('This is test')} />`,
      errors: [
        {
          message:
            'Each word in trackCall event should be capitalized. Got not-capitalized first-letter in "is", "test" words in "This is test".',
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `trackCall("This Is A Test .csv");`,
      errors: [
        {
          message:
            'Event should not have a dot(.) in event name. Got ".csv" word with dot in "This Is A Test .csv".',
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `trackCall("This Is A test .csv");`,
      errors: [
        {
          message:
            'Each word in trackCall event should be capitalized. Got not-capitalized first-letter in "test" word in "This Is A test .csv".',
          type: 'CallExpression',
        },
        {
          message:
            'Event should not have a dot(.) in event name. Got ".csv" word with dot in "This Is A test .csv".',
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `trackCall("The Event Which Is Longer Than 50 Characters By Few Letters");`,
      errors: [
        {
          message:
            'Event should not be longer than 50 characters. "The Event Which Is Longer Than 50 Characters By Few Letters" is 59 letters long.',
          type: 'CallExpression',
        },
      ],
      options: [
        {
          characterLimit: 50,
        },
      ],
    },
  ],
});
