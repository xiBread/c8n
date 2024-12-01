/**
 * Produces a generator that yields the elements that satisfy the
 * {@link predicate}. This is the inverse of {@link reject}.
 *
 * @see {@link reject}
 *
 * @example
 * ```ts
 * import { filter } from "c8n";
 *
 * const numbers = [1, 2, 3, 4, 5];
 * const iter = filter(numbers, (x) => x % 2 === 0);
 *
 * console.log(iter.toArray());
 * // => [2, 4]
 * ```
 */
export function filter<T>(iterable: Iterable<T>, predicate: (element: T) => boolean): Generator<T>;

/**
 * Produces a generator that yields the elements that satisfy the
 * {@link predicate}. This is the inverse of {@link reject}.
 *
 * @see {@link reject}
 *
 * @example
 * ```ts
 * import { filter } from "c8n";
 *
 * const numbers = [1, 2, 3, 4, 5];
 * const iter = filter(numbers, (x) => x % 2 === 0);
 *
 * console.log(iter.toArray());
 * // => [2, 4]
 * ```
 */
export function filter<T, U extends T>(
	iterable: Iterable<T>,
	predicate: (element: T) => element is U,
): Generator<U>;
export function* filter<T>(
	iterable: Iterable<T>,
	predicate: (element: T) => boolean,
): Generator<T> {
	for (const element of iterable) {
		if (predicate(element)) yield element;
	}
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("filter", () => {
		const numbers = [1, 2, 3, 4, 5];
		const iter = filter(numbers, (x) => x % 2 === 0);

		expect(iter.next().value).toBe(2);
		expect(iter.next().value).toBe(4);
		expect(iter.next().done).toBe(true);
	});
}
