import { isAllBigInt } from "./_internal";
import { sum } from "./";

/**
 * Returns the average value of the elements in the {@link iterable}.
 *
 * @example
 * ```ts
 * import { average } from "c8n";
 *
 * const numbers = [1n, 2n, 3n, 4n, 5n];
 * const avg = average(numbers);
 *
 * console.log(avg);
 * // => 3n
 * ```
 */
export function average(iterable: Iterable<bigint>): bigint;

/**
 * Returns the average value of the elements in the {@link iterable}.
 *
 * @example
 * ```ts
 * import { average } from "c8n";
 *
 * const numbers = [1, 2, 3, 4, 5];
 * const avg = average(numbers);
 *
 * console.log(avg);
 * // => 3
 * ```
 */
export function average(iterable: Iterable<number>): number;
export function average(iterable: Iterable<bigint> | Iterable<number>): bigint | number {
	const array = [...iterable];
	const len = isAllBigInt(iterable) ? BigInt(array.length) : array.length;

	// @ts-expect-error
	return sum(iterable) / len;
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("average", () => {
		expect(average([1n, 2n, 3n, 4n, 5n])).toBe(3n);
		expect(average([1, 2, 3, 4, 5])).toBe(3);
	});
}
