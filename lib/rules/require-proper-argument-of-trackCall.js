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
        const options = context.options[0] || { characterLimit: null };
        const characterLimit = options.characterLimit;

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
        const eventsWithSmallLetter = eventNameSplit.filter((event) =>
          event.charAt(0).match(/[a-z]/)
        );
        if (eventsWithSmallLetter.length > 0) {
          context.report({
            node: node,
            message: `Each word in trackCall event should be capitalized. Got not-capitalized first-letter in ${eventsWithSmallLetter
              .map((event) => `"${event}"`)
              .join(', ')} word${
              eventsWithSmallLetter.length > 1 ? 's' : ''
            } in "${eventName}".`,
          });
        }
        const wordsWithDot = eventNameSplit.filter((event) =>
          event.includes('.')
        );
        if (wordsWithDot.length > 0) {
          context.report({
            node: node,
            message: `Event should not have a dot(.) in event name. Got ${wordsWithDot
              .map((event) => `"${event}"`)
              .join(', ')} word${
              eventsWithSmallLetter.length > 1 ? 's' : ''
            } with dot in "${eventName}".`,
          });
        }
        if (characterLimit && eventName.length > characterLimit) {
          context.report({
            node,
            message: `Event should not be longer than ${characterLimit} characters. "${eventName}" is ${eventName.length} letters long.`,
          });
        }
        return undefined;
      },
    };
  },
};
