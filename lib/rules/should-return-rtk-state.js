/**
 * @fileoverview disallow direct state assignment in Redux Toolkit reducers
 * @author Daniel Domański
 */
'use strict';
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow direct state assignment in Redux Toolkit reducers',
      category: 'Best Practices',
      recommended: false,
    },
    messages: {
      noStateAssignment:
        "Avoid directly assigning to 'state'. Return the updated state instead in Redux Toolkit reducers.",
    },
    schema: [],
  },
  create(context) {
    return {
      AssignmentExpression(node) {
        if (node.left.type === 'Identifier' && node.left.name === 'state') {
          context.report({
            node,
            messageId: 'noStateAssignment',
          });
        }
      },
    };
  },
};
