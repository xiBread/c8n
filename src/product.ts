import { isAllBigInt } from "./_internal";
import type { productOf } from "./productOf";

/**
 * Returns the product of the elements in the {@link iterable}.
 *
 * @see {@link productOf}
 *
 * @example
 * ```ts
 * import { product } from "c8n";
 *
 * console.log(product([2n, 4n, 6n]));
 * // => 48n
 * ```
 */
export function product(iterable: Iterable<bigint>): bigint;

/**
 * Returns the product of the elements in the {@link iterable}.
 *
 * @see {@link productOf}
 *
 * @example
 * ```ts
 * import { product } from "c8n";
 *
 * console.log(product([2, 4, 6]));
 * // => 48
 * ```
 */
export function product(iterable: Iterable<number>): number;
export function product(iterable: Iterable<bigint> | Iterable<number>): bigint | number {
	if (isAllBigInt(iterable)) {
		let product = 1n;
		for (const x of iterable) product *= x;

		return product;
	}

	return [...iterable].reduce((p, val) => p * val, 1);
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("product", () => {
		expect(product([2n, 4n, 6n])).toEqual(48n);
		expect(product([2, 4, 6])).toEqual(48);
	});
}
