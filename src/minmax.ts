import { max } from "./max";
import { min } from "./min";

/**
 * Returns the smallest and largest bigint in the {@link iterable}.
 *
 * @see {@link min}
 * @see {@link max}
 *
 * @example
 * ```ts
 * import { minmax } from "c8n";
 *
 * const numbers = [1n, 2n, 3n, 4n, 5n];
 * const extrema = minmax(numbers);
 *
 * console.log(extrema);
 * // => [1n, 5n]
 * ```
 */
export function minmax(iterable: Iterable<bigint>): [min: bigint, max: bigint];

/**
 * Returns the smallest and largest number in the {@link iterable}.
 *
 * @see {@link min}
 * @see {@link max}
 *
 * @example
 * ```ts
 * import { minmax } from "c8n";
 *
 * const numbers = [1, 2, 3, 4, 5];
 * const extrema = minmax(numbers);
 *
 * console.log(extrema);
 * // => [1, 5]
 * ```
 */
export function minmax(iterable: Iterable<number>): [min: number, max: number];

/**
 * Returns the smallest and largest numeric value in the {@link iterable}.
 *
 * @see {@link min}
 * @see {@link max}
 *
 * @example
 * ```ts
 * import { minmax } from "c8n";
 *
 * const numbers = [1, 2, 3n, 4n, 5n];
 * const extrema = minmax(numbers);
 *
 * console.log(extrema);
 * // => [1, 5n]
 * ```
 */
export function minmax(
	iterable: Iterable<bigint | number>,
): [min: bigint | number, max: bigint | number];
export function minmax(iterable: Iterable<bigint | number>): [bigint | number, bigint | number] {
	return [min(iterable), max(iterable)];
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("minmax with bigints", () => {
		const numbers = [1n, 2n, 3n, 4n, 5n];
		const extrema = minmax(numbers);

		expect(extrema).toEqual([1n, 5n]);
	});

	it("minmax with numbers", () => {
		const numbers = [1, 2, 3, 4, 5];
		const extrema = minmax(numbers);

		expect(extrema).toEqual([1, 5]);
	});

	it("minmax with mixed", () => {
		const numbers = [1, 2, 3n, 4n, 5n];
		const extrema = minmax(numbers);

		expect(extrema).toEqual([1, 5n]);
	});
}
