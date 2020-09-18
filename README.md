# mini-array2d
A two-dimensional array implementation.

## Example:
```javascript
const Array2D = require('mini-array2d');

const foo = new Array2D(2, 2);
foo.forEach(function(e, pos, arr) {
	arr.set(pos[0], pos[1], pos);
});

console.log(foo.get(0, 0)); // get value at point (0, 0)
console.log(Array2D.toDualArray(foo)); // convert Array2 to array-of-arrays
```
