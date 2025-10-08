'use strict';
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
module.exports = {
  meta: {
    docs: {
      description: 'Disallow usage of trans method in test files',
      category: 'Best Practices',
      recommended: false,
    },
    fixable: null,
    schema: [],
  },

  create: function (context) {
    return {
      CallExpression(node) {
        const filename = context.getFilename();

        // Only apply this rule to test files
        const isTestFile =
          filename.includes('.test.') || filename.includes('.spec.');

        if (!isTestFile) {
          return undefined;
        }

        if (!node || !node.callee) {
          return undefined;
        }

        // Check if the function being called is 'trans'
        if (node.callee.type === 'Identifier' && node.callee.name === 'trans') {
          context.report({
            node: node,
            message:
              'Do not use trans() in test files. Use regular strings instead.',
          });
        }
      },
    };
  },
};
