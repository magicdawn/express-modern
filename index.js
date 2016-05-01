'use strict';

/**
 * module dependencies
 */

const co = require('co');

/**
 * utils
 */

const isGeneratorFunction = f =>
  typeof f === 'function' &&
  f.constructor.name === 'GeneratorFunction';

const hasCatch = p =>
  typeof p === 'object' &&
  p.catch &&
  typeof p.catch === 'function';

const slice = [].slice;

/**
 * modern
 *
 * 1. normal fn
 * 2. async function
 * 3. generator function
 */

const modern = module.exports = function express_modern(fn) {
  // args length
  const len = fn.length;

  // generator function
  if (isGeneratorFunction(fn)) fn = co.wrap(fn);

  if (len === 4) {
    return function(err, req, res, next) {
      // normal case
      if (typeof next === 'function') {
        return run.call(this, next, slice.call(arguments));
      };

      // router.params('user', (req, res, next, user)=>{ ... })
      if (typeof res === 'function') {
        let _next = res;
        return run.call(this, _next, slice.call(arguments));
      }

      throw new TypeError('unsupported arguments type');
    };
  } else {
    return function(req, res, next) {
      run.call(this, next, slice.call(arguments));
    };
  }

  function run(next, args) {
    try {
      const ret = fn.apply(this, args); // call
      if (hasCatch(ret)) ret.catch(next); // catch
    } catch (e) {
      next(e);
    }
  }
};