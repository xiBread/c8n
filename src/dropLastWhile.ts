import { take } from "./";

/**
 * Produces a generator that yields the elements from the {@link iterable}
 * except those that satisfy the {@link predicate} from the end.
 *
 * @see {@link dropLast}
 * @see {@link drop}
 * @see {@link dropWhile}
 *
 * @example
 * ```ts
 * import { dropLastWhile } from "c8n";
 *
 * const numbers = [1, 2, 3, 4, 5];
 * const iter = dropLastWhile(array, (x) => x > 3);
 *
 * console.log(iter.toArray());
 * // => [1, 2, 3]
 * ```
 */
export function* dropLastWhile<T>(
	iterable: Iterable<T>,
	predicate: (element: T) => boolean,
): Generator<T> {
	const array = Array.from(iterable);

	for (let i = array.length - 1; i >= 0; i--) {
		if (!predicate(array[i])) {
			yield* take(array, i + 1);
			return;
		}
	}
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("dropLastWhile", () => {
		const numbers = [1, 2, 3, 4, 5];
		const iter = dropLastWhile(numbers, (x) => x > 3);

		expect(iter.next().value).toBe(1);
		expect(iter.next().value).toBe(2);
		expect(iter.next().value).toBe(3);
		expect(iter.next().done).toBe(true);

		expect(dropLastWhile([], () => true).toArray()).toEqual([]);
	});
}
