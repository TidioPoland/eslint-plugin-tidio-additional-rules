/**
 * @fileoverview Disallow using trans in tests
 * @author Jarosław Salwa
 */
'use strict';
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
module.exports = {
  meta: {
    docs: {
      description: 'it is forbidden to use trans in tests',
      category: 'Stylistic Issues',
      recommended: false,
    },
    fixable: null, // or "code" or "whitespace"
    schema: [],
  },

  create: function (context) {
    return {
      CallExpression(node) {
        const fileName = context.getFilename();
        if (!fileName.includes('.test.')) {
          return undefined;
        }
        if (node.callee.name === 'trans') {
          context.report({
            node: node,
            message: 'Do not use trans in tests. Put the text directly.',
          });
        }
      },
    };
  },
};
