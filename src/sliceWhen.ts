/**
 * Produces a generator that yields slices from the {@link iterable} where each
 * slice starts after the adjacent elements satisfy the {@link predicate}.
 *
 * @see {@link sliceBefore}
 * @see {@link sliceAfter}
 *
 * @example
 * ```ts
 * import { sliceWhen } from "c8n";
 *
 * const numbers = [1, 2, 4, 9, 10, 11, 12, 15, 16, 19, 20, 21];
 * const iter = sliceWhen(numbers, (a, b) => a + 1 !== b);
 *
 * for (const slice of iter) {
 * 	console.log(slice);
 * }
 *
 * // => [1, 2]
 * // => [4]
 * // => [9, 10, 11, 12]
 * // => [15, 16]
 * ```
 */
export function* sliceWhen<T>(
	iterable: Iterable<T>,
	predicate: (previous: T, next: T) => boolean,
): Generator<T[]> {
	let previous: T | undefined;
	let slice: T[] = [];

	for (const element of iterable) {
		if (previous !== undefined && predicate(previous, element)) {
			yield slice;
			slice = [];
		}

		slice.push(element);
		previous = element;
	}

	yield slice;
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("sliceWhen", () => {
		const numbers = [1, 2, 4, 9, 10, 11, 12, 15, 16, 19, 20, 21];
		const iter = sliceWhen(numbers, (a, b) => a + 1 !== b);

		expect(iter.next().value).toEqual([1, 2]);
		expect(iter.next().value).toEqual([4]);
		expect(iter.next().value).toEqual([9, 10, 11, 12]);
		expect(iter.next().value).toEqual([15, 16]);
		expect(iter.next().value).toEqual([19, 20, 21]);
		expect(iter.next().done).toBe(true);
	});
}
