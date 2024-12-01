/**
 * Returns the last index of the {@link element} in the {@link iterable} or
 * `-1` if no such element exists.
 *
 * @see {@link indexOf}
 *
 * @example
 * ```ts
 * import { lastIndexOf } from "c8n";
 *
 * const numbers = [1, 2, 1, 3];
 *
 * console.log(lastIndexOf(numbers, 1));
 * // => 2
 *
 * console.log(lastIndexOf(numbers, 5));
 * // => -1
 * ```
 */
export function lastIndexOf<T>(iterable: Iterable<T>, element: T): number {
	let lastIndex = -1;
	let index = 0;

	for (const value of iterable) {
		if (value === element) lastIndex = index;
		index++;
	}

	return lastIndex;
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("lastIndexOf", () => {
		const numbers = [1, 2, 1, 3];

		expect(lastIndexOf(numbers, 1)).toEqual(2);
		expect(lastIndexOf(numbers, 5)).toEqual(-1);
	});
}
