/**
 * @fileoverview Disallow importing from date-fns outside of utils/date
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

var DEFAULT_ALLOWED_FILE_PATTERNS = ['utils/date.ts', 'utils/date.test.ts'];

var MESSAGE =
  "Import date helpers from 'utils/date' instead of 'date-fns'. If the helper you need is missing, re-export it from utils/date first.";

function isDateFnsModule(source) {
  return (
    source === 'date-fns' ||
    source.indexOf('date-fns/') === 0 ||
    source === '@date-fns' ||
    source.indexOf('@date-fns/') === 0
  );
}

module.exports = {
  meta: {
    docs: {
      description: 'Disallow importing from date-fns outside of utils/date',
      category: 'Best Practices',
      recommended: true,
    },
    fixable: null,
    schema: [
      {
        type: 'object',
        properties: {
          allowedFilePatterns: {
            type: 'array',
            items: { type: 'string' },
          },
        },
        additionalProperties: false,
      },
    ],
  },

  create: function (context) {
    var options = context.options[0] || {};
    var allowedFilePatterns =
      options.allowedFilePatterns || DEFAULT_ALLOWED_FILE_PATTERNS;
    var filename = (
      context.filename ||
      (context.getFilename && context.getFilename()) ||
      ''
    )
      .split('\\')
      .join('/');

    var isAllowedFile = allowedFilePatterns.some(function (pattern) {
      return filename.indexOf(pattern) !== -1;
    });

    function report(node, source) {
      if (
        isAllowedFile ||
        typeof source !== 'string' ||
        !isDateFnsModule(source)
      ) {
        return;
      }

      context.report({ node: node, message: MESSAGE });
    }

    function checkModuleDeclaration(node) {
      if (node.source) {
        report(node, node.source.value);
      }
    }

    return {
      ImportDeclaration: checkModuleDeclaration,
      ExportNamedDeclaration: checkModuleDeclaration,
      ExportAllDeclaration: checkModuleDeclaration,

      ImportExpression: function (node) {
        if (node.source && node.source.type === 'Literal') {
          report(node, node.source.value);
        }
      },

      CallExpression: function (node) {
        if (
          node.callee.type !== 'Identifier' ||
          node.callee.name !== 'require' ||
          node.arguments.length === 0 ||
          node.arguments[0].type !== 'Literal'
        ) {
          return;
        }

        report(node, node.arguments[0].value);
      },
    };
  },
};
