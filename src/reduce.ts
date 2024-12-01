/**
 * Returns a single value by calling {@link operation} on every element in the
 * the {@link iterable}. The initial accumulator value is the first element in
 * the {@link iterable}.
 *
 * @throws {TypeError} Thrown if the {@link iterable} is empty.
 *
 * @example
 * ```ts
 * import { reduce } from "c8n";
 *
 * const sum = reduce([1, 2, 3], (acc, val) => acc + val);
 *
 * console.log(sum);
 * // => 6
 * ```
 */
export function reduce<T>(iterable: Iterable<T>, operation: (accumulator: T, value: T) => T): T;

/**
 * Returns a single value by calling {@link operation} on every element in the
 * the {@link iterable}. The {@link initialValue} is used as the initial
 * accumulator value.
 *
 * @throws {TypeError} Thrown if the {@link iterable} is empty with no {@link initialValue}.
 *
 * @example
 * ```ts
 * import { reduce } from "c8n";
 *
 * const sum = reduce([1, 2, 3], (acc, val) => acc + val, 4);
 *
 * console.log(sum);
 * // => 10
 * ```
 */
export function reduce<T>(
	iterable: Iterable<T>,
	operation: (accumulator: T, value: T) => T,
	initialValue: T,
): T;

/**
 * Returns a single value by calling {@link operation} on every element in the
 * the {@link iterable}. The {@link initialValue} is used as the initial
 * accumulator value.
 *
 * @throws {TypeError} Thrown if the {@link iterable} is empty with no {@link initialValue}.
 *
 * @example
 * ```ts
 * import { reduce } from "c8n";
 *
 * const sum = reduce([1, 2, 3], (acc, val) => acc + val, 4);
 *
 * console.log(sum);
 * // => 10
 * ```
 */
export function reduce<T, U>(
	iterable: Iterable<T>,
	operation: (accumulator: U, value: T) => U,
	initialValue: U,
): U;
export function reduce<T>(
	iterable: Iterable<T>,
	operation: (accumulator: T, value: T) => T,
	initialValue?: T,
): T {
	const iterator = iterable[Symbol.iterator]();

	let next = iterator.next();
	let accumulator: T;

	if (initialValue !== undefined) {
		accumulator = initialValue;
	} else {
		if (next.done) {
			throw new TypeError("Reduce of a done iterator with no initial value");
		}

		accumulator = next.value;
		next = iterator.next();
	}

	while (!next.done) {
		accumulator = operation(accumulator, next.value);
		next = iterator.next();
	}

	return accumulator;
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("reduce", () => {
		expect(reduce([1, 2, 3], (a, b) => a + b)).toBe(6);
		expect(reduce([1, 2, 3], (a, b) => a + b, 4)).toBe(10);
	});

	it("reduce throws with empty iterable", () => {
		expect(() => reduce([], () => {})).toThrow("done iterator");
		expect(() => reduce([], () => 0, 0)).not.toThrow("done iterator");
	});
}
