/**
 * Produces a generator that yields non-overlapping tuples with {@link size}
 * elements over the {@link iterable}.
 *
 * If {@link size} does not divide evenly into the length of the
 * {@link iterable}, the last tuple will contain fewer elements than
 * {@link size}.
 *
 * @throws {RangeError} Thrown if {@link size} is `NaN` or less than or equal to `0`.
 *
 * @see {@link chunks}
 * @see {@link windows}
 *
 * @example
 * ```ts
 * import { slices } from "c8n";
 *
 * const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
 * const iter = slices(array, 3);
 *
 * for (const slice of iter) {
 * 	console.log(slice);
 * }
 *
 * // => [1, 2, 3]
 * // => [4, 5, 6]
 * // => [7, 8, 9]
 * // => [10]
 * ```
 */
export function* slices<T>(iterable: Iterable<T>, size: number): Generator<T[]> {
	if (size <= 0) {
		throw new RangeError("'size' must be greater than 0");
	}

	let slice: T[] = [];

	for (const element of iterable) {
		slice.push(element);

		if (slice.length === size) {
			yield slice;
			slice = [];
		}
	}

	yield slice;
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("slices", () => {
		const iter = slices([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3);

		expect(iter.next().value).toEqual([1, 2, 3]);
		expect(iter.next().value).toEqual([4, 5, 6]);
		expect(iter.next().value).toEqual([7, 8, 9]);
		expect(iter.next().value).toEqual([10]);
		expect(iter.next().done).toBe(true);
	});

	it("slices throws with invalid size", () => {
		expect(() => slices([], 0).toArray()).toThrow("'size'");
		expect(() => slices([], -1).toArray()).toThrow("'size'");
	});
}
