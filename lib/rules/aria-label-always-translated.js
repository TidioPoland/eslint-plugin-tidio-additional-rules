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
        if (node.name.name !== 'aria-label' && node.name.name !== 'ariaLabel') {
          return undefined;
        }
        if (node.value.type.toLowerCase() === 'literal') {
          context.report({
            node: node,
            message: `${node.name.name} should always be translated. Got "${node.value.value}"`,
          });
        } else if (
          node.value.type.toLowerCase() === 'jsxexpressioncontainer' &&
          node.value.expression.type.toLowerCase() === 'templateliteral'
        ) {
          for (
            let i = 0;
            i < node.value.expression.expressions.length;
            i += 1
          ) {
            const expression = node.value.expression.expressions[i];
            if (
              expression.type.toLowerCase() === 'callexpression' &&
              expression.callee.type.toLowerCase() === 'identifier' &&
              expression.callee.name !== 'trans'
            ) {
              context.report({
                node: node,
                message: `${node.name.name} should always be translated. Got a function "${expression.callee.name}" call in string template. Please use trans directly.`,
              });
              return undefined;
            }
            if (expression.type.toLowerCase() === 'identifier') {
              context.report({
                node: node,
                message: `${node.name.name} should always be translated. Got a variable "${expression.name}" call in string template. Please use trans directly.`,
              });
              return undefined;
            }
          }
          for (let i = 0; i < node.value.expression.quasis.length; i += 1) {
            const quasi = node.value.expression.quasis[i];
            if (quasi.value.raw.match(/[a-zA-Z]/gi)) {
              context.report({
                node: node,
                message: `${node.name.name} should always be translated. Got an untranslated "${quasi.value.raw.trim()}" string in string template. Please use trans.`,
              });
              return undefined;
            }
          }
        }
      },
    };
  },
};
