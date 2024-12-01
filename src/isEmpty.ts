/**
 * Returns a boolean indicating if the {@link iterable} is empty.
 *
 * @example
 * ```ts
 * import { isEmpty } from "c8n";
 *
 * function* empty() {}
 *
 * console.log(isEmpty(empty()));
 * // => true
 *
 * console.log(isEmpty([1]));
 * // => false
 * ```
 */
export function isEmpty(iterable: Iterable<unknown>): iterable is Iterable<never> {
	const iterator = iterable[Symbol.iterator]();

	/* v8 ignore next */
	return iterator.next().done ?? false;
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("isEmpty", () => {
		function* empty() {}
		function* one() {
			/* v8 ignore next */
			yield 1;
		}

		expect(isEmpty("")).toBe(true);
		expect(isEmpty([])).toBe(true);
		expect(isEmpty(empty())).toBe(true);

		expect(isEmpty([1])).toBe(false);
		expect(isEmpty(one())).toBe(false);
	});
}
