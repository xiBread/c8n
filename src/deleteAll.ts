/**
 * Deletes the {@link elements} from the {@link set}.
 *
 * @returns A reference to the {@link set}.
 *
 * @example
 * ```ts
 * import { deleteAll } from "c8n";
 *
 * const set = new Set([1, 2, 3, 4, 5]);
 * const result = deleteAll(set, 1, 3, 5);
 *
 * console.log(set);
 * // => { 2, 4 }
 *
 * console.log(set === result);
 * // => true
 * ```
 */
export function deleteAll<T>(set: Set<T>, ...elements: T[]): Set<T> {
	for (const element of elements) {
		set.delete(element);
	}

	return set;
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("deleteAll", () => {
		const set = new Set([1, 2, 3, 4, 5]);
		const result = deleteAll(set, 1, 3, 5);

		expect(set).toEqual(new Set([2, 4]));
		expect(set === result).toBe(true);
	});
}
