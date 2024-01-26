'use strict';
//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/use-test-utils'),
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
ruleTester.run('use-test-utils', rule, {
  valid: [
    {
      code: `import { QueryClientProvider } from '@tanstack/react'`,
      filename: 'packages/webApp/Main.jsx',
    },
    {
      code: `import Something from 'components/Test'`,
      filename: 'packages/webApp/Main.test.jsx',
    },
  ],

  invalid: [
    {
      code: `import { QueryClientProvider } from '@tanstack/react'`,
      filename: 'packages/store/index.test.js',
      errors: [
        {
          message: `userEvent, QueryClientProvider, ToastManager shouldn't be imported directly in tests. Use methods provided in testHelpers.`,
          type: 'ImportDeclaration',
        },
      ],
    },
    {
      code: `import { QueryClient } from '@tanstack/react'`,
      filename: 'packages/store/index.test.ts',
      errors: [
        {
          message: `userEvent, QueryClientProvider, ToastManager shouldn't be imported directly in tests. Use methods provided in testHelpers.`,
          type: 'ImportDeclaration',
        },
      ],
    },
    {
      code: `import { ToastManager } from 'components/Toast'`,
      filename: 'packages/components/index.test.tsx',
      errors: [
        {
          message: `userEvent, QueryClientProvider, ToastManager shouldn't be imported directly in tests. Use methods provided in testHelpers.`,
          type: 'ImportDeclaration',
        },
      ],
    },
    {
      code: `import userEvent from '@testing-library/user-event'`,
      filename: 'packages/components/index.test.tsx',
      errors: [
        {
          message: `userEvent, QueryClientProvider, ToastManager shouldn't be imported directly in tests. Use methods provided in testHelpers.`,
          type: 'ImportDeclaration',
        },
      ],
    },
  ],
});
