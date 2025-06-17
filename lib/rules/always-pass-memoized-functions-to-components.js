/**
 * @fileoverview Always pass memoized functions to components
 * @author Jarosław Salwa
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Always pass memoized functions to components',
      category: 'Stylistic Issues',
      recommended: false,
    },
    fixable: null, // or "code" or "whitespace"
    schema: [
      // fill in your schema
    ],
  },

  create(context) {
    const moduleScopeFunctions = new Set();
    let inComponent = false;
    let localFunctions = [];
    let memoizedFunctions = new Set();
    const ancestors = [];
    function isFunctionComponent(node) {
      if (node.type === 'FunctionDeclaration' && node.id) {
        return /^[A-Z]/.test(node.id.name);
      }
      if (
        node.type === 'VariableDeclarator' &&
        node.id.type === 'Identifier' &&
        node.init &&
        node.init.type === 'ArrowFunctionExpression'
      ) {
        return /^[A-Z]/.test(node.id.name);
      }
      return false;
    }

    return {
      Program(node) {
        ancestors.push(node);
      },
      'Program:exit'(node) {
        ancestors.pop();
      },
      FunctionDeclaration(node) {
        const scope = context.getSourceCode().scopeManager.acquire(node);
        if (scope?.type === 'module' && node.id?.name) {
          moduleScopeFunctions.add(node.id.name);
        }
      },

      VariableDeclarator(node) {
        ancestors.push(node);
        const name = node.id.name;
        const init = node.init;

        // Track module-scope arrow functions
        const scope = context.getSourceCode().scopeManager.acquire(node);
        if (
          scope?.type === 'module' &&
          node.init &&
          ['ArrowFunctionExpression', 'FunctionExpression'].includes(
            node.init.type,
          )
        ) {
          moduleScopeFunctions.add(node.id.name);
        }

        // Detect function components
        if (isFunctionComponent(node)) {
          inComponent = true;
          localFunctions = [];
          memoizedFunctions = new Set();
        }

        // Track inner local functions
        if (
          inComponent &&
          init &&
          (init.type === 'ArrowFunctionExpression' ||
            init.type === 'FunctionExpression')
        ) {
          const isUseCallback = ancestors.some(
            (ancestor) =>
              ancestor.type === 'CallExpression' &&
              ancestor.callee.type === 'Identifier' &&
              ancestor.callee.name === 'useCallback',
          );

          if (isUseCallback) {
            memoizedFunctions.add(name);
          } else {
            localFunctions.push({ name, node: node.id });
          }
        }
      },
      'VariableDeclarator:exit'(node) {
        ancestors.pop();
        if (isFunctionComponent(node)) {
          inComponent = false;
          localFunctions = [];
          memoizedFunctions = new Set();
        }
      },

      JSXAttribute(node) {
        if (!node.value || node.value.type !== 'JSXExpressionContainer') {
          return true;
        }

        const expr = node.value.expression;
        const parentElement = node.parent?.name;
        const isDOMElement =
          parentElement &&
          parentElement.type === 'JSXIdentifier' &&
          /^[a-z]/.test(parentElement.name); // native DOM tag

        if (isDOMElement) {
          return true;
        }

        if (expr.type === 'Identifier') {
          const name = expr.name;
          const isLocal = localFunctions.find((fn) => fn.name === name);
          const isMemoized = memoizedFunctions.has(name);
          const isGlobal = moduleScopeFunctions.has(name);

          if (isLocal && !isMemoized && !isGlobal) {
            context.report(
              expr,
              'Always pass memoized functions to components',
            );
          }
        }

        if (
          expr.type === 'ArrowFunctionExpression' ||
          expr.type === 'FunctionExpression'
        ) {
          context.report(expr, 'Always pass memoized functions to components');
        }
      },
    };
  },
};
