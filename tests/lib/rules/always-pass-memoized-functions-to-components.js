'use strict';
//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/always-pass-memoized-functions-to-components'),
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
ruleTester.run('always-pass-memoized-functions-to-components', rule, {
  valid: [
    `const ExampleComponent = () => {
  const exampleFunction = useCallback(() => {
    console.log("example");
  }, []);

  return <ExampleComponent2 propFunction={exampleFunction}>test</ExampleComponent2>;
};

export default ExampleComponent;`,
    `
    const exampleFunction = () => {
    console.log("example");
  };
    const ExampleComponent = () => {

  return <ExampleComponent2 propFunction={exampleFunction}>test</ExampleComponent2>;
};

export default ExampleComponent;`,
    `
    const ExampleComponent = ({exampleFunction}) => {

  return <ExampleComponent2 propFunction={exampleFunction}>test</ExampleComponent2>;
};

export default ExampleComponent;`,
`const ExampleComponent = () => {
  const exampleFunction = () => {
    console.log("example");
  };

  return <a onClick={exampleFunction}>test</a>;
};

export default ExampleComponent;`,
  ],

  invalid: [
    {
      code: `const ExampleComponent = () => {
  const exampleFunction = () => {
    console.log("example");
  };

  return <ExampleComponent2 propFunction={exampleFunction}>test</ExampleComponent2>;
};

export default ExampleComponent;`,
      errors: [
        {
          message: 'Always pass memoized functions to components',
          type: 'Identifier',
        },
      ],
    },
    {
      code: `const ExampleComponent = () => {

  return <ExampleComponent2 propFunction={() => {}}>test</ExampleComponent2>;
};

export default ExampleComponent;`,
      errors: [
        {
          message: 'Always pass memoized functions to components',
          type: 'ArrowFunctionExpression',
        },
      ],
    },
  ],
});
