/**
 * Produces a generator that yields the first {@link count} elements from the
 * {@link iterable}.
 *
 * @see {@link takeWhile}
 * @see {@link takeLast}
 * @see {@link takeLastWhile}
 *
 * @example
 * ```ts
 * import { take } from "c8n";
 *
 * function* naturals() {
 * 	for (let i = 0; ; i++) yield i;
 * }
 *
 * const iter = take(naturals(), 5);
 *
 * console.log(iter.toArray());
 * // => [0, 1, 2, 3, 4]
 * ```
 */
export function* take<T>(iterable: Iterable<T>, count: number): Generator<T> {
	yield* Iterator.from(iterable).take(count);
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("take", () => {
		function* naturals() {
			/* v8 ignore next */
			for (let i = 0; ; i++) yield i;
		}

		const iter = take(naturals(), 5);

		expect(iter.next().value).toBe(0);
		expect(iter.next().value).toBe(1);
		expect(iter.next().value).toBe(2);
		expect(iter.next().value).toBe(3);
		expect(iter.next().value).toBe(4);
		expect(iter.next().done).toBe(true);
	});
}
