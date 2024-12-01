/**
 * Returns a boolean indicating if no elements satisfy the {@link predicate}.
 * An empty {@link iterable} returns `true`. This is the inverse of
 * {@link some}.
 *
 * @see {@link every}
 * @see {@link some}
 *
 * @example
 * ```ts
 * import { none } from "c8n";
 *
 * const numbers = [1, 2, 3];
 *
 * console.log(none(numbers, (x) => x < 0));
 * // => true
 *
 * console.log(none(numbers, (x) => x > 2));
 * // => false
 * ```
 */
export function none<T>(iterable: Iterable<T>, predicate: (element: T) => boolean): boolean {
	for (const element of iterable) {
		if (predicate(element)) return false;
	}

	return true;
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("none", () => {
		const numbers = [1, 2, 3];

		expect(none(numbers, (x) => x < 0)).toBe(true);
		expect(none(numbers, (x) => x > 2)).toBe(false);
	});
}
