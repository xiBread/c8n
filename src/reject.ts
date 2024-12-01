/**
 * Produces a generator that yields the elements that do not satisfy the
 * {@link predicate}. This is the inverse of {@link filter}.
 *
 * @see {@link filter}
 *
 * @example
 * ```ts
 * import { reject } from "c8n";
 *
 * const iter = reject([1, 2, 3, 4, 5], (x) => x % 2 === 0);
 *
 * console.log(iter.toArray());
 * // => [1, 3, 5]
 * ```
 */
export function* reject<T>(
	iterable: Iterable<T>,
	predicate: (element: T) => boolean,
): Generator<T> {
	for (const element of iterable) {
		if (!predicate(element)) yield element;
	}
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("reject", () => {
		const iter = reject([1, 2, 3, 4, 5], (x) => x % 2 === 0);

		expect(iter.next().value).toBe(1);
		expect(iter.next().value).toBe(3);
		expect(iter.next().value).toBe(5);
		expect(iter.next().done).toBe(true);
	});
}
