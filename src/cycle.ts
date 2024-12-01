/**
 * Produces a generator that yields the elements of the {@link iterable}
 * until it has done so {@link count} amount times.
 *
 * @example
 * ```ts
 * import { cycle } from "c8n";
 *
 * const iter = cycle([1, 2, 3], 3);
 *
 * console.log(iter.toArray());
 * // => [1, 2, 3, 1, 2, 3, 1, 2, 3]
 * ```
 */
export function* cycle<T>(iterable: Iterable<T>, count = Infinity): Generator<T> {
	for (let i = 0; i < count; i++) {
		for (const element of iterable) {
			yield element;
		}
	}
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("cycle", () => {
		expect(cycle([1, 2, 3, 4], 3).toArray()).toEqual([1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4]);
	});
}
