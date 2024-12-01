/**
 * Produces a generator that yields the elements that are present in each of the
 * {@link iterables}. The first iterable is used as the source.
 *
 * @example
 * ```ts
 * import { intersect } from "c8n";
 *
 * const iter = intersect([1, 2, 3], [5, 2, 3, 9]);
 *
 * console.log(iter.toArray());
 * // => [2, 3]
 * ```
 */
export function* intersect<T>(...iterables: Iterable<T>[]): Generator<T> {
	if (iterables.length === 0) return;

	const source = iterables.shift()!;
	const sets = iterables.map((iter) => new Set(iter));

	for (const element of source) {
		if (sets.every((set) => set.has(element))) {
			yield element;
		}
	}
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("intersect", () => {
		const iter = intersect([1, 2, 3], [5, 2, 3, 9]);

		expect(iter.next().value).toBe(2);
		expect(iter.next().value).toBe(3);
		expect(iter.next().done).toBe(true);

		expect(intersect().next().done).toBe(true);
		expect(intersect([]).next().done).toBe(true);
		expect(intersect([1, 2, 3]).toArray()).toEqual([1, 2, 3]);
	});
}
