/**
 * Returns an array of the {@link iterable} elements in a random order.
 *
 * @example
 * The output will differ every time; the output shown in the example is for
 * demonstration purposes.
 *
 * ```ts
 * import { shuffle } from "c8n";
 *
 * const numbers = [1, 2, 3, 4, 5];
 * const shuffled = shuffle(numbers);
 *
 * console.log(shuffled);
 * // => [3, 1, 5, 2, 4]
 * ```
 */
export function shuffle<T>(iterable: Iterable<T>): T[] {
	const array = Array.from(iterable);

	for (let i = array.length - 1; i--; ) {
		const j = (Math.random() * (i + 1)) | 0;
		[array[i], array[j]] = [array[j], array[i]];
	}

	return array;
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("shuffle", () => {
		const shuffled = shuffle([1, 2, 3]);

		expect(shuffled).toHaveLength(3);
		expect(shuffled).toEqual(expect.arrayContaining([1, 2, 3]));
	});
}
