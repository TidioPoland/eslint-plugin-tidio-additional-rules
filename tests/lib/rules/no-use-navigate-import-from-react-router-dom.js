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
    },
    {
      code: `import { useLocation, useParams } from 'react-router-dom'`,
    },
    {
      code: `import { Navigate } from 'react-router-dom'`,
    },
    {
      code: `import { Routes, Route, BrowserRouter } from 'react-router-dom'`,
    },
    {
      code: `import React from 'react'`,
    },
  ],
  invalid: [
    {
      code: `import { useNavigate } from 'react-router-dom'`,
      errors: [
        {
          messageId: 'useStableNavigate',
          type: 'ImportSpecifier',
        },
      ],
    },
    {
      code: `import { useNavigate, useLocation } from 'react-router-dom'`,
      errors: [
        {
          messageId: 'useStableNavigate',
          type: 'ImportSpecifier',
        },
      ],
    },
    {
      code: `import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'`,
      errors: [
        {
          messageId: 'useStableNavigate',
          type: 'ImportSpecifier',
        },
      ],
    },
  ],
});
