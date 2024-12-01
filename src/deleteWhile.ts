/**
 * Deletes every element in the {@link set} that satisfy the {@link predicate}.
 * This is the inverse of {@link keepWhile}.
 *
 * @returns A reference to the {@link set}.
 *
 * @see {@link keepWhile}
 *
 * @example
 * ```ts
 * import { deleteWhile } from "c8n";
 *
 * const numbers = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
 * const set = deleteWhile(numbers, (x) => x % 2 === 1);
 *
 * console.log(numbers);
 * // => { 2, 4, 6, 8, 10 }
 *
 * console.log(numbers === set);
 * // => true
 * ```
 */
export function deleteWhile<T>(set: Set<T>, predicate: (element: T) => boolean): Set<T> {
	for (const element of set) {
		if (predicate(element)) set.delete(element);
	}

	return set;
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("deleteWhile", () => {
		const numbers = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
		const set = deleteWhile(numbers, (x) => x % 2 === 1);

		expect(numbers).toEqual(new Set([2, 4, 6, 8, 10]));
		expect(numbers === set).toBe(true);
	});
}
