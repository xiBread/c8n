/**
 * Returns the largest element from the values returned by calling
 * {@link comparator} on every element in the {@link iterable}. If the
 * {@link iterable} is empty, returns `undefined`.
 *
 * @example
 * ```ts
 * import { maxWith } from "c8n";
 *
 * const names = ["Alice", "Bob", "Charlie"];
 * const max = maxWith(names, (a, b) => b.length - a.length);
 *
 * console.log(max);
 * // => "Charlie"
 * ```
 */
export function maxWith<T>(
	iterable: Iterable<T>,
	comparator: (a: T, b: T) => number,
): T | undefined {
	const iterator = iterable[Symbol.iterator]();

	let next = iterator.next();
	let max = next.value;

	while (!next.done) {
		next = iterator.next();
		if (next.done) break;

		if (comparator(max, next.value) > 0) {
			max = next.value;
		}
	}

	return max;
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("maxWith", () => {
		const names = ["Alice", "Bob", "Charlie"];
		const max = maxWith(names, (a, b) => b.length - a.length);

		expect(max).toBe("Charlie");
		expect(maxWith([], () => 0)).toBeUndefined();
	});
}
