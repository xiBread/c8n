/**
 * Calls the {@link fn} on every element in the {@link iterable}.
 *
 * @example
 * ```ts
 * import { forEach } from "c8n";
 *
 * const numbers = [1, 2, 3, 4, 5];
 * const doubled: number[] = [];
 *
 * forEach(numbers, (x) => doubled.push(x * 2));
 *
 * console.log(doubled);
 * // => [2, 4, 6, 8, 10]
 * ```
 */
export function forEach<T>(iterable: Iterable<T>, fn: (element: T) => void): void {
	for (const element of iterable) fn(element);
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("forEach", () => {
		const numbers = [1, 2, 3, 4, 5];
		const doubled: number[] = [];

		forEach(numbers, (x) => doubled.push(x * 2));

		expect(doubled).toEqual([2, 4, 6, 8, 10]);
	});
}
