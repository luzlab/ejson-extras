Extends EJSON with additional types.

# Supported Types

Currently, `ejson-extras` adds support for the following types:

* Maps
* [Qtys](https://github.com/gentooboontoo/js-quantities)

Please submit an issue if you'd like to see an addtional type.

# Usage

```javascript
const EJSON = require('ejson');
require('ejson-extras');

const map1 = new Map().set('foo', 'bar').set('hello', 'world');
EJSON.stringify(map1); // '{"$type":"Map","$value":"[[\\"foo\\",\\"bar\\"],[\\"hello\\",\\"world\\"]]"}'
JSON.stringify(map1); // '{}'

const string = '{"$type":"Map","$value":"[[\\"hello\\",\\"world\\"]]"}';
EJSON.parse(string); // Map { 'hello' => 'world' }

const map2 = new Map().set('hello', 'world').set('foo', 'bar');
EJSON.equals(map1, map2); // true
```

# Creating a custom type

Adding an additional type is as easy as adding a file to the /types directory.
Here is a sample type file for supporting the native `Map` object:

```javascript
module.exports = {
    prototype: Map.prototype,
    shims: {
        typeName() {
            return 'Map';
        },
        toJSONValue() {
            return JSON.stringify([...this]);
        },
        clone() {
            return new Map(this);
        },
        equals(other) {
            if (this.size !== other.size) return false;
            Array.from(other.entries()).keys(key => {
                return this.get(key) == other.get(key);
            });
        },
    },
    factory(json) {
        return new Map(JSON.parse(jsonStr));
    },
    typeName: 'Map',
};
```

# Peer Dependancies

Many custom types will require a peer dependancy. An example of this is
`jsQuantities.js`, in this case we use `try-require` to import the peer library.
If the peer library isn't found, ejson-extras will skip adding support for that
particular type.
