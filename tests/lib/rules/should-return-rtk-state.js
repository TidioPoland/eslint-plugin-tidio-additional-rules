/**
 * @fileoverview Disallow direct state assignment in Redux Toolkit reducers
 * @author
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/should-return-rtk-state'),
  RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2020, sourceType: 'module' },
});

ruleTester.run('should-return-rtk-state', rule, {
  valid: [
    {
      code: `
        const slice = createSlice({
          name: 'example',
          initialState: {},
          reducers: {
            setData(state, { payload }) {
              state.data = payload;
            },
          },
        });
      `,
      filename: 'store/example/index.ts',
    },
    {
      code: `
        const slice = createSlice({
          name: 'example',
          initialState: {},
          reducers: {
            setData(state, { payload }) {
              return { ...state, ...payload };
            },
          },
        });
      `,
      filename: 'store/example/index.ts',
    },
  ],

  invalid: [
    {
      code: `
        const slice = createSlice({
          name: 'example',
          initialState: {},
          reducers: {
            setData(state, { payload }) {
              state = { ...state, ...payload };
            },
          },
        });
      `,
      filename: 'store/example/index.ts',
      errors: [
        {
          messageId: 'noStateAssignment',
          type: 'AssignmentExpression',
        },
      ],
    },
    {
      code: `
        const slice = createSlice({
          name: 'example',
          initialState: {},
          reducers: {
            setData(state, { payload }) {
              state = { key: 'value' };
            },
          },
        });
      `,
      filename: 'panelStore/example/index.ts',
      errors: [
        {
          messageId: 'noStateAssignment',
          type: 'AssignmentExpression',
        },
      ],
    },
    {
      code: `
        const slice = createSlice({
          name: 'example',
          initialState: {},
          reducers: {
            setData(state, { payload }) {
              state = Object.assign({}, state, payload);
            },
          },
        });
      `,
      filename: 'mobileStore/example/index.ts',
      errors: [
        {
          messageId: 'noStateAssignment',
          type: 'AssignmentExpression',
        },
      ],
    },
  ],
});
