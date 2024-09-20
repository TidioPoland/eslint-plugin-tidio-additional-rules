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
      ExpressionStatement(node) {
        if (context.getFilename().includes('.test.')) {
          return undefined;
        }

        if (
          !node ||
          !node.expression ||
          !node.expression.callee ||
          !node.expression.arguments ||
          !node.expression.arguments[0]
        ) {
          return undefined;
        }

        if (node.expression.callee.name !== 'trans') {
          return undefined;
        }

        if (node.expression.arguments[0].type.toLowerCase() !== 'literal') {
          context.report({
            node: node,
            message: `Argument of trans should be string. Got ${node.expression.arguments[0].type}.`,
          });
        }
      },
    };
  },
};
