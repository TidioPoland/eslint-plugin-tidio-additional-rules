/**
 * @fileoverview Disallow importing from date-fns outside of utils/date
 */
'use strict';
//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/no-date-fns-imports'),
  RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
});

var ruleTester = new RuleTester();

var MESSAGE =
  "Import date helpers from 'utils/date' instead of 'date-fns'. If the helper you need is missing, re-export it from utils/date first.";

ruleTester.run('no-date-fns-imports', rule, {
  valid: [
    {
      code: "import { addDays } from 'utils/date';",
      filename: 'packages/webApp/panel/views/analytics/helpers.ts',
    },
    {
      code: "import { addDays } from 'date-fns';",
      filename: 'packages/utils/date.ts',
    },
    {
      code: "import { de, enUS } from 'date-fns/locale';",
      filename: 'packages/utils/date.ts',
    },
    {
      code: "import { TZDate } from '@date-fns/tz';",
      filename: 'packages/utils/date.ts',
    },
    {
      code: "import { de } from 'date-fns/locale';",
      filename: 'packages/utils/date.test.ts',
    },
    {
      code: "const { addDays } = require('date-fns');",
      filename: 'packages/utils/date.ts',
    },
    {
      code: "import somethingElse from 'date-fnsy';",
      filename: 'packages/webApp/panel/views/analytics/helpers.ts',
    },
    {
      code: "import somethingElse from './date-fns-adapter';",
      filename: 'packages/webApp/panel/views/analytics/helpers.ts',
    },
    {
      code: "import { addDays } from 'date-fns';",
      filename: 'packages/utils/date.ts',
      options: [{ allowedFilePatterns: ['utils/date.ts'] }],
    },
  ],

  invalid: [
    {
      code: "import { addDays } from 'date-fns';",
      filename: 'packages/webApp/panel/views/analytics/helpers.ts',
      errors: [{ message: MESSAGE, type: 'ImportDeclaration' }],
    },
    {
      code: "import { format } from 'date-fns/format';",
      filename: 'packages/webApp/panel/views/analytics/helpers.ts',
      errors: [{ message: MESSAGE, type: 'ImportDeclaration' }],
    },
    {
      code: "import { de } from 'date-fns/locale';",
      filename: 'packages/webApp/panel/views/analytics/helpers.ts',
      errors: [{ message: MESSAGE, type: 'ImportDeclaration' }],
    },
    {
      code: "import { TZDate } from '@date-fns/tz';",
      filename: 'packages/webApp/panel/views/analytics/helpers.ts',
      errors: [{ message: MESSAGE, type: 'ImportDeclaration' }],
    },
    {
      code: "import { addDays } from 'date-fns';",
      filename: 'packages/webApp/panel/views/analytics/helpers.test.ts',
      errors: [{ message: MESSAGE, type: 'ImportDeclaration' }],
    },
    {
      code: "export { addDays } from 'date-fns';",
      filename: 'packages/webApp/panel/views/analytics/helpers.ts',
      errors: [{ message: MESSAGE, type: 'ExportNamedDeclaration' }],
    },
    {
      code: "export * from 'date-fns';",
      filename: 'packages/webApp/panel/views/analytics/helpers.ts',
      errors: [{ message: MESSAGE, type: 'ExportAllDeclaration' }],
    },
    {
      code: "const { addDays } = require('date-fns');",
      filename: 'packages/webApp/panel/views/analytics/helpers.ts',
      errors: [{ message: MESSAGE, type: 'CallExpression' }],
    },
    {
      code: "const load = async () => { const { addDays } = await import('date-fns'); };",
      filename: 'packages/webApp/panel/views/analytics/helpers.ts',
      errors: [{ message: MESSAGE, type: 'ImportExpression' }],
    },
    {
      code: "import { addDays } from 'date-fns';",
      filename: 'packages/utils/date.ts',
      options: [{ allowedFilePatterns: ['utils/dateOnly.ts'] }],
      errors: [{ message: MESSAGE, type: 'ImportDeclaration' }],
    },
  ],
});
