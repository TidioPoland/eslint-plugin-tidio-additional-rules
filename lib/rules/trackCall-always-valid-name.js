'use strict';
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
module.exports = {
  meta: {
    docs: {
      description: 'trackCall should always be imported as trackCall',
      category: 'Stylistic Issues',
      recommended: false,
    },
    fixable: null, // or "code" or "whitespace"
    schema: [],
  },

  create: function (context) {
    return {
      ImportDeclaration(node) {
        if (node.source.value === 'track') {
          for (let i = 0; i < node.specifiers.length; i += 1) {
            if (
              node.specifiers[i].type === 'ImportSpecifier' &&
              node.specifiers[i].imported.name === 'trackCall' &&
              node.specifiers[i].local.name !== 'trackCall'
            ) {
              context.report({
                node,
                message:
                  'trackCall should always be imported as trackCall. Currently it is "{{ name }}"',
                data: { name: node.specifiers[i].local.name },
              });
            }
          }
        }
        return undefined;
      },
    };
  },
};
