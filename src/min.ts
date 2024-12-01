/**
 * Returns the smallest bigint in the {@link iterable}. If the {@link iterable}
 * is empty, returns `NaN`.
 *
 * @example
 * ```ts
 * import { min } from "c8n";
 *
 * const numbers = [1n, 2n, 3n, 4n, 5n];
 *
 * console.log(min(numbers));
 * // => 1n
 * ```
 */
export function min(iterable: Iterable<bigint>): bigint;

/**
 * Returns the smallest number in the {@link iterable}. If the {@link iterable}
 * is empty, returns `NaN`.
 *
 * @example
 * ```ts
 * import { min } from "c8n";
 *
 * const numbers = [1, 2, 3, 4, 5];
 *
 * console.log(min(numbers));
 * // => 1
 * ```
 */
export function min(iterable: Iterable<number>): number;

/**
 * Returns the smallest numeric value in the {@link iterable}. If the
 * {@link iterable} is empty, returns `NaN`.
 *
 * @example
 * ```ts
 * import { min } from "c8n";
 *
 * const numbers = [1n, 2, 3, 4n, 5n];
 *
 * console.log(min(numbers));
 * // => 1n
 * ```
 */
export function min(iterable: Iterable<bigint | number>): bigint | number;
export function min(iterable: Iterable<bigint | number>): bigint | number {
	const iterator = iterable[Symbol.iterator]();

	let next = iterator.next();
	let min = next.value;

	if (next.done) return Number.NaN;

	while (!next.done) {
		next = iterator.next();
		if (Number.isNaN(next.value)) return Number.NaN;

		min = next.value < min ? next.value : min;
	}

	return min;
}

/* eslint-disable unicorn/prefer-number-properties */
if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("max", () => {
		expect(min([])).toBeNaN();
		expect(min([1])).toBe(1);
		expect(min([0, 0n])).toBe(0);
		expect(min([0n, 0])).toBe(0n);
		expect(min([1, 2, 3, 4, 5])).toBe(1);
		expect(min([-1, -2, -3])).toBe(-3);
		expect(min([0, 1n, 2, 3, 5n])).toBe(0);
		expect(min([1, 2, NaN, 4, 5])).toBeNaN();
		expect(min([1, 2, Infinity])).toBe(1);
	});
}
