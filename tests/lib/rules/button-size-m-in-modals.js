'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/button-size-m-in-modals'),
  RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
});

var ruleTester = new RuleTester();
ruleTester.run('button-size-m-in-modals', rule, {
  valid: [
    {
      code: '<ModalFooter><Button size="m">Save</Button></ModalFooter>',
    },
    {
      code: '<ModalFooter><Button size={"m"}>Save</Button></ModalFooter>',
    },
    {
      code: `
        <ModalFooter>
          <ButtonsWrapper>
            <Button size="m">Cancel</Button>
            <Button size="m">Save</Button>
          </ButtonsWrapper>
        </ModalFooter>
      `,
    },
    {
      code: '<Button size="s">Outside modal</Button>',
    },
    {
      code: '<Button>No size, outside modal</Button>',
    },
    {
      code: '<ModalBody><Button size="s">Not in footer</Button></ModalBody>',
    },
    {
      code: '<div><Button size="xs">Unrelated</Button></div>',
    },
  ],

  invalid: [
    {
      code: '<ModalFooter><Button size="s">Save</Button></ModalFooter>',
      errors: [
        {
          messageId: 'wrongButtonSize',
        },
      ],
    },
    {
      code: '<ModalFooter><Button size={"l"}>Save</Button></ModalFooter>',
      errors: [
        {
          messageId: 'wrongButtonSize',
        },
      ],
    },
    {
      code: '<ModalFooter><Button>Save</Button></ModalFooter>',
      errors: [
        {
          messageId: 'missingButtonSize',
        },
      ],
    },
    {
      code: `
        <ModalFooter>
          <ButtonsWrapper>
            <Button size="s">Cancel</Button>
            <Button size="m">Save</Button>
          </ButtonsWrapper>
        </ModalFooter>
      `,
      errors: [
        {
          messageId: 'wrongButtonSize',
        },
      ],
    },
    {
      code: `
        <ModalFooter>
          <ButtonsWrapper>
            <Button>Cancel</Button>
            <Button>Save</Button>
          </ButtonsWrapper>
        </ModalFooter>
      `,
      errors: [
        {
          messageId: 'missingButtonSize',
        },
        {
          messageId: 'missingButtonSize',
        },
      ],
    },
    {
      code: `
        <ModalFooter>
          <Button type="primary" loading={loading}>Save</Button>
        </ModalFooter>
      `,
      errors: [
        {
          messageId: 'missingButtonSize',
        },
      ],
    },
  ],
});
