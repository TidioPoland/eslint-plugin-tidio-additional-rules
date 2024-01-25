'use strict';
//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/trackCall-always-valid-name'),
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
ruleTester.run('trackCall-always-valid-name', rule, {
  valid: ['import {trackCall} from "track";'],

  invalid: [
    {
      code: `import {trackCall as track} from "track";`,
      errors: [
        {
          message:
            'trackCall should always be imported as trackCall. Currently it is "track"',
          type: 'ImportDeclaration',
        },
      ],
    },
  ],
});
