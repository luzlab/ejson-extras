const assert = require('assert');
const EJSON = require('ejson');
const assign = Object.assign || require('object.assign');

const { prototype, shims, typeName, factory } = require('../types/map');

assign(prototype, shims);
if (typeof typeName === 'string') {
  EJSON.addType(typeName, factory);
} else {
  typeName.forEach(name => EJSON.addType(name, factory));
}

const map = new Map().set('foo', 'bar').set('hello', 'world');
const mapDuplicate = new Map().set('hello', 'world').set('foo', 'bar');
const mapStringified =
  '{"$type":"Map","$value":"[[\\"foo\\",\\"bar\\"],[\\"hello\\",\\"world\\"]]"}';

describe('Map', function() {
  it('should stringify a Map', function() {
    assert.equal(EJSON.stringify(map), mapStringified);
  });

  it('should construct a Map', function() {
    assert.ok(EJSON.parse(mapStringified) instanceof Map);
  });

  it('should parse and stringify a Map', function() {
    assert.deepEqual(map, EJSON.parse(EJSON.stringify(map)));
  });

  it('should test equality of Maps', function() {
    assert.ok(EJSON.equals(map, mapDuplicate));
  });

  it('should clone a Map', function() {
    const clone = EJSON.clone(map);
    assert.ok(clone instanceof Map);
    assert.ok(clone != map);
  });
});
