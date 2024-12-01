import type { Rest } from "./_internal";

/**
 * Produces a generator that yields all elements from the {@link iterables} in
 * the order that they were provided.
 *
 * @example
 * ```ts
 * import { concat } from "c8n";
 *
 * const iter = concat([1, 2], "ab", new Set([true, false]));
 *
 * console.log(iter.toArray());
 * // => [1, 2, "a", "b", true, false]
 * ```
 */
export function* concat<T extends unknown[]>(...iterables: Rest<T>): Generator<T[number]> {
	for (const iterable of iterables) {
		yield* iterable as Iterable<T>;
	}
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("concat", () => {
		const iter = concat([1, 2], "ab", new Set([true, false]));

		expect(iter.next().value).toBe(1);
		expect(iter.next().value).toBe(2);
		expect(iter.next().value).toBe("a");
		expect(iter.next().value).toBe("b");
		expect(iter.next().value).toBe(true);
		expect(iter.next().value).toBe(false);
		expect(iter.next().done).toBe(true);
	});
}
