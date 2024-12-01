/**
 * Produces a generator that yields the values returned by calling
 * {@link transform} on every element in the {@link iterable} and flattens any
 * nested iterables.
 *
 * @example
 * ```ts
 * import { flatMap } from "c8n";
 *
 * const words = ["foo", "bar", "baz"];
 *
 * const flattened = flatMap(words, (word) => word.split(""));
 * const joined = flattened.toArray().join("");
 *
 * console.log(joined);
 * // => "foobarbaz"
 * ```
 */
export function* flatMap<T, U>(
	iterable: Iterable<T>,
	transform: (element: T) => Iterable<U>,
): Generator<U> {
	yield* Iterator.from(iterable).flatMap(transform);
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("flatMap", () => {
		const words = ["foo", "bar", "baz"];

		const flattened = flatMap(words, (word) => word.split(""));
		const joined = flattened.toArray().join("");

		expect(joined).toBe("foobarbaz");
	});
}
