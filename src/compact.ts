/**
 * Produces a generator that yields non-nullish elements from the
 * {@link iterable}.
 *
 * @example
 * ```ts
 * import { compact } from "c8n";
 *
 * const numbers = [1, null, 2, 3, undefined, 4, , 5];
 * const iter = compact(numbers);
 *
 * console.log(iter.toArray());
 * // => [1, 2, 3, 4, 5]
 * ```
 */
export function* compact<T>(iterable: Iterable<T>): Generator<NonNullable<T>> {
	for (const element of iterable) {
		if (element != null) yield element;
	}
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("compact", () => {
		// eslint-disable-next-line no-sparse-arrays
		const numbers = [1, null, 2, 3, undefined, 4, , 5];
		const iter = compact(numbers);

		expect(iter.next().value).toBe(1);
		expect(iter.next().value).toBe(2);
		expect(iter.next().value).toBe(3);
		expect(iter.next().value).toBe(4);
		expect(iter.next().value).toBe(5);
		expect(iter.next().done).toBe(true);
	});
}
