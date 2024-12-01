/**
 * Produces a generator that yields the elements of the {@link iterable} with a
 * {@link separator} between adjacent elements.
 *
 * @example
 * ```ts
 * import { intersperse } from "c8n";
 *
 * const iter = intersperse([1, 2, 3], 42);
 *
 * console.log(iter.toArray());
 * // => [1, 42, 2, 42, 3]
 * ```
 */
export function* intersperse<T>(iterable: Iterable<T>, separator: T): Generator<T> {
	let first = true;

	for (const element of iterable) {
		if (first) {
			first = false;
		} else {
			yield separator;
		}

		yield element;
	}
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("intersperse", () => {
		const iter = intersperse([1, 2, 3], 42);

		expect(iter.next().value).toEqual(1);
		expect(iter.next().value).toEqual(42);
		expect(iter.next().value).toEqual(2);
		expect(iter.next().value).toEqual(42);
		expect(iter.next().value).toEqual(3);
		expect(iter.next().done).toBe(true);
	});
}
