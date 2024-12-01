/**
 * Keeps every element in the {@link set} that satisfy the {@link predicate}.
 * This is the inverse of {@link deleteWhile}.
 *
 * @returns A reference to the {@link set}.
 *
 * @see {@link deleteWhile}
 *
 * @example
 * ```ts
 * import { keepWhile } from "c8n";
 *
 * const numbers = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
 * const set = keepWhile(numbers, (x) => x % 2 === 1);
 *
 * console.log(numbers);
 * // => { 1, 3, 5, 7, 9 }
 *
 * console.log(numbers === set);
 * // => true
 * ```
 */
export function keepWhile<T>(set: Set<T>, predicate: (element: T) => boolean): Set<T> {
	for (const element of set) {
		if (!predicate(element)) set.delete(element);
	}

	return set;
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("keepWhile", () => {
		const numbers = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
		const set = keepWhile(numbers, (x) => x % 2 === 1);

		expect(numbers).toEqual(new Set([1, 3, 5, 7, 9]));
		expect(numbers === set).toBe(true);
	});
}
