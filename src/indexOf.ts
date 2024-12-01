/**
 * Returns the index of the {@link element} in the {@link iterable} or `-1` if
 * no such element exists.
 *
 * @see {@link lastIndexOf}
 *
 * @example
 * ```ts
 * import { indexOf } from "c8n";
 *
 * const numbers = [1, 2, 3];
 *
 * console.log(indexOf(numbers, 2));
 * // => 1
 *
 * console.log(indexOf(numbers, 5));
 * // => -1
 * ```
 */
export function indexOf<T>(iterable: Iterable<T>, element: T): number {
	let index = 0;

	for (const value of iterable) {
		if (value === element) return index;
		index++;
	}

	return -1;
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("indexOf", () => {
		const numbers = [1, 2, 3];

		expect(indexOf(numbers, 2)).toEqual(1);
		expect(indexOf(numbers, 5)).toEqual(-1);
	});
}
