/**
 * Produces a generator that yields the indices of the {@link iterable}.
 *
 * @example
 * ```ts
 * import { indices } from "c8n";
 *
 * const iter = indices("ABCDE");
 *
 * console.log(iter.toArray());
 * // => [0, 1, 2, 3, 4]
 * ```
 */
export function* indices(iterable: Iterable<unknown>): Generator<number> {
	let index = 0;
	for (const _ of iterable) yield index++;
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("indices", () => {
		const iter = indices("ABCDE");

		expect(iter.next().value).toBe(0);
		expect(iter.next().value).toBe(1);
		expect(iter.next().value).toBe(2);
		expect(iter.next().value).toBe(3);
		expect(iter.next().value).toBe(4);
		expect(iter.next().done).toBe(true);
	});
}
