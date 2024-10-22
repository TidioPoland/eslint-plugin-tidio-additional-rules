/**
 * @fileoverview utils/lang, store/lang should not be imported in webApp/mobileApp
 * @author Jarosław Salwa
 */
'use strict';
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
module.exports = {
  meta: {
    docs: {
      description:
        'utils/lang, store/lang should not be imported in webApp/mobileApp',
      category: 'Stylistic Issues',
      recommended: false,
    },
    fixable: null, // or "code" or "whitespace"
    schema: [
      {
        modules: {
          type: 'array',
          items: {
            type: 'string',
          },
          required: true,
        },
      },
    ],
  },

  create: function (context) {
    return {
      ImportDeclaration(node) {
        const foundModule = context.options[0] || { modules: [] };
        const { modules } = foundModule;
        const fileName = context.getFilename();
        const matchModuleInFilename = modules.find((module) => {
          const regex = new RegExp(`/${module}/`);
          if (regex.test(fileName)) {
            return true;
          }
          return false;
        });
        if (fileName.includes('.test.') || !matchModuleInFilename) {
          return undefined;
        }

        if (
          node.source.value.endsWith('/lang') &&
          !node.source.value.endsWith('./lang')
        ) {
          context.report({
            node: node,
            message: `trans in ${matchModuleInFilename} should always be imported from 'lang' instead of from '${node.source.value}'`,
          });
        }
      },
    };
  },
};
