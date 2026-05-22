/**
 * @fileoverview Enforce size="m" on Button components used inside ModalFooter
 * @author button-size-m-in-modals
 */

'use strict';

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

function isInsideModalFooter(node) {
  let current = node.parent;
  while (current) {
    if (
      current.type === 'JSXElement' &&
      current.openingElement?.name?.name === 'ModalFooter'
    ) {
      return true;
    }
    current = current.parent;
  }
  return false;
}

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description:
        'enforce size="m" on Button components used inside ModalFooter',
    },
    fixable: null,
    schema: [],
    messages: {
      wrongButtonSize:
        'Button inside a modal should use size="m". Got size="{{ size }}".',
      missingButtonSize:
        'Button inside a modal should have an explicit size="m" prop.',
    },
  },

  create(context) {
    return {
      JSXOpeningElement(node) {
        if (node.name.name !== 'Button' || !isInsideModalFooter(node)) {
          return;
        }

        const sizeAttr = node.attributes.find(
          (attr) =>
            attr.type === 'JSXAttribute' && attr.name?.name === 'size',
        );

        if (!sizeAttr) {
          context.report({
            node,
            messageId: 'missingButtonSize',
          });
          return;
        }

        const value = sizeAttr.value;
        const sizeValue =
          value?.type === 'Literal'
            ? value.value
            : value?.type === 'JSXExpressionContainer' &&
                value.expression?.type === 'Literal'
              ? value.expression.value
              : undefined;

        if (sizeValue !== undefined && sizeValue !== 'm') {
          context.report({
            node: sizeAttr,
            messageId: 'wrongButtonSize',
            data: { size: String(sizeValue) },
          });
        }
      },
    };
  },
};
