'use strict';
//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/navigate-must-have-replace-prop'),
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
ruleTester.run('navigate-must-have-replace-prop', rule, {
  valid: [
    {
      code: '<Navigate to="/home" replace={true} />',
    },
    {
      code: '<Navigate to="/home" replace />',
    },
    {
      code: '<Navigate to="/home" state={{ from: location }} replace={true} />',
    },
    {
      code: '<div>Not a Navigate component</div>',
    },
    {
      code: '<Link to="/home">Go home</Link>',
    },
    {
      code: '<OtherComponent navigate={true} />',
    },
  ],

  invalid: [
    {
      code: '<Navigate to="/home" />',
      errors: [
        {
          messageId: 'missingReplaceProp',
        },
      ],
    },
    {
      code: '<Navigate to="/home" replace={false} />',
      errors: [
        {
          messageId: 'replaceFalseNotAllowed',
        },
      ],
    },
    {
      code: '<Navigate to="/home" state={{ from: location }} />',
      errors: [
        {
          messageId: 'missingReplaceProp',
        },
      ],
    },
    {
      code: '<Navigate to="/home" state={{ from: location }} replace={false} />',
      errors: [
        {
          messageId: 'replaceFalseNotAllowed',
        },
      ],
    },
    {
      code: `
        function MyComponent() {
          return <Navigate to="/redirect" />;
        }
      `,
      errors: [
        {
          messageId: 'missingReplaceProp',
        },
      ],
    },
    {
      code: `
        const redirectComponent = (
          <Navigate 
            to="/dashboard" 
            state={{ from: 'login' }}
          />
        );
      `,
      errors: [
        {
          messageId: 'missingReplaceProp',
        },
      ],
    },
  ],
});
