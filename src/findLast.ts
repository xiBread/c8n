/**
 * Returns the last element in the {@link iterable} that satisfies the
 * {@link predicate} or `undefined` if no such element exists.
 *
 * @see {@link find}
 *
 * @example
 * ```ts
 * import { findLast } from "c8n";
 *
 * const numbers = [1, 2, 3, 4, 5];
 *
 * console.log(findLast(numbers, (x) => x % 2 === 0));
 * // => 4
 *
 * console.log(findLast(numbers, (x) => x > 5));
 * // => undefined
 * ```
 */
export function findLast<T>(
	iterable: Iterable<T>,
	predicate: (element: T) => boolean,
): T | undefined {
	let last: T | undefined;

	for (const element of iterable) {
		if (predicate(element)) last = element;
	}

	return last;
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("findLast", () => {
		const numbers = [1, 2, 3, 4, 5];

		expect(findLast(numbers, (x) => x % 2 === 0)).toEqual(4);
		expect(findLast(numbers, (x) => x > 5)).toBeUndefined();
	});
}
