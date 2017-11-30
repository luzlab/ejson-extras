const typeName = 'Map';

module.exports = {
  prototype: Map.prototype,
  shims: {
    typeName() {
      return typeName;
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
  typeName,
};
