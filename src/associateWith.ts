/**
 * Returns a {@link Map} containing the values returned by the
 * {@link valueSelector}, keyed by the elements in the {@link iterable}.
 *
 * @see {@link associate}
 * @see {@link associateBy}
 *
 * @example
 * ```ts
 * import { associateWith } from "c8n";
 *
 * const words = ["a", "abc", "ab", "def", "abcd"];
 * const map = associateWith(words, (word) => word.length);
 *
 * console.log(map);
 * // {
 * //   "a" => 1,
 * //   "abc" => 3,
 * //   "ab" => 2,
 * //   "def" => 3,
 * //   "abcd" => 4
 * // }
 * ```
 */
export function associateWith<T, V>(
	iterable: Iterable<T>,
	valueSelector: (element: T) => V,
): Map<T, V> {
	const map = new Map<T, V>();

	for (const element of iterable) {
		map.set(element, valueSelector(element));
	}

	return map;
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("associateWith", () => {
		const words = ["a", "abc", "ab", "def", "abcd"];
		const map = associateWith(words, (word) => word.length);

		expect(map).toEqual(
			new Map([
				["a", 1],
				["abc", 3],
				["ab", 2],
				["def", 3],
				["abcd", 4],
			]),
		);
	});
}
