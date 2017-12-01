const EJSON = require('ejson');
const Qty = require('js-quantities');
const assert = require('assert');
const assign = Object.assign || require('object.assign');

const {
  prototype,
  shims,
  typeName,
  factory,
} = require('../types/jsQuantities');

assign(prototype, shims);
if (typeof typeName === 'string') {
  EJSON.addType(typeName, factory);
} else {
  typeName.forEach(typeName => EJSON.addType(typeName, factory));
}

const oneMeterQty = new Qty('1 m');
const oneMeterStringified =
  '{"$type":"Qty","$value":{"scalar":1,"numerator":["<meter>"],"denominator":["<1>"]}}';
const oneHundredCentimeterQty = new Qty('100 cm');

describe('js-quantities', function() {
  it('should stringify a Qty', function() {
    assert.equal(EJSON.stringify(oneMeterQty), oneMeterStringified);
  });

  it('should construct a Qty', function() {
    assert.ok(EJSON.parse(oneMeterStringified) instanceof Qty);
  });

  it('should parse and stringify a Qty', function() {
    const stringified = EJSON.stringify(oneMeterQty);
    assert.ok(oneMeterQty.eq(EJSON.parse(stringified)));
  });

  it('should test equality of Qtys', function() {
    assert.ok(EJSON.equals(oneMeterQty, oneHundredCentimeterQty));
  });

  it('should clone a Qty', function() {
    const clone = EJSON.clone(oneMeterQty);
    assert.ok(clone instanceof Qty);
    assert.ok(clone != oneMeterQty);
  });
});
