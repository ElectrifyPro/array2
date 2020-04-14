# mini-array2d
A simple and light two-dimensional array implementation.

## Example:
```javascript
var Array2D = require('mini-array2d');

var foo = new Array2D(2, 2);
foo.fill(random());
console.log(foo.get(0, 0)); // get value at point (0, 0)
console.log(Array2D.toDualArray(foo)); // convert Array2 to array-of-arrays
```
