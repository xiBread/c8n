/**
 * Produces a generator that yields tuples with {@link size} elements that are
 * subsequences of the {@link iterable} where order matters.
 *
 * @see {@link combinations}
 * @see {@link crossJoin}
 *
 * @example
 * ```ts
 * import { permutations } from "c8n";
 *
 * const iter = permutations("ABCD", 2);
 *
 * for (const permutation of iter) {
 * 	console.log(permutation);
 * }
 *
 * // => ["A", "B"]
 * // => ["A", "C"]
 * // => ["A", "D"]
 * // => ["B", "A"]
 * // => ["B", "C"]
 * // => ["B", "D"]
 * // => ["C", "A"]
 * // => ["C", "B"]
 * // => ["C", "D"]
 * // => ["D", "A"]
 * // => ["D", "B"]
 * // => ["D", "C"]
 * ```
 */
export function* permutations<T>(iterable: Iterable<T>, size?: number): Generator<T[]> {
	const array = Array.from(iterable);

	const n = array.length;
	const r = size ?? n;

	if (r < 0 || r > n) return;

	const indices = Array.from({ length: n }, (_, i) => i);
	const cycles = Array.from({ length: r }, (_, i) => n - i);

	const first = indices.slice(0, r);
	yield first.map((i) => array[i]);

	while (true) {
		let done = false;

		for (let i = r - 1; i >= 0; i--) {
			cycles[i]--;

			if (cycles[i] === 0) {
				indices.push(indices.splice(i, 1)[0]);
				cycles[i] = n - i;
			} else {
				const j = cycles[i];
				[indices[i], indices[n - j]] = [indices[n - j], indices[i]];

				const next = indices.slice(0, r);
				yield next.map((i) => array[i]);

				done = true;
				break;
			}
		}

		if (!done) return;
	}
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("permutations", () => {
		expect(permutations([0, 1, 2]).toArray()).toEqual([
			[0, 1, 2],
			[0, 2, 1],
			[1, 0, 2],
			[1, 2, 0],
			[2, 0, 1],
			[2, 1, 0],
		]);

		expect(permutations([0, 1, 2], 2).toArray()).toEqual([
			[0, 1],
			[0, 2],
			[1, 0],
			[1, 2],
			[2, 0],
			[2, 1],
		]);

		const zero = permutations([0, 1, 2], 0);
		expect(zero.next().value).toEqual([]);
		expect(zero.next().done).toBe(true);

		const empty = permutations([]);
		expect(empty.next().value).toEqual([]);
		expect(empty.next().done).toBe(true);

		expect(permutations([], -1).toArray()).toEqual([]);
		expect(permutations([], 1).toArray()).toEqual([]);
	});
}
