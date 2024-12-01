/**
 * Returns a string of the elements in the {@link iterable} joined by the
 * {@link separator}.
 *
 * This differs from {@link Array.join} in that the {@link separator} defaults
 * to an empty string (`""`) instead of a comma (`","`).
 *
 * @example
 * ```ts
 * import { join } from "c8n";
 *
 * console.log(join([1, 2, 3]));
 * // => "123"
 *
 * console.log(join([1, 2, 3], "-"));
 * // => "1-2-3"
 *
 * console.log(join("abc", "+"));
 * // => "a+b+c"
 * ```
 */
export function join(iterable: Iterable<unknown>, separator = ""): string {
	const iterator = iterable[Symbol.iterator]();

	let string = "";
	let next = iterator.next();

	if (!next.done) {
		string += next.value;
		next = iterator.next();
	}

	while (!next.done) {
		string += separator + next.value;
		next = iterator.next();
	}

	return string;
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("join", () => {
		expect(join([1, 2, 3])).toBe("123");
		expect(join([1, 2, 3], "-")).toBe("1-2-3");
		expect(join("abc", "+")).toBe("a+b+c");
	});
}
