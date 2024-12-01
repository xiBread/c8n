import { drop } from "./";

/**
 * Produces a generator that yields the elements from the {@link iterable}
 * except those that satisfy the {@link predicate} from the start.
 *
 * @see {@link takeLast}
 * @see {@link take}
 * @see {@link takeWhile}
 *
 * @example
 * ```ts
 * import { takeLastWhile } from "c8n";
 *
 * const numbers = [1, 2, 3, 4, 5];
 * const iter = takeLastWhile(array, (x) => x > 3);
 *
 * console.log(iter.toArray());
 * // => [4, 5]
 * ```
 */
export function* takeLastWhile<T>(
	iterable: Iterable<T>,
	predicate: (element: T) => boolean,
): Generator<T> {
	const array = Array.from(iterable);

	for (let i = array.length - 1; i >= 0; i--) {
		if (!predicate(array[i])) {
			yield* drop(array, i + 1);
			return;
		}
	}
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("takeLastWhile", () => {
		const numbers = [1, 2, 3, 4, 5];
		const iter = takeLastWhile(numbers, (x) => x > 3);

		expect(iter.next().value).toBe(4);
		expect(iter.next().value).toBe(5);
		expect(iter.next().done).toBe(true);

		expect(takeLastWhile([], () => true).toArray()).toEqual([]);
	});
}
