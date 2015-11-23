# Rill Rewrite
URL rewrite middleware for Rill.

# Installation

#### Npm
```console
npm install @rill/rewrite
```

## Examples

Rewrite using a regular expression.

```js
// `/i123` to `/items/123`
app.use(rewrite(/^\/i(\w+)/, '/items/$1'));
```

Rewrite using route parameters, references may be named or numeric.

```js
// `/foo..bar` to `/commits/foo/to/bar`
app.use(rewrite('/:src..:dst', '/commits/$1/to/$2'));
app.use(rewrite('/:src..:dst', '/commits/:src/to/:dst'));
```

You may also use the wildcard `*` to soak up several segments.

```js
// `/js/vendor/jquery.js` to `/public/assets/js/vendor/jquery.js`
app.use(rewrite('/js/*', '/public/assets/js/$1'));
```

---

### Contributions

* Use gulp to run tests.

Please feel free to create a PR!