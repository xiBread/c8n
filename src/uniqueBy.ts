// Implementation taken from the proposal
// https://github.com/tc39/proposal-iterator-unique

const isZero = (arg: unknown): arg is 0 => arg === 0;
const isObj = (arg: unknown): arg is object => Object(arg) === arg;

/**
 * Produces a generator that yields the unique elements of the {@link iterable}
 * according to values returned by the {@link selector}.
 *
 * @see {@link unique}
 *
 * @example
 * ```ts
 * import { uniqueBy } from "c8n";
 *
 * const names = ["Alice", "Bob", "Charlie", "Kim", "Steve"];
 * const iter = uniqueBy(names, (name) => name.length);
 *
 * console.log(iter.toArray());
 * // => ["Alice", "Bob", "Charlie"]
 * ```
 */
export function* uniqueBy<T>(
	iterable: Iterable<T>,
	selector: (element: T) => unknown,
): Generator<T> {
	const objSeen = new WeakSet();
	const primSeen = new Set();

	let seenNegZero = false;

	for (const element of iterable) {
		const value = selector(element);

		if (isZero(value) && 1 / value < 0) {
			if (!seenNegZero) {
				seenNegZero = true;
				yield element;
			}
		} else if (isObj(value)) {
			if (!objSeen.has(value)) {
				objSeen.add(value);
				yield element;
			}
		} else if (!primSeen.has(value)) {
			primSeen.add(value);
			yield element;
		}
	}
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("uniqueBy", () => {
		const names = ["Alice", "Bob", "Charlie", "Kim", "Steve"];
		const iter = uniqueBy(names, (name) => name.length);

		expect(iter.next().value).toBe("Alice");
		expect(iter.next().value).toBe("Bob");
		expect(iter.next().value).toBe("Charlie");
		expect(iter.next().done).toBe(true);
	});

	it("uniqueBy with mixed types", () => {
		const a = {};
		const b = Object.create(null);
		const c = Symbol("");
		const d = Symbol.for("uniqueBy");
		const e = Symbol.iterator;
		const f = () => {};
		const g = 0;
		const h = -0;
		const i = 1;

		const iter = uniqueBy([a, a, b, b, c, c, d, d, e, e, f, f, g, g, h, h, i, i], (x) => x);

		expect(iter.toArray()).toEqual([a, b, c, d, e, f, g, h, i]);
	});
}
