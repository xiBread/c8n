/**
 * Converts an iterable to a {@link Set}.
 *
 * @example
 * ```ts
 * import { toSet } from "c8n";
 *
 * const set = toSet([1, 2, 3]);
 *
 * console.log(set);
 * // => { 1, 2, 3 }
 * ```
 */
export function toSet<T>(iterable: Iterable<T>): Set<T> {
	return new Set(iterable);
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("toSet", () => {
		expect(toSet([])).toEqual(new Set());
		expect(toSet([1, 2, 3])).toEqual(new Set([1, 2, 3]));
		expect(toSet(new Set([1, 2, 3]))).toEqual(new Set([1, 2, 3]));
	});
}
