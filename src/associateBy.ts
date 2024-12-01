/**
 * Returns a {@link Map} containing the elements in the {@link iterable}, keyed
 * by the {@link keySelector}.
 *
 * @see {@link associate}
 * @see {@link associateWith}
 *
 * @example
 * ```ts
 * import { associateBy } from "c8n";
 *
 * const codes = [72, 69, 76, 76, 79];
 * const map = associateBy(codes, (c) => String.fromCharCode(c));
 *
 * console.log(map);
 * // => { "H" => 72, "E" => 69, "L" => 76, "O" => 79 }
 * ```
 */
export function associateBy<T, K>(iterable: Iterable<T>, keySelector: (element: T) => K): Map<K, T>;

/**
 * Returns a {@link Map} containing the values returned by
 * {@link valueTransform}, keyed by the {@link keySelector}.
 *
 * @see {@link associate}
 * @see {@link associateWith}
 *
 * @example
 * ```ts
 * import { associateBy } from "c8n";
 *
 * const codes = [65, 65, 66, 67];
 * const map = associateBy(
 * 	codes,
 * 	(c) => String.fromCharCode(c),
 * 	(c) => String.fromCharCode(c + 32)
 * );
 *
 * console.log(map);
 * // => { "A" => "a", "B" => "b", "C" => "c" }
 * ```
 */
export function associateBy<T, K, V>(
	iterable: Iterable<T>,
	keySelector: (element: T) => K,
	valueTransform: (element: T) => V,
): Map<K, V>;
export function associateBy<T, K, V>(
	iterable: Iterable<T>,
	keySelector: (element: T) => K,
	valueTransform?: (element: T) => V,
): Map<K, T | V> {
	const map = new Map<K, T | V>();

	for (const element of iterable) {
		map.set(keySelector(element), valueTransform?.(element) ?? element);
	}

	return map;
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("associateBy", () => {
		const codes = [72, 69, 76, 76, 79];
		const map = associateBy(codes, (c) => String.fromCharCode(c));

		expect(map).toEqual(
			new Map([
				["H", 72],
				["E", 69],
				["L", 76],
				["O", 79],
			]),
		);
	});

	it("associateBy with valueTransform", () => {
		const codes = [65, 65, 66, 67];
		const map = associateBy(
			codes,
			(c) => String.fromCharCode(c),
			(c) => String.fromCharCode(c + 32),
		);

		expect(map).toEqual(
			new Map([
				["A", "a"],
				["B", "b"],
				["C", "c"],
			]),
		);
	});
}
