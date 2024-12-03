import { isAllBigInt } from "./_internal";
import { isEmpty, type sumOf } from "./";

/**
 * Returns the sum of the elements in the {@link iterable}.
 *
 * @throws {TypeError} Thrown if the {@link iterable} is empty.
 *
 * @see {@link sumOf}
 *
 * @example
 * ```ts
 * import { sum } from "c8n";
 *
 * console.log(sum([1n, 2n, 3n]));
 * // => 6n
 * ```
 */
export function sum(iterable: Iterable<bigint>): bigint;

/**
 * Returns the sum of the elements in the {@link iterable}.
 *
 * @throws {TypeError} Thrown if the {@link iterable} is empty.
 *
 * @see {@link sumOf}
 *
 * @example
 * ```ts
 * import { sum } from "c8n";
 *
 * console.log(sum([1, 2, 3]));
 * // => 6
 * ```
 */
export function sum(iterable: Iterable<number>): number;
export function sum(iterable: Iterable<bigint> | Iterable<number>): bigint | number {
	if (isEmpty(iterable)) {
		throw new TypeError("Cannot use sum on an empty iterable");
	}

	if (isAllBigInt(iterable)) {
		let sum = 0n;
		for (const x of iterable) sum += x;

		return sum;
	}

	return [...iterable].reduce((sum, val) => sum + val);
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("sum", () => {
		expect(sum([1, 2, 3])).toEqual(6);
		expect(sum([1n, 2n, 3n])).toEqual(6n);
		expect(() => sum([])).toThrow("empty");
	});
}
