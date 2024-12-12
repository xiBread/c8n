import { productOf } from "./";

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
export function product(iterable: Iterable<bigint>, hint?: "bigint"): bigint;

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
export function product(iterable: Iterable<number>, hint?: "number"): number;
export function product(
	iterable: Iterable<bigint> | Iterable<number>,
	hint: "bigint" | "number" = "number",
): bigint | number {
	// @ts-expect-error
	return productOf(iterable, (element) => element, hint);
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("product", () => {
		expect(product([])).toBe(0);
		expect(product([], "bigint")).toBe(0n);

		expect(product([2n, 4n, 6n])).toBe(48n);
		expect(product([2n, 4n, 6n].values())).toBe(48n);

		expect(product([2, 4, 6])).toBe(48);
		expect(product([2, 4, 6].values())).toBe(48);
	});
}
