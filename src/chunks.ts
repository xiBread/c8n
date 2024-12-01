import { windows } from "./";

/**
 * Produces a generator that yields exact non-overlapping tuples with
 * {@link size} elements over the {@link iterable}.
 *
 * If {@link size} does not divide evenly into the length of the
 * {@link iterable}, the last tuple will be discarded.
 *
 * This is equivalent to calling {@link windows} with {@link size} for the
 * `size` and `step` parameters.
 *
 * @see {@link slices}
 * @see {@link windows}
 *
 * @example
 * ```ts
 * import { chunks } from "c8n";
 *
 * const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
 * const iter = chunks(numbers, 3);
 *
 * for (const chunk of iter) {
 * 	console.log(chunk);
 * }
 *
 * // => [1, 2, 3]
 * // => [4, 5, 6]
 * // => [7, 8, 9]
 * ```
 */
export function* chunks<T>(iterable: Iterable<T>, size: number): Generator<T[]> {
	yield* windows(iterable, size, size);
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("chunk", () => {
		const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
		const iter = chunks(numbers, 3);

		expect(iter.next().value).toEqual([1, 2, 3]);
		expect(iter.next().value).toEqual([4, 5, 6]);
		expect(iter.next().value).toEqual([7, 8, 9]);
		expect(iter.next().done).toBe(true);
	});
}
