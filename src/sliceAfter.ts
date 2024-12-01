/**
 * Produces a generator that yields slices from the {@link iterable} where each
 * slice ends after an element satisfies the {@link predicate}.
 *
 * @see {@link sliceBefore}
 * @see {@link sliceWhen}
 *
 * @example
 * ```ts
 * import { sliceAfter } from "c8n";
 *
 * const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
 * const iter = sliceAfter(numbers, (x) => x % 4 === 3);
 *
 * for (const slice of iter) {
 * 	console.log(slice);
 * }
 *
 * // => [1, 2, 3]
 * // => [4, 5, 6, 7]
 * // => [8, 9, 10]
 * ```
 */
export function* sliceAfter<T>(
	iterable: Iterable<T>,
	predicate: (element: T) => boolean,
): Generator<T[]> {
	let slice: T[] = [];

	for (const element of iterable) {
		slice.push(element);

		if (predicate(element)) {
			yield slice;
			slice = [];
		}
	}

	if (slice.length > 0) {
		yield slice;
	}
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("sliceAfter", () => {
		const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
		const iter = sliceAfter(numbers, (x) => x % 4 === 3);

		expect(iter.next().value).toEqual([1, 2, 3]);
		expect(iter.next().value).toEqual([4, 5, 6, 7]);
		expect(iter.next().value).toEqual([8, 9, 10]);
		expect(iter.next().done).toBe(true);
	});
}
