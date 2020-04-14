/**
 * Representation of a two-dimensional array.
 * @property {number} this.lX - Length of the 2D array's x dimension.
 * @property {number} this.lY - Length of the 2D array's y dimension.
 * @property {number} this.size - Amount of defined elements in the 2D array.
 * @class
 */
class Array2DD {
	#map;

	/**
	 * Represents a two-dimensional array.
	 * @param {number} lX - Length of the 2D array's x dimension.
	 * @param {number} lY - Length of the 2D array's y dimension.
	 * @constructs
	 */
	constructor(lX, lY) {
		this.#map = new Array(lY);

		for (var i = 0; i < lY; ++i) {
			this.#map[i] = new Array(lX);
		}

		this.lX = lX;
		this.lY = lY;
	}

	/**
	 * Amount of defined elements in the 2D array.
	 * @type {number}
	 */
	get size() {
		var count = 0;

		for (var i = 0; i < this.lX; ++i) {
			for (var j = 0; j < this.lY; ++j) {
				if (this.#map[j][i] !== undefined) {
					++count;
				}
			}
		}

		return count;
	}

	/**
	 * Returns the element at the point (x, y) in the 2D array.
	 * @param {number} x - X position of the element to get.
	 * @param {number} y - Y position of the element to get.
	 * @type {*}
	 */
	get(x, y) {
		return this.#map[y][x];
	}

	/**
	 * Sets the element at the point (x, y) in the 2D array with the value `v`, returning the value that was previously there.
	 * @param {number} x - X position of the element to set.
	 * @param {number} y - Y position of the element to set.
	 * @param {*} v - The value to set (x, y) to.
	 * @type {*}
	 */
	set(x, y, v) {
		var old = this.#map[y][x];
		this.#map[y][x] = v;
		return old;
	}

	/**
	 * Fills the entire 2D array with the value `v`.
	 * @param {*} v - The value to fill the array with.
	 */
	fill(v) {
		for (var i = 0; i < this.lX; ++i) {
			for (var j = 0; j < this.lY; ++j) {
				this.#map[j][i] = v;
			}
		}
	}

	/**
	 * Finds and returns the first element found that passes the provided testing function. If no satifactory value is found, `undefined` is returned.
	 * @param {Array2D~find} callback - The function that will be called on each value of the 2D array.
	 * @type {*}
	 */
	find(callback) {
		for (var i = 0; i < this.lX; ++i) {
			for (var j = 0; j < this.lY; ++j) {
				if (callback(this.#map[j][i], [i, j], this)) {
					return [i, j];
				}
			}
		}

		return undefined;
	}

	/**
	 * Executes a callback function on every element in the 2D array.
	 * @param {Array2D~forEach} callback - The function that will be called on each value of the 2D array.
	 */
	forEach(callback) {
		for (var i = 0; i < this.lX; ++i) {
			for (var j = 0; j < this.lY; ++j) {
				callback(this.#map[j][i], [i, j], this);
			}
		}
	}

	/**
	 * Returns true if the point provided is within the 2D array's boundaries.
	 * @param {number} x - X coordinate of point.
	 * @param {number} y - Y coordinate of point.
	 * @type {boolean}
	 */
	within(x, y) {
		return x >= 0 && x <= this.lX - 1 && y >= 0 && y <= this.lY - 1;
	}

	/**
	 * Converts a 2D array to a traditional array-of-arrays.
	 * @param {Array2D} array2 - The 2D array to convert.
	 * @type {Array.<Array.<*>>}
	 * @static
	 */
	static toDualArray(array2) {
		return array2.#map;
	}

	/**
	 * Converts a traditional array-of-arrays to a 2D array.
	 * @param {Array.<Array.<*>>} dualArray - Array-of-array to convert.
	 * @type {Array2D}
	 * @static
	 */
	static toArray2D(dualArray) {
		var array2 = new Array2D(dualArray[0].length, dualArray.length);
		array2.#map = dualArray;
		return array2;
	}

	toString() {
		var str = '';

		for (var j = 0; j < this.lY; ++j) {
			for (var i = 0; i < this.lX; ++i) {
				str += this.#map[j][i] === undefined ? '.' : 'F';
			}

			if (j !== this.lY - 1) {
				str += '\n';
			}
		}

		return str;
	}
}

/**
 * @callback Array2D~find
 * @param {*} element - The current element being checked.
 * @param {Array.<number>} position - Position of the current element being checked in the 2D array.
 * @param {Array2D} map - Reference to the 2D array instance being checked.
 * @type {boolean}
 */
/**
 * @callback Array2D~forEach
 * @param {*} element - The current element being checked.
 * @param {Array.<number>} position - Position of the current element being checked in the 2D array.
 * @param {Array2D} map - Reference to the 2D array instance being checked.
 */

module.exports = Array2D;
