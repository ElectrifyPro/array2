function clamp(v, l, r) {
	if (v < l) {
		return l;
	} else if (v > r) {
		return r;
	} else {
		return v;
	}
}

/**
 * Representation of a two-dimensional array.
 * @property {number} this.length - Length of the 2D array's dimensions.
 * @property {number} this.size - Amount of defined elements in the 2D array.
 * @class
 */
class Array2D {
	#map;
	#lX;
	#lY;
	
	/**
	 * Represents a two-dimensional array.
	 * @param {number} lX - Length of the 2D array's x dimension.
	 * @param {number} lY - Length of the 2D array's y dimension.
	 * @constructs
	 */
	constructor(lX, lY) {
		this.#map = new Array(lY);
		
		for (let i = 0; i < lY; ++i) {
			this.#map[i] = new Array(lX);
		}
		
		this.#lX = lX;
		this.#lY = lY;
	}
	
	/**
	 * The dimensions of the 2D array.
	 * @type {Object}
	 */
	get length() {
		return {x: this.#lX, y: this.#lY};
	}
	
	/**
	 * Amount of defined elements in the 2D array.
	 * @type {number}
	 */
	get size() {
		let count = 0;
		
		for (let i = 0; i < this.#lX; ++i) {
			for (let j = 0; j < this.#lY; ++j) {
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
		const old = this.#map[y][x];
		this.#map[y][x] = v;
		return old;
	}
	
	/**
	 * Inserts empty columns or removes columns from the 2D array.
	 * @param {number} count - Number of columns to add / remove.
	 * @param {number=1} side - Whether to modify the right or left of the 2D array. A value of 1 means that columns will be added / removed to / from the right of the array, while 0 means columns will be added / removed to / from the left.
	 */
	insertColumn(count, side = 1) {
		if (count) {
			if (side) {
				if (count > 0) { // insert columns on right
					for (let i = 0; i < this.#lY; ++i) {
						this.#map[i].length += count;
					}
				} else if (count < 0) { // remove columns from right
					for (let i = 0; i < this.#lY; ++i) {
						this.#map[i].splice(clamp(this.#lX + count, 0, this.#lX), -count);
					}
				}
			} else {
				if (count > 0) { // insert columns on left
					for (let i = 0; i < this.#lY; ++i) {
						this.#map[i].unshift(...new Array(count));
					}
				} else if (count < 0) { // remove columns from left
					for (let i = 0; i < this.#lY; ++i) {
						this.#map[i].splice(0, -count);
					}
				}
			}
		}
	}
	
	/**
	 * Inserts empty rows or removes rows from the 2D array.
	 * @param {number} count - Number of rows to add / remove.
	 * @param {number=1} side - Whether to modify the top or bottom of the 2D array. A value of 1 means that rows will be added / removed to / from the bottom of the array, while 0 means rows will be added / removed to / from the top.
	 */
	insertRow(count, side = 1) {
		if (count) {
			if (side) {
				if (count > 0) { // insert rows on bottom
					for (let i = 0; i < count; ++i) {
						this.#map.push(new Array(this.#lX));
					}
				} else if (count < 0) { // remove rows from bottom
					this.#map.splice(clamp(this.#lY + count, 0, this.#lY), -count);
				}
			} else {
				if (count > 0) { // insert rows on top
					for (let i = 0; i < count; ++i) {
						this.#map.unshift(new Array(this.#lX));
					}
				} else if (count < 0) { // remove rows from top
					this.#map.splice(0, -count);
				}
			}
		}
	}
	
	/**
	 * Returns true if all elements in the 2D array pass the test specified by the callback function.
	 * @param {Array2D~callback} callback - The function that will be called on each value of the 2D array.
	 * @type {*}
	 */
	every(callback) {
		for (let i = 0; i < this.#lX; ++i) {
			for (let j = 0; j < this.#lY; ++j) {
				if (!callback(this.#map[j][i], [i, j], this)) {
					return false;
				}
			}
		}
		
		return true;
	}
	
	/**
	 * Fills the entire 2D array with the value `v`.
	 * @param {*} v - The value to fill the array with.
	 */
	fill(v) {
		for (let i = 0; i < this.#lX; ++i) {
			for (let j = 0; j < this.#lY; ++j) {
				this.#map[j][i] = v;
			}
		}
	}
	
	/**
	 * Returns a new 2D array with all the elements that passed the test implemented by the callback function.
	 * @param {Array2D~callback} callback - The function that will be called on each value of the 2D array.
	 * @type {Array2D}
	 */
	filter(callback) {
		let min = {right: 0, bottom: 0};
		const result = new Array2D(this.#lX, this.#lY);
		
		for (let i = 0; i < this.#lX; ++i) {
			for (let j = 0; j < this.#lY; ++j) {
				if (callback(this.#map[j][i], [i, j], this)) {
					result.#map[j][i] = this.#map[j][i];
					
					if (i > min.right) {
						min.right = i;
					}
					
					if (j > min.bottom) {
						min.bottom = j;
					}
				}
			}
		}
		
		return result.resize(min.right + 1, min.bottom + 1);
	}
	
	/**
	 * Finds and returns the first element found that passes the provided testing function. If no satifactory value is found, `undefined` is returned.
	 * @param {Array2D~callback} callback - The function that will be called on each value of the 2D array.
	 * @type {*}
	 */
	find(callback) {
		for (let i = 0; i < this.#lX; ++i) {
			for (let j = 0; j < this.#lY; ++j) {
				if (callback(this.#map[j][i], [i, j], this)) {
					return this.#map[j][i];
				}
			}
		}
		
		return undefined;
	}
	
	/**
	 * Finds and returns the position of first element found that passes the provided testing function. If no satifactory value is found, [-1, -1] is returned.
	 * @param {Array2D~callback} callback - The function that will be called on each value of the 2D array.
	 * @type {Array.<number>}
	 */
	findPos(callback) {
		for (let i = 0; i < this.#lX; ++i) {
			for (let j = 0; j < this.#lY; ++j) {
				if (callback(this.#map[j][i], [i, j], this)) {
					return [i, j];
				}
			}
		}
		
		return [-1, -1];
	}
	
	/**
	 * Executes a callback function on every element in the 2D array.
	 * @param {Array2D~callback} callback - The function that will be called on each value of the 2D array.
	 */
	forEach(callback) {
		for (let i = 0; i < this.#lX; ++i) {
			for (let j = 0; j < this.#lY; ++j) {
				callback(this.#map[j][i], [i, j], this);
			}
		}
	}
	
	/**
	 * Returns true if the specified value exists in the 2D array.
	 * @param {*} v - The value to search for.
	 * @type {boolean}
	 */
	includes(v) {
		for (let i = 0; i < this.#lX; ++i) {
			for (let j = 0; j < this.#lY; ++j) {
				if (v === this.#map[j][i]) {
					return true;
				}
			}
		}
		
		return false;
	}
	
	/**
	 * Returns a copy of the 2D array whose dimensions are `x` and `y` accordingly, splicing any elements that occur outside the range. If `x` or `y` is larger than the current array's dimensions, they will be set to the current array's dimensions.
	 * @param {number} x - The x dimension of the resized 2D array.
	 * @param {number} y - The y dimension of the resized 2D array.
	 * @type {Array2D}
	 */
	resize(x, y) {
		const result = new Array2D(clamp(x, 0, this.#lX), clamp(y, 0, this.#lY));
		
		for (let i = 0; i < x; ++i) {
			for (let j = 0; j < y; ++j) {
				result.#map[j][i] = this.#map[j][i];
			}
		}
		
		return result;
	}
	
	/**
	 * Returns true if the point provided is within the 2D array's boundaries.
	 * @param {number} x - X coordinate of point.
	 * @param {number} y - Y coordinate of point.
	 * @type {boolean}
	 */
	within(x, y) {
		return x >= 0 && x <= this.#lX - 1 && y >= 0 && y <= this.#lY - 1;
	}
	
	/**
	 * Returns true if the value is an instance of the Array2D class.
	 * @param {*} array2 - The value to check.
	 * @type {boolean}
	 * @static
	 */
	static isArray2D(value) {
		return value instanceof Array2D;
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
		const array2 = new Array2D(dualArray[0].length, dualArray.length);
		array2.#map = dualArray;
		return array2;
	}
	
	toString() {
		return '[object Array2D]';
	}
}

/**
 * @callback Array2D~callback
 * @param {*} element - The current element being checked.
 * @param {Array.<number>} position - Position of the current element being checked in the 2D array.
 * @param {Array2D} map - Reference to the 2D array instance being checked.
 * @type {boolean}
 */

module.exports = Array2D;