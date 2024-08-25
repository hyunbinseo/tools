# Tools by Hyunbin

Fully typed JavaScript utilities with ESM and CJS support. [Module List](#modules)

## Usage

**Node.js**

```shell
npm i @hyunbinseo/tools
pnpm i @hyunbinseo/tools
```

```js
// Reference the following section for the full module list.
import { dateToSafeISOString, generatePINString } from '@hyunbinseo/tools';
```

**Browser**

```html
<script type="module">
  // Reference the following section for the full module list.
  // The major version number MUST be specified in the pathname.
  import {} from 'https://cdn.jsdelivr.net/npm/@hyunbinseo/tools@0.2/dist/index.js';
</script>
```

## Modules

### Date to ISO String with Timezone

Returns a `YYYY-MM-DDThh:mm:ss+hh:mm` [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) string. (date and time with the offset)

```js
const date = new Date('2024-05-26T00:00:00.000Z');

// 2024-05-26T08:45:00+08:45
dateToISOStringWithOffset(date, '+08:45');
dateToISOStringWithOffset(date, -525);
```

### Date to Day of the Week with Timezone

Returns a number where 0 represents Sunday.

```js
const date = new Date('2024-05-26T11:00:00Z');
dateToDayWithOffset(date, '-12:00'); // 6 — 5/25, Saturday
dateToDayWithOffset(date, '+00:00'); // 0 — 5/26, Sunday
dateToDayWithOffset(date, '+14:00'); // 1 — 5/27, Monday
```

### Date to Safe ISO String

Returns a timestamp string that can be safely used in filename, directory name, etc.

```js
dateToSafeISOString(); // Uses the current time (e.g. 20240402T020408.248Z)
dateToSafeISOString(new Date('2024-05-26T00:00:00+09:00')); // 20240525T150000.000Z

// The outputted string CANNOT be used in JavaScript.
new Date('20240525T150000.000Z'); // Invalid Date
```

### Generate PIN String

Returns a truly random number string using the [`Crypto.getRandomValues()`](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues) method.

```js
generatePINString(); // e.g. 270136
generatePINString(8); // e.g. 39534786
```

### To Readonly Map | Set | Record

[`ReadonlyMap` and `ReadonlySet` types](https://github.com/Microsoft/TypeScript/blob/main/src/lib/es2015.collection.d.ts) restrict write methods. (e.g. `set`, `add`)

```js
// ReadonlyMap<number, number>
const readonlyMap = toReadonly(new Map([[1, 30]]));
readonlyMap.set(1, 31); // Property 'set' does not exist

// ReadonlySet<number | boolean>
const readonlySet = toReadonly(new Set([5, 26, true]));
readonlySet.add(false); // Property 'add' does not exist

// Readonly<{ year: number }>;
const readonlyRecord = toReadonly({ year: 2017 });
// Cannot assign to 'year' because it is a read-only property.
readonlyRecord['year'] = 2024;
```
