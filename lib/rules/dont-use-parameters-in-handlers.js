/**
 * @fileoverview Disallow parameters in handlers functions
 */
'use strict';

module.exports = {
  meta: {
    docs: {
      description: 'Disallow parameters in handlers functions',
      category: 'Stylistic Issues',
      recommended: false,
    },
    fixable: null,
    schema: [],
  },

  create(context) {
    const filename = context.getFilename();
    const isHandlerFile = filename.includes('handlers.ts');
    if (!isHandlerFile) return {};

    const mocksImports = new Set();
    const sourceCode = context.getSourceCode();

    return {
      ImportDeclaration(node) {
        const source = node.source.value;
        if (source.endsWith('/mocks') || source === './mocks') {
          for (const spec of node.specifiers) {
            if (spec.imported && spec.imported.name) {
              mocksImports.add(spec.imported.name);
            }
          }
        }
      },

      'FunctionDeclaration, FunctionExpression, ArrowFunctionExpression'(node) {
        if (!node.params || node.params.length === 0) return;

        const scope =
          (typeof context.getScope === 'function' && context.getScope()) ||
          sourceCode.scopeManager?.acquire?.(node) ||
          null;

        const variablesInScope = scope?.variables || [];

        for (const param of node.params) {
          const paramName =
            param.type === 'Identifier'
              ? param.name
              : param.type === 'AssignmentPattern' &&
                param.left.type === 'Identifier'
              ? param.left.name
              : null;

          if (!paramName) continue;

          if (paramName === 'body') {
            context.report({ node, message: 'Do not use parameters in handlers.' });
            return;
          }

          if (
            param.type === 'AssignmentPattern' &&
            param.right.type === 'Identifier' &&
            mocksImports.has(param.right.name)
          ) {
            context.report({ node, message: 'Do not use parameters in handlers.' });
            return;
          }

          const paramVar = variablesInScope.find((v) => v.name === paramName);
          const references = paramVar?.references || [];

          const usedInBodyProp = references.some((ref) => {
            let current = ref.identifier;
            while (current && current.parent) {
              const parent = current.parent;
              if (
                parent.type === 'Property' &&
                parent.key.name === 'body' &&
                parent.value === current
              ) {
                return true;
              }
              current = parent;
            }
            return false;
          });

          if (usedInBodyProp) {
            context.report({ node, message: 'Do not use parameters in handlers.' });
            return;
          }
        }
      },
    };
  },
};