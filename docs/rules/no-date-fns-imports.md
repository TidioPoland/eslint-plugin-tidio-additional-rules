# Disallow importing from date-fns outside of utils/date (no-date-fns-imports)

`utils/date` is the single wrapper around `date-fns`. It applies the operator's locale to
`format`/`parse`, returns `[Invalid date]` plus a logged error instead of throwing on bad input,
and exposes date patterns as the `DatePatterns` enum. Importing `date-fns` directly bypasses all
of that, so formatted dates silently fall back to `en-US` and invalid dates throw at runtime.

This rule flags `date-fns` and `@date-fns/*` in `import`, `export ... from`, `import()`, and
`require()`, and exempts `utils/date.ts` and `utils/date.test.ts`.

## Rule Details

Examples of **incorrect** code for this rule:

```ts
import { addDays } from 'date-fns';
import { de } from 'date-fns/locale';
import { TZDate } from '@date-fns/tz';
export { addDays } from 'date-fns';
const { addDays } = require('date-fns');
```

Examples of **correct** code for this rule:

```ts
import { DatePatterns, addDays, format } from 'utils/date';
```

If the helper you need is not exported from `utils/date` yet, re-export it there first.

## Options

```json
{
  "@tidio/rules/no-date-fns-imports": [
    2,
    { "allowedFilePatterns": ["utils/date.ts", "utils/date.test.ts"] }
  ]
}
```

- `allowedFilePatterns` — substrings matched against the linted file's path. A file whose path
  contains any of them is exempt. Defaults to `["utils/date.ts", "utils/date.test.ts"]`.

## When Not To Use It

In a repo that has no `utils/date` wrapper.
