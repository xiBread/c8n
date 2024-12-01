import { stepBy } from "./";

/**
 * Produces a generator that yields values infinitely starting from
 * {@link start} by a step of `1n`. In other words, yields all values within
 * `start <= x < Infinity`.
 *
 * Use {@link stepBy} to specify a different step.
 *
 * @see {@link stepBy}
 *
 * @example
 * ```ts
 * import { range } from "c8n";
 *
 * const iter = range(1000n);
 *
 * console.log(iter.take(5).toArray());
 * // => [1000n, 1001n, 1002n, 1003n, 1004n]
 * ```
 */
export function range(start: bigint): Generator<bigint>;

/**
 * Produces a generator that yields the values from {@link start} up to but not
 * including {@link end} by a step of `1n`. In other words, yields all values
 * within `start <= x < end`.
 *
 * Supports decreasing ranges i.e. `start >= x > end`. Use {@link stepBy} to
 * specify a different step.
 *
 * @see {@link stepBy}
 *
 * @example
 * ```ts
 * import { range } from "c8n";
 *
 * const iter = range(0n, 5n);
 *
 * console.log(iter.toArray());
 * // => [0n, 1n, 2n, 3n, 4n]
 * ```
 *
 * @example
 * Creating a decreasing range:
 *
 * ```ts
 * import { range } from "c8n";
 *
 * const iter = range(5n, 0n);
 *
 * console.log(iter.toArray());
 * // => [5n, 4n, 3n, 2n, 1n]
 * ```
 */
export function range(start: bigint, end: bigint): Generator<bigint>;

/**
 * Produces a generator that yields values infinitely starting from
 * {@link start} by a step of `1`. In other words, yields all values within
 * `start <= x < Infinity`.
 *
 * Use {@link stepBy} to specify a different step.
 *
 * @see {@link stepBy}
 *
 * @example
 * ```ts
 * import { range } from "c8n";
 *
 * const iter = range(1000);
 *
 * console.log(iter.take(5).toArray());
 * // => [1000, 1001, 1002, 1003, 1004]
 * ```
 */
export function range(start: number): Generator<number>;

/**
 * Produces a generator that yields the values from {@link start} up to but not
 * including {@link end} by a step of `1`. In other words, yields all values
 * within `start <= x < end`.
 *
 * Supports decreasing ranges i.e. `start >= x > end`. Use {@link stepBy} to
 * specify a different step.
 *
 * @see {@link stepBy}
 *
 * @example
 * ```ts
 * import { range } from "c8n";
 *
 * const iter = range(0, 5);
 *
 * console.log(iter.toArray());
 * // => [0, 1, 2, 3, 4]
 * ```
 *
 * @example
 * Creating a decreasing range:
 *
 * ```ts
 * import { range } from "c8n";
 *
 * const iter = range(5, 0);
 *
 * console.log(iter.toArray());
 * // => [5, 4, 3, 2, 1]
 * ```
 */
export function range(start: number, end: number): Generator<number>;
export function* range<T extends bigint | number>(start: T, end?: T): Generator<T> {
	if (typeof end !== "undefined" && start > end) {
		for (let i = start; i > end; i--) {
			yield i;
		}
	} else {
		for (let i = start; end ? i < end : true; i++) {
			yield i;
		}
	}
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("range", () => {
		expect(range(0n, 5n).toArray()).toEqual([0n, 1n, 2n, 3n, 4n]);
		expect(range(0, 5).toArray()).toEqual([0, 1, 2, 3, 4]);

		expect(range(5n, 0n).toArray()).toEqual([5n, 4n, 3n, 2n, 1n]);
		expect(range(5, 0).toArray()).toEqual([5, 4, 3, 2, 1]);

		expect(range(1000n).take(5).toArray()).toEqual([1000n, 1001n, 1002n, 1003n, 1004n]);
		expect(range(1000).take(5).toArray()).toEqual([1000, 1001, 1002, 1003, 1004]);

		expect(stepBy(range(0, 10), 2).toArray()).toEqual([0, 2, 4, 6, 8]);
	});
}
