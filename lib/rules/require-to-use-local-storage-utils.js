/**
 * @fileoverview Disallow localStorage.getItem
 * @author Jan Rochalski<joonny220@gmail.com>
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Disallow localStorage.getItem',
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
      VariableDeclarator(node) {
        if (node.init &&
          node.init.type === "CallExpression" &&
          node.init.callee.object &&
          node.init.callee.object.name === "localStorage" &&
          node.init.callee.property
        ) {
          if (node.init.callee.property.name === "getItem") {
            context.report({
              node: node,
              message: 'localStorage.getItem is not allowed. Use localStorageGetItem from helpers instead.',
            });
          }

          if (node.init.callee.property.name === "setItem") {
            context.report({
              node: node,
              message: 'localStorage.setItem is not allowed. Use localStorageSetItem from helpers instead.',
            });
          }

          if (node.init.callee.property.name === "removeItem") {
            context.report({
              node: node,
              message: 'localStorage.removeItem is not allowed. Use localStorageRemoveItem from helpers instead.',
            });
          }
        }

        return undefined;
      },
    };
  },
};
