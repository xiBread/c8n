/**
 * Returns the index of the last element in the {@link iterable} that satisfies
 * the {@link predicate} or `-1` if no such element exists.
 *
 * @see {@link findIndex}
 *
 * @example
 * ```ts
 * import { findLastIndex } from "c8n";
 *
 * const numbers = [1, 2, 3, 4, 5];
 *
 * console.log(findLastIndex(numbers, (x) => x % 2 === 0));
 * // => 3
 *
 * console.log(findLastIndex(numbers, (x) => x > 5));
 * // => -1
 * ```
 */
export function findLastIndex<T>(
	iterable: Iterable<T>,
	predicate: (element: T) => boolean,
): number {
	let lastIndex = -1;
	let index = 0;

	for (const element of iterable) {
		if (predicate(element)) lastIndex = index;
		index++;
	}

	return lastIndex;
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("findLastIndex", () => {
		const numbers = [1, 2, 3, 4, 5];

		expect(findLastIndex(numbers, (x) => x % 2 === 0)).toEqual(3);
		expect(findLastIndex(numbers, (x) => x > 5)).toEqual(-1);
	});
}
