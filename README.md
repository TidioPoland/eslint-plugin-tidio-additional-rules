# eslint-plugin-rules

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `@tidio/eslint-plugin-rules`:

```
$ npm install @tidio/eslint-plugin-rules --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `@tidio/eslint-plugin-rules` globally.

## Usage

Add `@tidio/eslint-plugin-rules` to the plugins section of your `.eslintrc` configuration file.

```json
{
  "plugins": ["@tidio/rules"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "@tidio/rules/rule-name": 2
  }
}
```
