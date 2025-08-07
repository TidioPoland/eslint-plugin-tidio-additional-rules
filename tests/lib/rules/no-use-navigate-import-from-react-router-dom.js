'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/no-use-navigate-import-from-react-router-dom'),
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

ruleTester.run('no-use-navigate-import-from-react-router-dom', rule, {
  valid: [
    {
      code: `import { useStableNavigate } from '../../../utils/hooks'`,
      filename: 'packages/webApp/panel/views/Modals.tsx',
      options: [{ module: 'webApp/panel' }],
    },
    {
      code: `import { useLocation, useParams } from 'react-router-dom'`,
      filename: 'packages/webApp/panel/views/Modals.tsx',
      options: [{ module: 'webApp/panel' }],
    },
    {
      code: `import { Navigate } from 'react-router-dom'`,
      filename: 'packages/webApp/panel/views/Modals.tsx',
      options: [{ module: 'webApp/panel' }],
    },
    {
      code: `import { useNavigate } from 'react-router-dom'`,
      filename: 'packages/utils/index.ts',
      options: [{ module: 'webApp/panel' }],
    },
    {
      code: `import { useStableNavigate } from '../../../utils/hooks'`,
      filename: 'packages/webApp/panel/views/Modals.tsx',
    },
    {
      code: `import { useLocation, useParams } from 'react-router-dom'`,
      filename: 'packages/mobileApp/views/Settings.tsx',
    },
  ],
  invalid: [
    {
      code: `import { useNavigate } from 'react-router-dom'`,
      filename: 'packages/webApp/panel/views/Modals.tsx',
      options: [{ module: 'webApp/panel' }],
      errors: [
        {
          messageId: 'useStableNavigate',
          type: 'ImportSpecifier',
        },
      ],
    },
    {
      code: `import { useNavigate, useLocation } from 'react-router-dom'`,
      filename: 'packages/webApp/panel/Dashboard.jsx',
      options: [{ module: 'webApp/panel' }],
      errors: [
        {
          messageId: 'useStableNavigate',
          type: 'ImportSpecifier',
        },
      ],
    },
    {
      code: `import { useNavigate } from 'react-router-dom'`,
      filename: 'packages/webApp/panel/views/Modals.tsx',
      errors: [
        {
          messageId: 'useStableNavigate',
          type: 'ImportSpecifier',
        },
      ],
    },
    {
      code: `import { useNavigate } from 'react-router-dom'`,
      filename: 'packages/mobileApp/views/Settings.tsx',
      errors: [
        {
          messageId: 'useStableNavigate',
          type: 'ImportSpecifier',
        },
      ],
    },
  ],
});
