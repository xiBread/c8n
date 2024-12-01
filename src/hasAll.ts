/**
 * Returns a boolean indicating if all of the {@link elements} are in the
 * {@link set}.
 *
 * @example
 * ```ts
 * import { hasAll } from "c8n";
 *
 * const set = new Set([1, 2, 3, "a", "b", "c"]);
 *
 * console.log(hasAll(set, 1, "b", 3));
 * // => true
 *
 * console.log(hasAll(set, "b", "c", "d"));
 * // => false
 * ```
 */
export function hasAll<T>(set: Set<T>, ...elements: T[]) {
	for (const element of elements) {
		if (!set.has(element)) return false;
	}

	return true;
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("hasAll", () => {
		const set = new Set([1, 2, 3, "a", "b", "c"]);

		expect(hasAll(set, 1, "b", 3)).toBe(true);
		expect(hasAll(set, "b", "c", "d")).toBe(false);
	});
}
