/**
 * Produces a generator that yields the elements from the {@link iterable}
 * except those that satisfy the {@link predicate} from the start.
 *
 * @see {@link drop}
 * @see {@link dropLast}
 * @see {@link dropLastWhile}
 *
 * @example
 * ```ts
 * import { dropWhile } from "c8n";
 *
 * const numbers = [1, 2, 3, 4, 5];
 * const iter = dropWhile(numbers, (x) => x < 3);
 *
 * console.log(iter.toArray());
 * // => [3, 4, 5]
 * ```
 */
export function* dropWhile<T>(
	iterable: Iterable<T>,
	predicate: (element: T) => boolean,
): Generator<T> {
	let yielding = false;

	for (const element of iterable) {
		if (yielding) {
			yield element;
		} else if (!predicate(element)) {
			yield element;
			yielding = true;
		}
	}
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("dropWhile", () => {
		const numbers = [1, 2, 3, 4, 5];
		const iter = dropWhile(numbers, (x) => x < 3);

		expect(iter.next().value).toBe(3);
		expect(iter.next().value).toBe(4);
		expect(iter.next().value).toBe(5);
		expect(iter.next().done).toBe(true);
	});
}
