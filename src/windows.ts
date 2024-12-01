/**
 * Produces a generator that yields overlapping tuples with {@link size}
 * elements over the {@link iterable}.
 *
 * @throws {RangeError} Thrown if {@link size} is `NaN` or negative.
 *
 * @see {@link chunks}
 * @see {@link slices}
 *
 * @example
 * ```ts
 * import { windows } from "c8n";
 *
 * function* naturals() {
 * 	for (let i = 0; ; i++) yield i;
 * }
 *
 * const iter = windows(naturals().take(3), 5);
 *
 * for (const window of iter) {
 * 	console.log(window);
 * }
 *
 * // => [0, 1, 2, 3, 4]
 * // => [1, 2, 3, 4, 5]
 * // => [2, 3, 4, 5, 6]
 * ```
 */
export function windows<T>(iterable: Iterable<T>, size: number): Generator<T[]>;

/**
 * Produces a generator that yields tuples with {@link size} elements moving
 * {@link step} elements forward over the {@link iterable}.
 *
 * @throws {RangeError} Thrown if either {@link size} or {@link step} are `NaN` or less than or equal to `0`.
 *
 * @see {@link chunks}
 * @see {@link slices}
 *
 * @example
 * ```ts
 * import { windows } from "c8n";
 *
 * function* naturals() {
 * 	for (let i = 0; ; i++) yield i;
 * }
 *
 * const iter = windows(naturals().take(3), 5, 3);
 *
 * for (const window of iter) {
 * 	console.log(window);
 * }
 *
 * // => [0, 1, 2, 3, 4]
 * // => [3, 4, 5, 6, 7]
 * // => [6, 7, 8, 9, 10]
 * ```
 */
export function windows<T>(iterable: Iterable<T>, size: number, step: number): Generator<T[]>;
export function* windows<T>(iterable: Iterable<T>, size: number, step = 1): Generator<T[]> {
	if (size <= 0 || Number.isNaN(size)) {
		throw new RangeError("'size' must be greater than 0");
	}

	if (step <= 0 || Number.isNaN(step)) {
		throw new RangeError("'step' must be greater than 0");
	}

	const gap = step - size;

	if (gap >= 0) {
		let window: T[] = [];
		let skip = 0;

		for (const element of iterable) {
			if (skip > 0) {
				skip--;
				continue;
			}

			window.push(element);

			if (window.length === size) {
				yield window;

				window = [];
				skip = gap;
			}
		}

		if (window.length === size) {
			yield window;
		}
	} else {
		let window: T[] = [];

		for (const element of iterable) {
			window.push(element);

			if (window.length < size) {
				continue;
			}

			yield window;
			window = window.slice(step);
		}
	}
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("windows", () => {
		function* naturals() {
			/* v8 ignore next */
			for (let i = 0; ; i++) yield i;
		}

		const iter = windows(naturals(), 5).take(3);

		expect(iter.next().value).toEqual([0, 1, 2, 3, 4]);
		expect(iter.next().value).toEqual([1, 2, 3, 4, 5]);
		expect(iter.next().value).toEqual([2, 3, 4, 5, 6]);
		expect(iter.next().done).toBe(true);
	});

	it("windows with size and step", () => {
		function* naturals() {
			/* v8 ignore next */
			for (let i = 0; ; i++) yield i;
		}

		const iter = windows(naturals(), 5, 3).take(3);

		expect(iter.next().value).toEqual([0, 1, 2, 3, 4]);
		expect(iter.next().value).toEqual([3, 4, 5, 6, 7]);
		expect(iter.next().value).toEqual([6, 7, 8, 9, 10]);
		expect(iter.next().done).toBe(true);
	});

	it("windows with equal size and step", () => {
		function* naturals() {
			/* v8 ignore next */
			for (let i = 0; ; i++) yield i;
		}

		const iter = windows(naturals(), 5, 5).take(3);

		expect(iter.next().value).toEqual([0, 1, 2, 3, 4]);
		expect(iter.next().value).toEqual([5, 6, 7, 8, 9]);
		expect(iter.next().value).toEqual([10, 11, 12, 13, 14]);
		expect(iter.next().done).toBe(true);
	});

	it("windows with step greater than size", () => {
		function* naturals() {
			/* v8 ignore next */
			for (let i = 0; ; i++) yield i;
		}

		const iter = windows(naturals(), 5, 10).take(3);

		expect(iter.next().value).toEqual([0, 1, 2, 3, 4]);
		expect(iter.next().value).toEqual([10, 11, 12, 13, 14]);
		expect(iter.next().value).toEqual([20, 21, 22, 23, 24]);
		expect(iter.next().done).toBe(true);
	});

	it("windows throws with invalid arguments", () => {
		expect(() => windows([], 0).toArray()).toThrow("'size'");
		expect(() => windows([], 1, 0).toArray()).toThrow("'step'");

		expect(() => windows([], -1).toArray()).toThrow("'size'");
		expect(() => windows([], 1, -1).toArray()).toThrow("'step'");
	});
}
