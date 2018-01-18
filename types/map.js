const typeName = 'Map';

module.exports = {
  prototype: Map.prototype,
  shims: {
    typeName() {
      return typeName;
    },
    toJSONValue() {
      return [...this];
    },
    clone() {
      return new Map(this);
    },
    equals(other) {
      if (this.size !== other.size) return false;
      return Array.from(other.entries()).every(([key, value]) => {
        return this.get(key) == other.get(key);
      });
    },
  },
  factory(json) {
    return new Map(json);
  },
  typeName,
};
