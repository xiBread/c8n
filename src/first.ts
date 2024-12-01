/**
 * Returns the first element in the {@link iterable} or `undefined` if it is
 * empty.
 *
 * @see {@link last}
 *
 * @example
 * ```ts
 * import { first } from "c8n";
 *
 * function* naturals() {
 * 	for (let i = 0; ; i++) yield i;
 * }
 *
 * console.log(first(naturals()));
 * // => 0
 *
 * console.log(first([]));
 * // => undefined
 * ```
 */
export function first<T>(iterable: Iterable<T>): T | undefined {
	const result = iterable[Symbol.iterator]().next();
	return result.value;
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("first", () => {
		function* naturals() {
			/* v8 ignore next */
			for (let i = 0; ; i++) yield i;
		}

		expect(first(naturals())).toBe(0);
		expect(first([])).toBeUndefined();
	});
}
