import { isAllBigInt } from "./_internal";
import type { product } from "./";

/**
 * Returns the product of the values returned by calling {@link selector} on
 * every element in the {@link iterable}.
 *
 * @see {@link product}
 *
 * @example
 * ```ts
 * import { productOf } from "c8n";
 *
 * console.log(productOf([1n, 2n, 3n], (x) => x * 2n));
 * // => 48n;
 * ```
 */
export function productOf<T>(iterable: Iterable<T>, selector: (element: T) => bigint): bigint;

/**
 * Returns the product of the values returned by calling {@link selector} on
 * every element in the {@link iterable}.
 *
 * @see {@link product}
 *
 * @example
 * ```ts
 * import { productOf } from "c8n";
 *
 * const names = ["Alice", "Bob", "Charlie"];
 *
 * console.log(productOf(names, (name) => name.length));
 * // => 105
 * ```
 */
export function productOf<T>(iterable: Iterable<T>, selector: (element: T) => number): number;
export function productOf<T>(
	iterable: Iterable<T>,
	selector: (element: T) => bigint | number,
): bigint | number {
	let product = isAllBigInt(iterable) ? 1n : 1;

	for (const element of iterable) {
		// @ts-expect-error
		product *= selector(element);
	}

	return product;
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("productOf", () => {
		const names = ["Alice", "Bob", "Charlie"];

		expect(productOf([1n, 2n, 3n], (x) => x * 2n)).toBe(48n);
		expect(productOf(names, (name) => name.length)).toBe(105);
	});
}
