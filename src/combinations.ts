/**
 * Produces a generator that yields tuples with {@link size} elements that are
 * subsequences of the {@link iterable} where order does not matter.
 *
 * @see {@link crossJoin}
 * @see {@link permutations}
 *
 * @example
 * ```ts
 * import { combinations } from "c8n";
 *
 * const iter = combinations("ABCD", 2);
 *
 * for (const combination of iter) {
 * 	console.log(combination);
 * }
 *
 * // => ["A", "B"]
 * // => ["A", "C"]
 * // => ["A", "D"]
 * // => ["B", "C"]
 * // => ["B", "D"]
 * // => ["C", "D"]
 * ```
 */
export function* combinations<T>(iterable: Iterable<T>, size: number): Generator<T[]> {
	const array = Array.from(iterable);
	const n = array.length;

	if (size > n) return;

	function* backtrack(path: T[], start = 0): Generator<T[]> {
		if (path.length === size) {
			yield [...path];
			return;
		}

		for (let i = start; i < n; i++) {
			path.push(array[i]);
			yield* backtrack(path, i + 1);
			path.pop();
		}
	}

	yield* backtrack([]);
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("combinations", () => {
		expect(combinations("ABCD", 2).toArray()).toEqual([
			["A", "B"],
			["A", "C"],
			["A", "D"],
			["B", "C"],
			["B", "D"],
			["C", "D"],
		]);

		expect(combinations([], 0).toArray()).toEqual([[]]);
		expect(combinations([], 1).toArray()).toEqual([]);
	});
}
