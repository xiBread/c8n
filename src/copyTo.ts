/**
 * Populates the {@link destination} array with the elements from the
 * {@link source} iterable.
 *
 * @returns A reference to the {@link destination} array.
 *
 * @example
 * ```ts
 * import { copyTo } from "c8n";
 *
 * const destination: number[] = [];
 * const array = copyTo([1, 2, 3], destination);
 *
 * console.log(destination);
 * // => [1, 2, 3]
 *
 * console.log(destination === array);
 * // => true
 * ```
 */
export function copyTo<T, U, A extends U[]>(source: Iterable<T>, destination: A): A;

/**
 * Populates the {@link destination} set with the elements from the
 * {@link source} iterable.
 *
 * @returns A reference to the {@link destination} set.
 *
 * @example
 * ```ts
 * import { copyTo } from "c8n";
 *
 * const destination = new Set<number>();
 * const set = copyTo([1, 2, 3], destination);
 *
 * console.log(destination);
 * // => { 1, 2, 3 }
 *
 * console.log(destination === set);
 * // => true
 * ```
 */
export function copyTo<T, U, S extends Set<U>>(source: Iterable<T>, destination: S): S;

/**
 * Populates the {@link destination} map with the elements from the
 * {@link source} iterable.
 *
 * @returns A reference to the {@link destination} map.
 *
 * @example
 * ```ts
 * import { copyTo } from "c8n";
 *
 * const destination = new Map<string, number>();
 * const map = copyTo(new Map([["1", 2], ["3", 4]]), destination);
 *
 * console.log(destination);
 * // => { "1" => 2, "3" => 4 }
 *
 * console.log(destination === map);
 * // => true
 * ```
 *
 * @example
 * ```ts
 * import { copyTo } from "c8n";
 *
 * const destination = new Map<number, number>();
 * const map = copyTo([1, 2, 3], destination);
 *
 * console.log(destination);
 * // => { 1 => 1, 2 => 2, 3 => 3 }
 *
 * console.log(destination === map);
 * // => true
 * ```
 */
export function copyTo<K, V, M extends Map<K, V>>(
	source: Iterable<K> | Iterable<V> | Map<K, V>,
	destination: M,
): M;
export function copyTo<T, D extends unknown[] | Set<unknown> | Map<unknown, unknown>>(
	source: Iterable<T>,
	destination: D,
): D {
	if (Array.isArray(destination)) {
		for (const element of source) {
			destination.push(element);
		}
	} else if (destination instanceof Set) {
		for (const element of source) {
			destination.add(element);
		}
	} else if (destination instanceof Map) {
		if (source instanceof Map) {
			for (const [key, value] of source) {
				destination.set(key, value);
			}
		} else {
			for (const element of source) {
				destination.set(element, element);
			}
		}
	}

	return destination;
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("copyTo with array", () => {
		const destination: number[] = [];
		const array = copyTo([1, 2, 3], destination);

		expect(destination).toEqual([1, 2, 3]);
		expect(destination).toBe(array);
	});

	it("copyTo with set", () => {
		const destination = new Set<number>();
		const set = copyTo([1, 2, 3], destination);

		expect(destination).toEqual(new Set([1, 2, 3]));
		expect(destination).toBe(set);
	});

	it("copyTo with map", () => {
		const dest1 = new Map<string, number>();
		const map1 = copyTo(
			new Map([
				["1", 2],
				["3", 4],
			]),
			dest1,
		);

		expect(dest1).toEqual(
			new Map([
				["1", 2],
				["3", 4],
			]),
		);
		expect(dest1).toBe(map1);

		const dest2 = new Map<number, number>();
		const map2 = copyTo([1, 2, 3], dest2);

		expect(dest2).toEqual(
			new Map([
				[1, 1],
				[2, 2],
				[3, 3],
			]),
		);

		expect(dest2).toBe(map2);
	});
}
