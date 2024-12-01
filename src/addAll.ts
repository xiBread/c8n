/**
 * Adds the {@link elements} to the {@link set}.
 *
 * @returns A reference to the {@link set}.
 *
 * @example
 * ```ts
 * import { addAll } from "c8n";
 *
 * const set = new Set([1, 2, 3]);
 * const result = addAll(set, 4, 5, 6);
 *
 * console.log(set);
 * // => { 1, 2, 3, 4, 5, 6 }
 *
 * console.log(set === result);
 * // => true
 * ```
 */
export function addAll<T>(set: Set<T>, ...elements: T[]): Set<T> {
	for (const element of elements) {
		set.add(element);
	}

	return set;
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("addAll", () => {
		const set = new Set([1, 2, 3]);
		const result = addAll(set, 4, 5, 6);

		expect(set).toEqual(new Set([1, 2, 3, 4, 5, 6]));
		expect(set === result).toBe(true);
	});
}
