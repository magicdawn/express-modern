'use strict';

const Test = require('supertest').Test;
const pify = require('promise.ify');
Test.prototype.endAsync = pify(Test.prototype.end);