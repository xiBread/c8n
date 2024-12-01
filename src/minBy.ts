/**
 * Returns the smallest element from the values returned by calling
 * {@link selector} on every element in the {@link iterable}. If the
 * {@link iterable} is empty, returns `undefined`.
 *
 * @example
 * ```ts
 * import { maxBy } from "c8n";
 *
 * const points = [
 * 	{ x: 1, y: 6 },
 * 	{ x: 3, y: 2 },
 * 	{ x: 5, y: 4 },
 * ];
 *
 * const max = maxBy(points, (pt) => pt.x + pt.y);
 *
 * console.log(max);
 * // => { x: 5, y: 4 }
 * ```
 */
export function minOf<T>(
	iterable: Iterable<T>,
	selector: (element: T) => bigint | number,
): T | undefined {
	const iterator = iterable[Symbol.iterator]();

	let next = iterator.next();

	let min = next.value;
	let minVal = selector(min);

	while (!next.done) {
		next = iterator.next();
		if (next.done) break;

		const val = selector(next.value);

		if (val < minVal) {
			min = next.value;
			minVal = val;
		}
	}

	return min;
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("minOf with bigints", () => {
		const points = [
			{ x: 1n, y: 6n },
			{ x: 3n, y: 2n },
			{ x: 5n, y: 4n },
		];

		const min = minOf(points, (pt) => pt.x + pt.y);

		expect(min).toEqual({ x: 3n, y: 2n });
		expect(minOf([], () => 0)).toBeUndefined();
	});

	it("minOf with numbers", () => {
		const points = [
			{ x: 1, y: 6 },
			{ x: 3, y: 2 },
			{ x: 5, y: 4 },
		];

		const min = minOf(points, (pt) => pt.x + pt.y);

		expect(min).toEqual({ x: 3, y: 2 });
		expect(minOf([], () => 0)).toBeUndefined();
	});
}
