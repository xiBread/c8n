/**
 * Returns the number of elements that satisfy the specified
 * {@link predicate}.
 *
 * @example
 * ```ts
 * import { count } from "c8n";
 *
 * const numbers = [-1, -2, -3, 4, 5, 6];
 * const positive = count(numbers, (x) => x > 0);
 *
 * console.log(positive);
 * // => 3
 * ```
 */
export function count<T>(iterable: Iterable<T>, predicate: (element: T) => boolean): number {
	let count = 0;

	for (const element of iterable) {
		if (predicate(element)) count++;
	}

	return count;
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("count", () => {
		const numbers = [-1, -2, -3, 4, 5, 6];
		const positive = count(numbers, (x) => x > 0);

		expect(positive).toBe(3);
		expect(count([], () => true)).toBe(0);
	});
}
