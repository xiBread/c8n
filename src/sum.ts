import { sumOf } from "./";

/**
 * Returns the sum of the elements in the {@link iterable}.
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
export function sum(iterable: Iterable<bigint>, hint?: "bigint"): bigint;

/**
 * Returns the sum of the elements in the {@link iterable}.
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
export function sum(iterable: Iterable<number>, hint?: "number"): number;
export function sum(
	iterable: Iterable<bigint> | Iterable<number>,
	hint: "bigint" | "number" = "number",
): bigint | number {
	// @ts-expect-error
	return sumOf(iterable, (element) => element, hint);
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("sum", () => {
		expect(sum([])).toBe(0);
		expect(sum([], "bigint")).toBe(0n);

		expect(sum([1n, 2n, 3n])).toBe(6n);
		expect(sum([1n, 2n, 3n].values())).toBe(6n);

		expect(sum([1, 2, 3])).toBe(6);
		expect(sum([1, 2, 3].values())).toBe(6);
	});
}
