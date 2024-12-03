import { isAllBigInt } from "./_internal";
import { isEmpty, type sum } from "./";

/**
 * Returns the sum of the values returned by calling {@link selector} on every
 * element in the {@link iterable}.
 *
 * @throws {TypeError} Thrown if the {@link iterable} is empty.
 *
 * @see {@link sum}
 *
 * @example
 * ```ts
 * import { sumOf } from "c8n";
 *
 * console.log(sumOf([1n, 2n, 3n], (x) => x * 2n));
 * // => 12n
 * ```
 */
export function sumOf<T>(iterable: Iterable<T>, selector: (element: T) => bigint): bigint;

/**
 * Returns the sum of the values returned by calling {@link selector} on every
 * element in the {@link iterable}.
 *
 * @throws {TypeError} Thrown if the {@link iterable} is empty.
 *
 * @see {@link sum}
 *
 * @example
 * ```ts
 * import { sumOf } from "c8n";
 *
 * const names = ["Alice", "Bob", "Charlie"];
 *
 * console.log(sumOf(names, (name) => name.length));
 * // => 15
 * ```
 */
export function sumOf<T>(iterable: Iterable<T>, selector: (element: T) => number): number;
export function sumOf<T>(
	iterable: Iterable<T>,
	selector: (element: T) => bigint | number,
): bigint | number {
	if (isEmpty(iterable)) {
		throw new TypeError("Cannot use sumOf on an empty iterable");
	}

	let sum = isAllBigInt(iterable) ? 0n : 0;

	for (const element of iterable) {
		// @ts-expect-error
		sum += selector(element);
	}

	return sum;
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("sumOf", () => {
		const names = ["Alice", "Bob", "Charlie"];

		expect(sumOf(names, (name) => name.length)).toBe(15);
		expect(sumOf([1n, 2n, 3n], (x) => x * 2n)).toBe(12n);
		expect(() => sumOf([], (x) => x)).toThrow("empty");
	});
}
