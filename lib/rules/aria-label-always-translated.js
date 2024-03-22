/**
 * @fileoverview Disallow non-translated aria-labels
 * @author Jaroslaw Salwa<jaroslaw@tidio.net>
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Disallow non-translated aria-labels',
      category: 'Stylistic Issues',
      recommended: false,
    },
    fixable: null, // or "code" or "whitespace"
    schema: [
      // fill in your schema
    ],
  },

  create: function (context) {
    return {
      JSXAttribute(node) {
        if (context.getFilename().includes('.test.')) {
          return undefined;
        }
        if (node.name.name !== 'aria-label') {
          return undefined;
        }
        if (node.value.type.toLowerCase() === 'literal') {
          context.report({
            node: node,
            message: `aria-label should always be translated. Got "${node.value.value}"`,
          });
        } else if (
          node.value.type.toLowerCase() === 'jsxexpressioncontainer' &&
          node.value.expression.type.toLowerCase() === 'templateliteral'
        ) {
          context.report({
            node: node,
            message: `aria-label should always be translated. Got string template. Please use trans directly.`,
          });
        }
      },
    };
  },
};
