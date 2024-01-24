'use strict';
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
module.exports = {
  meta: {
    docs: {
      description: 'All amplitude events should have proper capitalization',
      category: 'Stylistic Issues',
      recommended: false,
    },
    fixable: null, // or "code" or "whitespace"
    schema: [],
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
          !node.expression.arguments[0] ||
          !node.expression.arguments[0].value
        ) {
          return undefined;
        }
        if (node.expression.callee.name !== 'trackCall') {
          return undefined;
        }
        const eventName = node.expression.arguments[0].value;
        const eventNameSplit = eventName.split(' ');
        if (
          eventNameSplit.find(
            (event) => event.charAt(0) === event.charAt(0).toLocaleLowerCase()
          )
        ) {
          context.report({
            node: node,
            message: `Each word in trackCall event should be capitalized. Got "${eventName}"`,
          });
        }
        return undefined;
      },
    };
  },
};
