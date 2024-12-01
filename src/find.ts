/**
 * Returns the first element in the {@link iterable} that satisfies the
 * {@link predicate} or `undefined` if no such element exists.
 *
 * @see {@link findLast}
 *
 * @example
 * ```ts
 * import { find } from "c8n";
 *
 * const numbers = [1, 2, 3];
 *
 * console.log(find(numbers, (x) => x === 2));
 * // => 2
 *
 * console.log(find(numbers, (x) => x === 5));
 * // => undefined
 * ```
 */
export function find<T>(iterable: Iterable<T>, predicate: (element: T) => boolean): T | undefined {
	for (const element of iterable) {
		if (predicate(element)) return element;
	}
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("find", () => {
		const numbers = [1, 2, 3];

		expect(find(numbers, (x) => x === 2)).toEqual(2);
		expect(find(numbers, (x) => x === 5)).toBeUndefined();
	});
}
