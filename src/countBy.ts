/**
 * Returns a {@link Map} containing the number of times a key was returned by
 * the {@link keySelector}.
 *
 * @example
 * ```ts
 * import { countBy } from "c8n";
 *
 * const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
 * const map = countBy(numbers, (x) => x % 2 === 0 ? "even" : "odd");
 *
 * console.log(map);
 * // => { "odd" => 5, "even" => 5 }
 * ```
 */
export function countBy<T, U>(
	iterable: Iterable<T>,
	keySelector: (element: T) => U,
): Map<U, number> {
	const map = new Map<U, number>();

	for (const element of iterable) {
		const key = keySelector(element);
		const count = map.get(key) ?? 0;

		map.set(key, count + 1);
	}

	return map;
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("countBy", () => {
		const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
		const map = countBy(numbers, (x) => (x % 2 === 0 ? "even" : "odd"));

		expect(map).toEqual(
			new Map([
				["odd", 5],
				["even", 5],
			]),
		);
	});
}
