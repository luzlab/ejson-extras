const assert = require('assert');
const ejson = require('./ejson');
require.extensions['.json'] = ejson;

const map = new Map().set('foo', 'bar').set('hello', 'world');
const mapDuplicate = new Map().set('hello', 'world').set('foo', 'bar');
const mapStringified =
  '{"$type":"Map","$value":"[[\\"foo\\",\\"bar\\"],[\\"hello\\",\\"world\\"]]"}';

describe('require', function() {
  it('should interpret EJSON-encoded .json file', function() {
    const requiredEJSON = require('./test.json');
    assert.ok(requiredEJSON instanceof Map);
  });
});
