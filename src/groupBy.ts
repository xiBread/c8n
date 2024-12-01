/**
 * Returns a {@link Map} containing arrays of elements grouped according to
 * the {@link keySelector}.
 *
 * @example
 * ```ts
 * import { groupBy } from "c8n";
 *
 * const words = ["a", "abc", "ab", "def", "abcd"];
 * const map = groupBy(words, (word) => word.length);
 *
 * console.log(map);
 * // {
 * //   1 => ["a"],
 * //   3 => ["abc", "def"],
 * //   2 => ["ab"],
 * //   4 => ["abcd"]
 * // }
 * ```
 */
export function groupBy<T, K>(iterable: Iterable<T>, keySelector: (element: T) => K): Map<K, T[]>;

/**
 * Returns a {@link Map} containing arrays of values returned by the
 * {@link valueTransform} grouped according to the {@link keySelector}.
 *
 * @example
 * ```ts
 * import { groupBy } from "c8n";
 *
 * const words = ["a", "abc", "ab", "def", "abcd"];
 * const map = groupBy(words, (word) => word.length, (word) => word.toUpperCase());
 *
 * console.log(map);
 * // {
 * //   1 => ["A"],
 * //   3 => ["ABC", "DEF"],
 * //   2 => ["AB"],
 * //   4 => ["ABCD"]
 * // }
 * ```
 */
export function groupBy<T, K, V>(
	iterable: Iterable<T>,
	keySelector: (element: T) => K,
	valueTransform: (element: T) => V,
): Map<K, V[]>;
export function groupBy<T, K, V>(
	iterable: Iterable<T>,
	keySelector: (element: T) => K,
	valueTransform?: (element: T) => V,
): Map<K, (T | V)[]> {
	const map = new Map<K, (T | V)[]>();

	for (const element of iterable) {
		const key = keySelector(element);

		const group = map.get(key) ?? [];
		group.push(valueTransform?.(element) ?? element);

		map.set(key, group);
	}

	return map;
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("groupBy", () => {
		const words = ["a", "abc", "ab", "def", "abcd"];
		const map = groupBy(words, (word) => word.length);

		expect(map).toEqual(
			new Map([
				[1, ["a"]],
				[3, ["abc", "def"]],
				[2, ["ab"]],
				[4, ["abcd"]],
			]),
		);
	});

	it("groupBy with valueTransform", () => {
		const words = ["a", "abc", "ab", "def", "abcd"];
		const map = groupBy(
			words,
			(word) => word.length,
			(word) => word.toUpperCase(),
		);

		expect(map).toEqual(
			new Map([
				[1, ["A"]],
				[3, ["ABC", "DEF"]],
				[2, ["AB"]],
				[4, ["ABCD"]],
			]),
		);
	});
}
