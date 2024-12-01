/**
 * Produces a generator that yields the first elements from the {@link iterable}
 * that satisfy the {@link predicate}.
 *
 * @see {@link take}
 * @see {@link takeLast}
 * @see {@link takeLastWhile}
 *
 * @example
 * ```ts
 * import { takeWhile } from "c8n";
 *
 * const numbers = [1, 2, 3, 4, 5];
 * const iter = takeWhile(numbers, (x) => x < 3);
 *
 * console.log(iter.toArray());
 * // => [1, 2]
 * ```
 */
export function* takeWhile<T>(
	iterable: Iterable<T>,
	predicate: (element: T) => boolean,
): Generator<T> {
	for (const element of iterable) {
		if (!predicate(element)) return;
		yield element;
	}
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("takeWhile", () => {
		const numbers = [1, 2, 3, 4, 5];
		const iter = takeWhile(numbers, (x) => x < 3);

		expect(iter.next().value).toBe(1);
		expect(iter.next().value).toBe(2);
		expect(iter.next().done).toBe(true);

		expect(takeWhile([], () => true).toArray()).toEqual([]);
	});
}
