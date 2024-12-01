/**
 * Returns a boolean indicating if every element in the {@link iterable}
 * satisfies the {@link predicate}. An empty {@link iterable} returns `true`.
 *
 * @see {@link none}
 * @see {@link some}
 *
 * @example
 * ```ts
 * import { every } from "c8n";
 *
 * const numbers = [1, 2, 3];
 *
 * console.log(every(numbers, (x) => x > 0));
 * // => true
 *
 * console.log(every(numbers, (x) => x > 2));
 * // => false
 * ```
 */
export function every<T>(iterable: Iterable<T>, predicate: (element: T) => boolean): boolean;

/**
 * Returns a boolean indicating if every element in the {@link iterable}
 * satisfies the {@link predicate}. An empty {@link iterable} returns `true`.
 *
 * @see {@link none}
 * @see {@link some}
 *
 * @example
 * ```ts
 * import { every } from "c8n";
 *
 * const numbers = [1, 2, 3];
 *
 * console.log(every(numbers, (x) => x > 0));
 * // => true
 *
 * console.log(every(numbers, (x) => x > 2));
 * // => false
 * ```
 */
export function every<T, U extends T>(
	iterable: Iterable<T>,
	predicate: (element: T) => element is U,
): iterable is Iterable<U>;
export function every<T>(iterable: Iterable<T>, predicate: (element: T) => boolean): boolean {
	for (const element of iterable) {
		if (!predicate(element)) return false;
	}

	return true;
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("every", () => {
		const numbers = [1, 2, 3];

		expect(every(numbers, (x) => x > 0)).toBe(true);
		expect(every(numbers, (x) => x > 2)).toBe(false);
		expect(every([], () => false)).toBe(true);
	});
}
