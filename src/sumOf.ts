import type { sum } from "./";

/**
 * Returns the sum of the values returned by calling {@link selector} on every
 * element in the {@link iterable}.
 *
 * @see {@link sum}
 *
 * @example
 * ```ts
 * import { sumOf } from "c8n";
 *
 * console.log(sumOf([1n, 2n, 3n], (x) => x * 2n));
 * // => 12n
 * ```
 */
export function sumOf<T>(
	iterable: Iterable<T>,
	selector: (element: T) => bigint,
	hint?: "bigint",
): bigint;

/**
 * Returns the sum of the values returned by calling {@link selector} on every
 * element in the {@link iterable}.
 *
 * @see {@link sum}
 *
 * @example
 * ```ts
 * import { sumOf } from "c8n";
 *
 * const names = ["Alice", "Bob", "Charlie"];
 *
 * console.log(sumOf(names, (name) => name.length));
 * // => 15
 * ```
 */
export function sumOf<T>(
	iterable: Iterable<T>,
	selector: (element: T) => number,
	hint?: "number",
): number;
export function sumOf<T>(
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
		result += selector(next.value);
		next = iterator.next();
	}

	return result;
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("sumOf", () => {
		const names = ["Alice", "Bob", "Charlie"];

		expect(sumOf([], (x) => x)).toBe(0);
		expect(sumOf([], (x) => x, "bigint")).toBe(0n);

		expect(sumOf(names, (name) => name.length)).toBe(15);

		expect(sumOf([1n, 2n, 3n], (x) => x * 2n)).toBe(12n);
		expect(sumOf([1n, 2n, 3n].values(), (x) => x * 2n)).toBe(12n);
	});
}
