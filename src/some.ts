import { none } from "./";

/**
 * Returns a boolean indicating if any element in the {@link iterable}
 * satisfies the {@link predicate}. An empty {@link iterable} returns `false`.
 * This is the inverse of {@link none}.
 *
 * @see {@link every}
 * @see {@link none}
 *
 * @example
 * ```ts
 * import { some } from "c8n";
 *
 * const numbers = [1, 2, 3];
 *
 * console.log(some(numbers, (x) => x > 2));
 * // => true
 *
 * console.log(some(numbers, (x) => x < 0));
 * // => false
 * ```
 */
export function some<T>(iterable: Iterable<T>, predicate: (element: T) => boolean): boolean {
	return !none(iterable, predicate);
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("some", () => {
		const numbers = [1, 2, 3];

		expect(some(numbers, (x) => x > 2)).toBe(true);
		expect(some(numbers, (x) => x < 0)).toBe(false);
		expect(some([], () => true)).toBe(false);
	});
}
