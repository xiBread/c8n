/**
 * Returns a {@link Map} containing key-value pairs returned by calling
 * {@link transform} on every element in the {@link iterable}.
 *
 * @see {@link associateBy}
 * @see {@link associateWith}
 *
 * @example
 * ```ts
 * import { associate } from "c8n";
 *
 * // "HELLO" as UTF-16 code units
 * const codes = [72, 69, 76, 76, 79];
 * const map = associate(codes, (c) => [c, String.fromCharCode(c)]);
 *
 * console.log(map);
 * // => { 72 => "H", 69 => "E", 76 => "L", 79 => "O" }
 * ```
 */
export function associate<T, K, V>(
	iterable: Iterable<T>,
	transform: (element: T) => [K, V],
): Map<K, V> {
	const map = new Map<K, V>();

	for (const element of iterable) {
		const [key, value] = transform(element);
		map.set(key, value);
	}

	return map;
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("associate", () => {
		const codes = [72, 69, 76, 76, 79];
		const map = associate(codes, (c) => [c, String.fromCharCode(c)]);

		expect(map).toEqual(
			new Map([
				[72, "H"],
				[69, "E"],
				[76, "L"],
				[79, "O"],
			]),
		);
	});
}
