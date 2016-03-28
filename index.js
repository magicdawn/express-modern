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
      run.apply(this, [].slice.call(arguments));
    };
  } else {
    return function(req, res, next) {
      run.apply(this, [].slice.call(arguments));
    };
  }

  function run() {
    const next = arguments[len - 1];
    try {
      const ret = fn.apply(this, [].slice.call(arguments)); // call
      if (hasCatch(ret)) ret.catch(next); // catch
    } catch (e) {
      next(e);
    }
  }
};