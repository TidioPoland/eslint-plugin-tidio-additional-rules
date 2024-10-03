/**
 * @fileoverview Disallow to use localStorage directly
 * @author Jan Rochalski<joonny220@gmail.com>
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Disallow to use localStorage directly',
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
      Identifier(node) {
        if (node.parent.object && node.parent.object.name !== "localStorage") {
          return undefined;
        }

        if (node.name === "getItem") {
          context.report({
            node: node,
            message: 'localStorage.getItem is not allowed. Use localStorageGetItem from helpers instead.',
          });
        }

        if (node.name === "setItem") {
          context.report({
            node: node,
            message: 'localStorage.setItem is not allowed. Use localStorageSetItem from helpers instead.',
          });
        }

        if (node.name === "removeItem") {
          context.report({
            node: node,
            message: 'localStorage.removeItem is not allowed. Use localStorageRemoveItem from helpers instead.',
          });
        }

        return undefined;
      }
    };
  },
};
