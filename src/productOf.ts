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
export function productOf<T>(
	iterable: Iterable<T>,
	selector: (element: T) => bigint,
	hint?: "bigint",
): bigint;

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
export function productOf<T>(
	iterable: Iterable<T>,
	selector: (element: T) => number,
	hint?: "number",
): number;
export function productOf<T>(
	iterable: Iterable<T>,
	selector: (element: T) => bigint | number,
	hint: "bigint" | "number" = "number",
): bigint | number {
	let result: number | bigint;

	const iterator = iterable[Symbol.iterator]();
	let next = iterator.next();

	if (next.done) {
		return hint === "number" ? 0 : 0n;
	}

	result = selector(next.value);
	next = iterator.next();

	while (!next.done) {
		// @ts-expect-error
		result *= selector(next.value);
		next = iterator.next();
	}

	return result;
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("productOf", () => {
		const names = ["Alice", "Bob", "Charlie"];

		expect(productOf([], (x) => x)).toBe(0);
		expect(productOf([], (x) => x, "bigint")).toBe(0n);

		expect(productOf(names, (name) => name.length)).toBe(105);

		expect(productOf([1n, 2n, 3n], (x) => x * 2n)).toBe(48n);
		expect(productOf([1n, 2n, 3n].values(), (x) => x * 2n)).toBe(48n);
	});
}
