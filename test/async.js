'use strict';

const express = require('express');
const request = require('supertest');
const should = require('should');
const modern = require('../');
require('./fixtures/patch');

describe('Async', function() {
  it('async function', function * () {
    const app = express();
    app.get('/', modern(async function(req, res, next) {
      await new Promise(r => setTimeout(r, 10));
      res.send('async function');
    }));

    const res = yield request(app)
      .get('/')
      .endAsync();
    res.text.should.match(/async/);
  });

  it('async function error', function * () {
    const app = express();
    app.get('/', modern(async function(req, res, next) {
      await new Promise(r => setTimeout(r, 10));
      throw new Error('boom');
    }));

    app.use(modern(async function(err, req, res, next){
      res.status(500);
      res.send(err.message);
    }));

    const res = yield request(app)
      .get('/')
      .endAsync();
    res.text.should.match('boom');
  });
});