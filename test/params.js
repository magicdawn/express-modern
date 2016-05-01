'use strict';

const express = require('express');
const request = require('supertest');
const should = require('should');
const modern = require('../');
require('./fixtures/patch');

describe('router.params', function() {
  it('(req,res,next,val) works', function * () {
    const app = express();

    app.param('id', modern(function * (req, res, next, id) {
      req.id = yield Promise.resolve(Number(id) * 2);
      next();
    }));

    app.get('/:id', modern(function * (req, res, next) {
      res.send(req.id.toString());
    }));

    const text = yield request(app)
      .get('/10')
      .endAsync()
      .then(res => res.text);
    Number(text).should.equal(20);
  });
});