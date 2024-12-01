import { uniqueBy } from "./uniqueBy";

/**
 * Produces a generator that yields the unique elements of the {@link iterable}.
 *
 * @see {@link uniqueBy}
 *
 * @example
 * ```ts
 * import { unique } from "c8n";
 *
 * const numbers = [1, 2, 3, 2, 4, 4, 5, 1];
 * const iter = unique(numbers);
 *
 * console.log(iter.toArray());
 * // => [1, 2, 3, 4, 5]
 * ```
 */
export function* unique<T>(iterable: Iterable<T>): Generator<T> {
	yield* uniqueBy(iterable, (element) => element);
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("unique", () => {
		const numbers = [1, 2, 3, 2, 4, 4, 5, 1];
		const iter = unique(numbers);

		expect(iter.next().value).toBe(1);
		expect(iter.next().value).toBe(2);
		expect(iter.next().value).toBe(3);
		expect(iter.next().value).toBe(4);
		expect(iter.next().value).toBe(5);
		expect(iter.next().done).toBe(true);
	});
}
