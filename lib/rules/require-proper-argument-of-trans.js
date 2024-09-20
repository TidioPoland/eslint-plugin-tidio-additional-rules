'use strict';
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
module.exports = {
  meta: {
    docs: {
      description: 'Trans argument should always be string',
      category: 'Stylistic Issues',
      recommended: false,
    },
    fixable: null, // or "code" or "whitespace"schema: [{
    schema: {
      characterLimit: {
        type: 'number',
        required: false,
      },
    },
  },

  create: function (context) {
    return {
      CallExpression(node) {
        if (context.getFilename().includes('.test.')) {
          return undefined;
        }
        if (!node || !node.callee) {
          return undefined;
        }
        if (node.callee.name !== 'trans') {
          return undefined;
        }

        if (node.arguments[0].type.toLowerCase() !== 'literal') {
          context.report({
            node: node,
            message: `Argument of trans should be string. Got ${node.arguments[0].type}.`,
          });
        }
      },
    };
  },
};
