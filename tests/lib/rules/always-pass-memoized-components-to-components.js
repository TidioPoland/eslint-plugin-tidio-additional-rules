'use strict';
//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/always-pass-memoized-components-to-components'),
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
ruleTester.run('always-pass-memoized-components-to-components', rule, {
  valid: [
    `const ExampleComponent = () => {
 const testComponent = useMemo(() => <OtherComponent />, [])

  return <ExampleComponent2 propComponent={testComponent}>test</ExampleComponent2>;
};

export default ExampleComponent;`,
    `const ExampleComponent = () => {
 const testComponent = useMemo(() => <OtherComponent />, [])

  return <ExampleComponent2 propComponent={isUndefined ? testComponent : null}>test</ExampleComponent2>;
};

export default ExampleComponent;`,
  `const ExampleComponent = () => {
 const testFn = useCallback(() => {return true;}, [])

  return <ExampleComponent2 testFn={testFn}>test</ExampleComponent2>;
};

export default ExampleComponent;`,
{
      code: `<Route prop={<OtherComponent />} />`,
      options: [{ ignoredComponentNames: ['Route'] }],
    },
    {
      code: `<Component iconElement={<OtherComponent />} />`,
      options: [{ ignoredPropNames: ['iconElement'] }],
    },
  ],

  invalid: [
    {
      code: `const ExampleComponent = () => {
  return <ExampleComponent2 propComponent={<OtherComponent />}>test</ExampleComponent2>;
};

export default ExampleComponent;`,
      errors: [
        {
          message: 'Always pass memoized components to components',
          type: 'JSXAttribute',
        },
      ],
    },
    {
      code: `const ExampleComponent = () => {
        const testComponent = <OtherComponent />
  return <ExampleComponent2 propComponent={testComponent}>test</ExampleComponent2>;
};

export default ExampleComponent;`,
      errors: [
        {
          message: 'Always pass memoized components to components',
          type: 'JSXAttribute',
        },
      ],
    },
    {
      code: `const ExampleComponent = () => {
        const testComponent = <OtherComponent />
  return <ExampleComponent2 propComponent={isUndefined ? testComponent : undefined}>test</ExampleComponent2>;
};

export default ExampleComponent;`,
      errors: [
        {
          message: 'Always pass memoized components to components',
          type: 'JSXAttribute',
        },
      ],
    },
    {
      code: `const ExampleComponent = () => {
  return <ExampleComponent2 propComponent={isUndefined ? <OtherComponent /> : undefined}>test</ExampleComponent2>;
};

export default ExampleComponent;`,
      errors: [
        {
          message: 'Always pass memoized components to components',
          type: 'JSXAttribute',
        },
      ],
    },
  ],
});
