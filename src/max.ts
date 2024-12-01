/**
 * Returns the largest bigint in the {@link iterable}. If the {@link iterable}
 * is empty, returns `NaN`.
 *
 * @example
 * ```ts
 * import { max } from "c8n";
 *
 * const numbers = [1n, 2n, 3n, 4n, 5n];
 *
 * console.log(max(numbers));
 * // => 5n
 * ```
 */
export function max(iterable: Iterable<bigint>): bigint;

/**
 * Returns the largest number in the {@link iterable}. If the {@link iterable}
 * is empty, returns `NaN`.
 *
 * @example
 * ```ts
 * import { max } from "c8n";
 *
 * const numbers = [1, 2, 3, 4, 5];
 *
 * console.log(max(numbers));
 * // => 5
 * ```
 */
export function max(iterable: Iterable<number>): number;

/**
 * Returns the largest numeric value in the {@link iterable}. If the
 * {@link iterable} is empty, returns `NaN`.
 *
 * @example
 * ```ts
 * import { max } from "c8n";
 *
 * const numbers = [1, 2n, 3n, 4, 5n];
 *
 * console.log(max(numbers));
 * // => 5n
 * ```
 */
export function max(iterable: Iterable<bigint | number>): bigint | number;
export function max(iterable: Iterable<bigint | number>): bigint | number {
	const iterator = iterable[Symbol.iterator]();

	let next = iterator.next();
	let max = next.value;

	if (next.done) return Number.NaN;

	while (!next.done) {
		next = iterator.next();
		if (Number.isNaN(next.value)) return Number.NaN;

		max = next.value >= max ? next.value : max;
	}

	return max;
}

/* eslint-disable unicorn/prefer-number-properties */
if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("max", () => {
		expect(max([])).toBeNaN();
		expect(max([1])).toBe(1);
		expect(max([0n, 0])).toBe(0);
		expect(max([0, 0n])).toBe(0n);
		expect(max([1, 2, 3, 4, 5])).toBe(5);
		expect(max([-1, -2, -3])).toBe(-1);
		expect(max([0, 1n, 2, 3, 5n])).toBe(5n);
		expect(max([1, 2, NaN, 4, 5])).toBeNaN();
		expect(max([1, 2, Infinity])).toBe(Infinity);
	});
}
