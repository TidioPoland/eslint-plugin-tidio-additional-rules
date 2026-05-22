# Enforce size="m" on Button inside ModalFooter (button-size-m-in-modals)

Buttons inside `ModalFooter` should always use `size="m"` to maintain visual consistency across modals. This rule also requires the `size` prop to be set explicitly rather than relying on the Button component's default, which could change independently.

## Rule Details

This rule warns when a `Button` inside a `ModalFooter` either uses a size other than `"m"` or is missing the `size` prop entirely. The check traverses JSX ancestors, so it works even when buttons are wrapped in intermediate components (e.g. `<ButtonsWrapper>`).

Examples of **incorrect** code for this rule:

```jsx
<ModalFooter>
  <Button size="s">Save</Button>
</ModalFooter>
```

```jsx
<ModalFooter>
  <Button>Save</Button>
</ModalFooter>
```

```jsx
<ModalFooter>
  <ButtonsWrapper>
    <Button size="l">Cancel</Button>
  </ButtonsWrapper>
</ModalFooter>
```

Examples of **correct** code for this rule:

```jsx
<ModalFooter>
  <Button size="m">Save</Button>
</ModalFooter>
```

```jsx
<ModalFooter>
  <ButtonsWrapper>
    <Button size="m">Cancel</Button>
    <Button size="m">Save</Button>
  </ButtonsWrapper>
</ModalFooter>
```

```jsx
// Buttons outside ModalFooter are not affected
<Button size="s">Small button</Button>
```

## When Not To Use It

If your project does not use `ModalFooter` and `Button` from the design system, or if modal footer buttons intentionally use varying sizes.
