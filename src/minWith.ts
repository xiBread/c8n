/**
 * Returns the smallest element from the values returned by calling
 * {@link selector} on every element in the {@link iterable}. If the
 * {@link iterable} is empty, returns `undefined`.
 *
 * @example
 * ```ts
 * import { minWith } from "c8n";
 *
 * const names = ["Alice", "Bob", "Charlie"];
 * const min = minWith(names, (a, b) => b.length - a.length);
 *
 * console.log(min);
 * // => "Bob"
 * ```
 */
export function minWith<T>(
	iterable: Iterable<T>,
	comparator: (a: T, b: T) => number,
): T | undefined {
	const iterator = iterable[Symbol.iterator]();

	let next = iterator.next();
	let min = next.value;

	while (!next.done) {
		next = iterator.next();
		if (next.done) break;

		if (comparator(min, next.value) < 0) {
			min = next.value;
		}
	}

	return min;
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("minWith", () => {
		const names = ["Alice", "Bob", "Charlie"];
		const min = minWith(names, (a, b) => b.length - a.length);

		expect(min).toBe("Bob");
		expect(minWith([], () => 0)).toBeUndefined();
	});
}
