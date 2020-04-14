# array2
A simple and light two-dimensional array implementation.

## Example:
```javascript
var Array2 = require('array2');

var foo = new Array2(2, 2);
foo.fill(random());
console.log(foo.get(0, 0)); // get value at point (0, 0)
console.log(Array2.toDualArray(foo)); // convert Array2 to array-of-arrays
```
