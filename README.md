<h1 align="center">
  <!-- Logo -->
  <img src="https://raw.githubusercontent.com/rill-js/rill/master/Rill-Icon.jpg" alt="Rill"/>
  <br/>
  @rill/rewrite
	<br/>

  <!-- Stability -->
  <a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
    <img src="https://img.shields.io/badge/stability-stable-brightgreen.svg?style=flat-square" alt="API stability"/>
  </a>
  <!-- Standard -->
  <a href="https://github.com/feross/standard">
    <img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square" alt="Standard"/>
  </a>
  <!-- NPM version -->
  <a href="https://npmjs.org/package/@rill/rewrite">
    <img src="https://img.shields.io/npm/v/@rill/rewrite.svg?style=flat-square" alt="NPM version"/>
  </a>
  <!-- Downloads -->
  <a href="https://npmjs.org/package/@rill/rewrite">
    <img src="https://img.shields.io/npm/dm/@rill/rewrite.svg?style=flat-square" alt="Downloads"/>
  </a>
  <!-- Gitter Chat -->
  <a href="https://gitter.im/rill-js/rill">
    <img src="https://img.shields.io/gitter/room/rill-js/rill.svg?style=flat-square" alt="Gitter Chat"/>
  </a>
</h1>

URL rewrite and modify middleware for Rill.

# Installation

```console
npm install @rill/rewrite
```

## Examples

Rewrite using a regular expression.

```js
const app = require('rill')()

// `/i123` to `/items/123`
app.use(rewrite(/^\/i(\w+)/, '/items/$1'))
```

Rewrite using route parameters, references may be named or numeric.

```js
// `/foo..bar` to `/commits/foo/to/bar`
app.use(rewrite('/:src..:dst', '/commits/$1/to/$2'))
app.use(rewrite('/:src..:dst', '/commits/:src/to/:dst'))
```

You may also use the wildcard `*` to soak up several segments.

```js
// `/js/vendor/jquery.js` to `/public/assets/js/vendor/jquery.js`
app.use(rewrite('/js/*', '/public/assets/js/$1'))
```

---

### Contributions

* Use `npm test` to run tests.

Please feel free to create a PR!
