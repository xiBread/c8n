/**
 * Produces a generator that yields the values returned by calling
 * {@link transform} on every element in the {@link iterable}.
 *
 * @example
 * ```ts
 * import { map } from "c8n";
 *
 * const iter = map([1, 2, 3], (x) => x * 2);
 *
 * console.log(iter.toArray());
 * // => [2, 4, 6]
 * ```
 */
export function* map<T, U>(iterable: Iterable<T>, transform: (element: T) => U): Generator<U> {
	for (const element of iterable) {
		yield transform(element);
	}
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("map", () => {
		const iter = map([1, 2, 3], (x) => x * 2);

		expect(iter.next().value).toBe(2);
		expect(iter.next().value).toBe(4);
		expect(iter.next().value).toBe(6);
		expect(iter.next().done).toBe(true);
	});
}
