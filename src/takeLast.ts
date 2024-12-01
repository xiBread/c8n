/**
 * Produces a generator that yields the last elements {@link count} elements
 * from the {@link iterable}.
 *
 * @throws {RangeError} Thrown if {@link count} is `NaN` or negative.
 *
 * @see {@link takeLastWhile}
 * @see {@link take}
 * @see {@link takeWhile}
 *
 * @example
 * ```ts
 * import { takeLast } from "c8n";
 *
 * const numbers = [1, 2, 3, 4, 5];
 * const iter = takeLast(numbers, 2);
 *
 * console.log(iter.toArray());
 * // => [4, 5]
 * ```
 */
export function* takeLast<T>(iterable: Iterable<T>, count: number): Generator<T> {
	if (count < 0) {
		throw new RangeError("'count' must be positive");
	}

	const array = Array.from(iterable);

	for (let i = array.length - count; i < array.length; i++) {
		yield array[i];
	}
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("takeLast", () => {
		const numbers = [1, 2, 3, 4, 5];
		const iter = takeLast(numbers, 2);

		expect(iter.toArray()).toEqual([4, 5]);
	});

	it("takeLast throws with negative count", () => {
		expect(() => takeLast([], -1).toArray()).toThrow("'count'");
	});
}
