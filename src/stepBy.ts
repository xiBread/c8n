/**
 * Produces a generator that yields the elements from the {@link iterable} while
 * skipping over {@link step} elements. The first element of the
 * {@link iterable} will always be yielded regardless of the given {@link step}.
 *
 * @throws {RangeError} Thrown if {@link step} is `NaN` less than or equal to `0`.
 *
 * @example
 * ```ts
 * import { stepBy } from "c8n";
 *
 * const numbers = [0, 1, 2, 3, 4, 5];
 * const iter = stepBy(numbers, 2);
 *
 * console.log(iter.toArray());
 * // => [0, 2, 4]
 * ```
 */
export function* stepBy<T>(iterable: Iterable<T>, step: number): Generator<T> {
	if (step <= 0 || Number.isNaN(step)) {
		throw new RangeError("'step' must be greater than 0");
	}

	let i = 0;

	for (const element of iterable) {
		if (i % step === 0) {
			yield element;
		}

		i++;
	}
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("stepBy", () => {
		const numbers = [0, 1, 2, 3, 4, 5];
		const iter = stepBy(numbers, 2);

		expect(iter.toArray()).toEqual([0, 2, 4]);
	});

	it("stepBy throws with invalid step", () => {
		expect(() => stepBy([], 0).toArray()).toThrow("'step'");
		expect(() => stepBy([], -1).toArray()).toThrow("'step'");
		expect(() => stepBy([], Number.NaN).toArray()).toThrow("'step'");
	});
}
