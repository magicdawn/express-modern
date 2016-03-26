# express-modern
use async function or generator function with express

[![Build Status](https://travis-ci.org/magicdawn/express-modern.svg)](https://travis-ci.org/magicdawn/express-modern)
[![Coverage Status](https://coveralls.io/repos/github/magicdawn/express-modern/badge.svg?branch=master)](https://coveralls.io/github/magicdawn/express-modern?branch=master)
[![npm version](https://img.shields.io/npm/v/express-modern.svg)](https://www.npmjs.com/package/express-modern)
[![npm downloads](https://img.shields.io/npm/dm/express-modern.svg)](https://www.npmjs.com/package/express-modern)
[![npm license](https://img.shields.io/npm/l/express-modern.svg)](http://magicdawn.mit-license.org)

## Install

```js
npm i express-modern --save
```

## API

```js
const modern = require('express-modern');
```

### generator function

```js
const app = express();
app.get('/', modern(function * (req, res, next) {
  yield new Promise(r => setTimeout(r, 10));
  res.send('generator function');
}));

const res = yield request(app)
  .get('/')
  .endAsync();
res.text.should.match(/generator/);
```

the generator function will be wrap via `co.wrap`. and the `modern` function
will take care of the arity of the handler. see http://expressjs.com/en/guide/error-handling.html

### async function

```js
const app = express();
app.get('/', modern(async function(req, res, next) {
  await new Promise(r => setTimeout(r, 10));
  res.send('async function');
}));

const res = yield request(app)
  .get('/')
  .endAsync();
res.text.should.match(/async/);
```

the async function will be called & the rejected value will be passed to `next` automatically

### normal function

```js
const app = express();
app.get('/', modern((req, res, next) => {
  res.send('normal function');
}));

const res = yield request(app)
  .get('/')
  .endAsync();

res.text.should.match(/normal/);
```

the `modern` function does nothing on normal function.

## Changelog

[CHANGELOG.md](CHANGELOG.md)

## License

the MIT License http://magicdawn.mit-license.org