'use strict';
//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/require-to-use-local-storage-utils'),
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
ruleTester.run('require-to-use-local-storage-utils', rule, {
  valid: ['const variable = localStorageGetItem("test");', 'const variable = localStorageSetItem("test", "test");', 'const variable = localStorageRemoveItem("test", "test");'],
  invalid: [
    {
      code: 'const variable = localStorage.getItem("test");',
      errors: [
        {
          message: 'localStorage.getItem is not allowed. Use localStorageGetItem from helpers instead.',
          type: 'VariableDeclarator',
        },
      ],
    },
    {
      code: 'const variable = localStorage.setItem("test");',
      errors: [
        {
          message: 'localStorage.setItem is not allowed. Use localStorageSetItem from helpers instead.',
          type: 'VariableDeclarator',
        },
      ],
    },
    {
      code: 'const variable = localStorage.removeItem("test");',
      errors: [
        {
          message: 'localStorage.removeItem is not allowed. Use localStorageRemoveItem from helpers instead.',
          type: 'VariableDeclarator',
        },
      ],
    },
  ],
});
