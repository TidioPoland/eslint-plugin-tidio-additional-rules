'use strict';
//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/dont-use-parameters-in-handlers'),
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
ruleTester.run('dont-use-parameters-in-handlers', rule, {
  valid: [
    {
      code: `import { response } from './mocks';
export const botsNodesResponse = (): void => {
    fetchMock.mock(
        { url: 'path:/bots/nodes', method: 'GET' },
        {
            status: 200,
            body: response,
        },
    );
};`,
      filename: 'packages/utils/api/quota/handlers.ts',
    },
    {
      code: `import { response } from './mocks';
export const botsNodesResponse = (test = 1): void => {
    fetchMock.mock(
        { url: \`path:/bots/nodes/\${test}\`, method: 'GET' },
        {
            status: 200,
            body: response,
        },
    );
};`,
      filename: 'packages/utils/api/quota/handlers.ts',
    },
  ],

  invalid: [
    {
      code: `import { response } from './mocks';
export const botsNodesResponse = (mock = response): void => {
    fetchMock.mock(
        { url: 'path:/bots/nodes', method: 'GET' },
        {
            status: 200,
            body: mock,
        },
    );
};`,
      filename: 'packages/utils/api/quota/handlers.ts',
      errors: [
        {
          message: `Do not use parameters in handlers.`,
          type: 'ArrowFunctionExpression',
        },
      ],
    },
    {
      code: `
export const botsNodesResponse = (mock): void => {
    fetchMock.mock(
        { url: 'path:/bots/nodes', method: 'GET' },
        {
            status: 200,
            body: mock,
        },
    );
};`,
      filename: 'packages/utils/api/quota/handlers.ts',
      errors: [
        {
          message: `Do not use parameters in handlers.`,
          type: 'ArrowFunctionExpression',
        },
      ],
    },
    {
      code: `export const botsNodesResponse = (test = 1): void => {
fetchMock.mock(
        { url: 'path:/bots/nodes', method: 'GET' },
        {
            status: 200,
            body: test,
        },
    );
};`,
      filename: 'packages/utils/api/quota/handlers.ts',
      errors: [
        {
          message: `Do not use parameters in handlers.`,
          type: 'ArrowFunctionExpression',
        },
      ],
    },
    {
      code: `import { response } from './utils';
      export const botsNodesResponse = (test = response): void => {
fetchMock.mock(
        { url: 'path:/bots/nodes', method: 'GET' },
        {
            status: 200,
            body: test,
        },
    );
};`,
      filename: 'packages/utils/api/quota/handlers.ts',
      errors: [
        {
          message: `Do not use parameters in handlers.`,
          type: 'ArrowFunctionExpression',
        },
      ],
    },
  ],
});
