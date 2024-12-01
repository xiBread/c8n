/**
 * Produces a generator that yields the elements from the {@link iterable}
 * except the first {@link count} elements.
 *
 * @see {@link dropWhile}
 * @see {@link dropLast}
 * @see {@link dropLastWhile}
 *
 * @example
 * ```ts
 * import { drop } from "c8n";
 *
 * function* naturals() {
 * 	for (let i = 0; ; i++) yield i;
 * }
 *
 * const iter = drop(naturals(), 5).take(5);
 *
 * console.log(iter.toArray());
 * // => [5, 6, 7, 8, 9]
 * ```
 */
export function* drop<T>(iterable: Iterable<T>, count: number): Generator<T> {
	yield* Iterator.from(iterable).drop(count);
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("drop", () => {
		function* naturals() {
			/* v8 ignore next */
			for (let i = 0; ; i++) yield i;
		}

		const iter = drop(naturals(), 5).take(5);

		expect(iter.next().value).toBe(5);
		expect(iter.next().value).toBe(6);
		expect(iter.next().value).toBe(7);
		expect(iter.next().value).toBe(8);
		expect(iter.next().value).toBe(9);
		expect(iter.next().done).toBe(true);
	});
}
