/**
 * Returns the index of the first element in the {@link iterable} that satisfies
 * the {@link predicate} or `-1` if no such element exists.
 *
 * @see {@link findLastIndex}
 *
 * @example
 * ```ts
 * import { findIndex } from "c8n";
 *
 * const numbers = [1, 2, 3];
 *
 * console.log(findIndex(numbers, (x) => x === 2));
 * // => 1
 *
 * console.log(findIndex(numbers, (x) => x === 5));
 * // => -1
 * ```
 */
export function findIndex<T>(iterable: Iterable<T>, predicate: (element: T) => boolean): number {
	let index = 0;

	for (const element of iterable) {
		if (predicate(element)) return index;
		index++;
	}

	return -1;
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("findIndex", () => {
		const numbers = [1, 2, 3];

		expect(findIndex(numbers, (x) => x === 2)).toEqual(1);
		expect(findIndex(numbers, (x) => x === 5)).toEqual(-1);
	});
}
