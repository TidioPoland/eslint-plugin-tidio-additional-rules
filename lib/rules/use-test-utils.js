/**
 * @fileoverview `userEvent`, `QueryClientProvider`, `ToastManager` shouldn't be imported directly in tests
 * @author Daniel Domański
 *
 */
'use strict';
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
module.exports = {
  meta: {
    docs: {
      description:
        "userEvent, QueryClientProvider, ToastManager shouldn't be imported directly in tests. Use methods provided in testHelpers.",
      category: 'Stylistic Issues',
      recommended: false,
    },
    fixable: null, // or "code" or "whitespace"
    schema: [],
  },

  create: function (context) {
    return {
      ImportDeclaration(node) {
        const fileName = context.getFilename();
        if (!fileName.includes('.test.')) {
          return undefined;
        }
        const providers = ['QueryClientProvider', 'ToastManager'];
        const forbiddenImports = ['userEvent', 'QueryClient', ...providers];
        const hasForbiddenImport = node.specifiers.some((specifier) =>
          forbiddenImports.includes(specifier.local.name)
        );
        if (hasForbiddenImport) {
          context.report({
            node: node,
            message:
              "userEvent, QueryClientProvider, ToastManager shouldn't be imported directly in tests. Use methods provided in testHelpers.",
          });
        }
      },
    };
  },
};
