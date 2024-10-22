'use strict';
//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/mobileApp-webApp-use-own-lang'),
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
ruleTester.run('mobileApp-webApp-use-own-lang', rule, {
  valid: [
    {
      code: `import trans from 'lang'`,
      options: [{ modules: ['webApp', 'mobileApp'] }],
      filename: 'packages/webApp/Main.jsx',
    },
    {
      code: `import trans from 'lang'`,
      options: [{ modules: ['webApp', 'mobileApp'] }],
      filename: 'packages/mobileApp/Main.jsx',
    },
    {
      code: `import trans from './lang'`,
      options: [{ modules: ['webApp', 'mobileApp'] }],
      filename: 'packages/mobileApp/Main.jsx',
    },
    {
      code: `import trans from '../../lang'`,
      options: [{ modules: ['webApp', 'mobileApp'] }],
      filename: 'packages/mobileApp/Main.jsx',
    },
  ],
  invalid: [
    {
      code: `import trans from 'utils/lang'`,
      filename: 'packages/webApp/Main.jsx',
      options: [{ modules: ['webApp', 'mobileApp'] }],
      errors: [
        {
          message:
            "trans in webApp should always be imported from 'lang' instead of from 'utils/lang'",
          type: 'ImportDeclaration',
        },
      ],
    },
    {
      code: `import trans from 'utils/lang'`,
      filename: 'packages/mobileApp/Main.jsx',
      options: [{ modules: ['webApp', 'mobileApp'] }],
      errors: [
        {
          message:
            "trans in mobileApp should always be imported from 'lang' instead of from 'utils/lang'",
          type: 'ImportDeclaration',
        },
      ],
    },
    {
      code: `import trans from 'store/lang'`,
      filename: 'packages/webApp/Main.jsx',
      options: [{ modules: ['webApp', 'mobileApp'] }],
      errors: [
        {
          message:
            "trans in webApp should always be imported from 'lang' instead of from 'store/lang'",
          type: 'ImportDeclaration',
        },
      ],
    },
    {
      code: `import trans from '../loginPage/lang'`,
      filename: 'packages/webApp/Main.jsx',
      options: [{ modules: ['webApp', 'mobileApp'] }],
      errors: [
        {
          message:
            "trans in webApp should always be imported from 'lang' instead of from '../loginPage/lang'",
          type: 'ImportDeclaration',
        },
      ],
    },
  ],
});
