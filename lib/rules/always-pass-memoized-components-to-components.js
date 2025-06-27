/**
 * @fileoverview Always pass memoized components to components
 * @author Jarosław Salwa
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Always pass memoized components to components',
      category: 'Stylistic Issues',
      recommended: false,
    },
    fixable: null, // or "code" or "whitespace"
    schema: [
      {
        type: 'object',
        properties: {
          ignoredComponentNames: {
            type: 'array',
            items: { type: 'string' },
            default: [],
          },
          ignoredPropNames: {
            type: 'array',
            items: { type: 'string' },
            default: [],
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      mustMemoize: 'Always pass memoized components to components',
    },
  },

  create(context) {
    const filename = context.getFilename();
    if (filename.endsWith('.test.tsx') || filename.endsWith('.stories.tsx')) {
      return {};
    }

    const memoizedIdentifiers = new Set();
    const possiblyJSXIdentifiers = new Set();

    const options = context.options?.[0] || {};
    const ignoredComponentNames = new Set(options.ignoredComponentNames || []);
    const ignoredPropNames = new Set(options.ignoredPropNames || []);

    function isIgnoredJSXElement(element) {
      if (
        element &&
        element.type === 'JSXElement' &&
        element.openingElement.name &&
        element.openingElement.name.type === 'JSXIdentifier'
      ) {
        return ignoredComponentNames.has(element.openingElement.name.name);
      }
      return false;
    }

    function containsNonMemoizedJSX(expr) {
      if (!expr) return false;

      switch (expr.type) {
        case 'JSXElement':
          return !isIgnoredJSXElement(expr);

        case 'Identifier':
          // Only report identifiers that are known to be JSX and not memoized
          return (
            !memoizedIdentifiers.has(expr.name) &&
            possiblyJSXIdentifiers.has(expr.name)
          );

        case 'ConditionalExpression':
          return (
            containsNonMemoizedJSX(expr.consequent) ||
            containsNonMemoizedJSX(expr.alternate)
          );

        case 'LogicalExpression':
          return (
            containsNonMemoizedJSX(expr.left) ||
            containsNonMemoizedJSX(expr.right)
          );

        // Safe cases — skip
        case 'Literal':
        case 'TemplateLiteral':
        case 'ArrayExpression':
        case 'ObjectExpression':
        case 'UnaryExpression':
        case 'BinaryExpression':
        case 'MemberExpression':
        case 'CallExpression':
          return false;

        default:
          return false;
      }
    }

    return {
      VariableDeclarator(node) {
        const { id, init } = node;
        if (id.type !== 'Identifier' || !init) {
          return false;
        }

        if (init.type === 'CallExpression' && init.callee.name === 'useMemo') {
          memoizedIdentifiers.add(id.name);
        } else if (init.type === 'JSXElement') {
          possiblyJSXIdentifiers.add(id.name);
        }
      },

      JSXAttribute(node) {
        const parent = node.parent;
        if (!parent || !parent.name || parent.name.type !== 'JSXIdentifier')
          return;

        // Skip if component is in ignored list
        if (ignoredComponentNames.has(parent.name.name)) {
          return false;
        }

        // Skip if prop name is ignored
        if (ignoredPropNames.has(node.name.name)) {
          return false;
        }

        if (
          node.value &&
          node.value.type === 'JSXExpressionContainer' &&
          containsNonMemoizedJSX(node.value.expression)
        ) {
          context.report({
            node,
            messageId: 'mustMemoize',
          });
        }
      },
    };
  },
};
