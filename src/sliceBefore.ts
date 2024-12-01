/**
 * Produces a generator that yields slices from the {@link iterable} where each
 * slice starts after an element satisfies the {@link predicate}.
 *
 * @see {@link sliceAfter}
 * @see {@link sliceWhen}
 *
 * @example
 * ```ts
 * import { sliceBefore } from "c8n";
 *
 * const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
 * const iter = sliceBefore(numbers, (x) => x % 4 === 3);
 *
 * for (const slice of iter) {
 * 	console.log(slice);
 * }
 *
 * // => [1, 2]
 * // => [3, 4, 5, 6]
 * // => [7, 8, 9, 10]
 * ```
 */
export function* sliceBefore<T>(
	iterable: Iterable<T>,
	predicate: (element: T) => boolean,
): Generator<T[]> {
	let slice: T[] = [];

	for (const element of iterable) {
		if (predicate(element)) {
			yield slice;
			slice = [];
		}

		slice.push(element);
	}

	if (slice.length > 0) {
		yield slice;
	}
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("sliceBefore", () => {
		const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
		const iter = sliceBefore(numbers, (x) => x % 4 === 3);

		expect(iter.next().value).toEqual([1, 2]);
		expect(iter.next().value).toEqual([3, 4, 5, 6]);
		expect(iter.next().value).toEqual([7, 8, 9, 10]);
		expect(iter.next().done).toBe(true);
	});
}
