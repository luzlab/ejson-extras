const Qty = require('js-quantities');

const typeName = 'Qty';

module.exports = {
  prototype: Qty.prototype, // undefined if Qty is undefined, otherwise returns Qty.prototype
  shims: {
    inspect: Qty.prototype.toString,
    typeName() {
      return typeName;
    },
    toJSONValue() {
      return {
        scalar: this.scalar,
        numerator: this.numerator,
        denominator: this.denominator,
      };
    },
    clone() {
      return new Qty(this);
    },
    equals(other) {
      if (this.isCompatible(other)) {
        return this.eq(other);
      } else {
        return false;
      }
    },
  },

  factory(json) {
    return new Map(JSON.parse(jsonStr));
  },
  typeName,
  }
};
