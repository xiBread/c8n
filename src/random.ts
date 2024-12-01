/**
 * Returns a random element from the {@link iterable}.
 *
 * @example
 * The output will differ every time; the output shown in the example is for
 * demonstration purposes.
 *
 * ```ts
 * import { random } from "c8n";
 *
 * const numbers = [1, 2, 3, 4, 5];
 *
 * console.log(random(numbers));
 * // => 3
 * ```
 */
export function random<T>(iterable: Iterable<T>): T;

/**
 * Returns the {@link count} amount of random elements from the
 * {@link iterable}.
 *
 * @example
 * The output will differ every time; the output shown in the example is for
 * demonstration purposes.
 *
 * ```ts
 * import { random } from "c8n";
 *
 * const numbers = [1, 2, 3, 4, 5];
 *
 * console.log(random(numbers, 3));
 * // => [1, 5, 2];
 * ```
 */
export function random<T>(iterable: Iterable<T>, count: number): T[];
export function random<T>(iterable: Iterable<T>, count = 1): T | T[] {
	const array = Array.from(iterable);
	const randoms: T[] = [];

	for (let i = 0; i < count; i++) {
		randoms.push(array[(Math.random() * array.length) | 0]);
	}

	return count === 1 ? randoms[0] : randoms;
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("random", () => {
		const numbers = [1, 2, 3, 4, 5];
		const rand = random(numbers);
		const randoms = random(numbers, 3);

		expect(numbers).toContain(rand);
		expect(randoms).toHaveLength(3);
		expect(numbers).toEqual(expect.arrayContaining(randoms));
	});
}
