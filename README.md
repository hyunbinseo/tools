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
  import {} from 'https://cdn.jsdelivr.net/npm/@hyunbinseo/tools@0.1/dist/index.js';
</script>
```

## Modules

### Date to Safe ISO String

Timestamp string that can be safely used in filename, directory name, etc.

```js
dateToSafeISOString(); // Uses the current time (e.g. 20240402T020408.248Z)
dateToSafeIsoString(new Date('2024-05-26T00:00+09:00')); // 20240525T150000.000Z

// The outputted string CANNOT be used in JavaScript.
new Date('20240525T150000.000Z'); // Invalid Date
```

### Generate PIN String

Truly random number string using the [`Crypto.getRandomValues()`](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues) method.

```js
generatePINString(); // 270136
generatePinString(8); // 39534786
```
