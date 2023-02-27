# eslint-plugin-tidio-additional-rules

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `@tidio/eslint-plugin-tidio-additional-rules`:

```
$ npm install @tidio/eslint-plugin-tidio-additional-rules --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `@tidio/eslint-plugin-tidio-additional-rules` globally.

## Usage

Add `@tidio/eslint-plugin-tidio-additional-rules` to the plugins section of your `.eslintrc` configuration file.

```json
{
  "plugins": ["tidio-additional-rules"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "@tidio/tidio-additional-rules/rule-name": 2
  }
}
```
