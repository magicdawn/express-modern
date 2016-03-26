'use strict';

const express = require('express');
const request = require('supertest');
const should = require('should');
const modern = require('../');
require('./fixtures/patch');

describe('Generator', function() {
  it('generator function', function * () {
    const app = express();
    app.get('/', modern(function * (req, res, next) {
      yield new Promise(r => setTimeout(r, 10));
      res.send('generator function');
    }));

    const res = yield request(app)
      .get('/')
      .endAsync();
    res.text.should.match(/generator/);
  });

  it('generator function error', function * () {
    const app = express();
    app.get('/', modern(function * (req, res, next) {
      yield new Promise(r => setTimeout(r, 10));
      throw new Error('boom in gen');
    }));

    app.use(modern(function * (err, req, res, next) {
      res.status(500);
      res.send(err.message.split(/ /)[0]);
    }));

    const res = yield request(app)
      .get('/')
      .endAsync();
    res.status.should.equal(500);
    res.text.should.equal('boom');
  });
});

describe('Normal function', function() {
  it('normal function', function * () {
    const app = express();
    app.get('/', modern((req, res, next) => {
      res.send('normal function');
    }));

    const res = yield request(app)
      .get('/')
      .endAsync();

    res.text.should.match(/normal/);
  });
});