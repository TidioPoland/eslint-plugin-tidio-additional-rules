/**
 * @fileoverview Rule to enforce that Navigate components always have a replace prop
 *
 * Without explicit replace prop, the default behavior can cause broken back button
 * navigation, especially in redirect scenarios where users get stuck in loops.
 *
 * Redirection loops occur when Navigate creates history entries that users can
 * navigate back to, triggering the same redirect logic repeatedly (auth guards,
 * route fallbacks, error redirects).
 *
 * This rule enforces explicit declaration to clarify navigation intent.
 */

'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description:
        'enforce that Navigate components always have a replace prop to prevent redirection loops',
      category: 'Possible Errors',
      recommended: true,
    },
    fixable: null,
    schema: [],
    messages: {
      missingReplaceProp:
        'Navigate component must have an explicit replace prop to prevent redirection loops',
      replaceFalseNotAllowed:
        'Navigate component should avoid replace={false} as it can cause redirection loops when users navigate back',
    },
  },

  create(context) {
    return {
      JSXElement(node) {
        const elementName = node.openingElement.name;

        // Check if this is a Navigate component
        if (
          elementName.type === 'JSXIdentifier' &&
          elementName.name === 'Navigate'
        ) {
          const replaceProp = node.openingElement.attributes.find((attr) => {
            return (
              attr.type === 'JSXAttribute' &&
              attr.name &&
              attr.name.name === 'replace'
            );
          });

          if (!replaceProp) {
            context.report({
              node: node.openingElement,
              messageId: 'missingReplaceProp',
            });
          } else if (
            replaceProp.value &&
            replaceProp.value.type === 'JSXExpressionContainer' &&
            replaceProp.value.expression.type === 'Literal' &&
            replaceProp.value.expression.value === false
          ) {
            context.report({
              node: replaceProp,
              messageId: 'replaceFalseNotAllowed',
            });
          }
        }
      },
    };
  },
};
