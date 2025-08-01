/**
 * @fileoverview Disallow useNavigate import from react-router-dom
 *
 * useStableNavigate is a memoized version that prevents unnecessary re-renders
 * that can occur with the standard useNavigate hook from react-router-dom.
 *
 * This helps improve performance by reducing component re-renders when
 * navigation is used in a component or passed as a prop.
 */

'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description:
        'disallow useNavigate import from react-router-dom, use useStableNavigate instead to prevent re-renders',
      category: 'Best Practices',
      recommended: true,
    },
    fixable: null,
    schema: [],
    messages: {
      useStableNavigate:
        'Use useStableNavigate instead of useNavigate to prevent unnecessary re-renders',
    },
  },

  create(context) {
    return {
      ImportDeclaration(node) {
        if (node.source.value === 'react-router-dom') {
          const useNavigateSpecifier = node.specifiers.find(
            (specifier) =>
              specifier.type === 'ImportSpecifier' &&
              specifier.imported.name === 'useNavigate',
          );

          if (useNavigateSpecifier) {
            context.report({
              node: useNavigateSpecifier,
              messageId: 'useStableNavigate',
            });
          }
        }
      },
    };
  },
};
