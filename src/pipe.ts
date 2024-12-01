type Fn<A, R> = (arg: A) => R;

export function pipe<A, B>(arg: A, f: Fn<A, B>): B;
export function pipe<A, B, C>(arg: A, f1: Fn<A, B>, f2: Fn<B, C>): C;
export function pipe<A, B, C, D>(arg: A, f1: Fn<A, B>, f2: Fn<B, C>, f3: Fn<C, D>): D;
export function pipe<A, B, C, D, E>(
	arg: A,
	f1: Fn<A, B>,
	f2: Fn<B, C>,
	f3: Fn<C, D>,
	f4: Fn<D, E>,
): E;
export function pipe<A, B, C, D, E, F>(
	arg: A,
	f1: Fn<A, B>,
	f2: Fn<B, C>,
	f3: Fn<C, D>,
	f4: Fn<D, E>,
	f5: Fn<E, F>,
): F;
export function pipe<A, B, C, D, E, F, G>(
	arg: A,
	f1: Fn<A, B>,
	f2: Fn<B, C>,
	f3: Fn<C, D>,
	f4: Fn<D, E>,
	f5: Fn<E, F>,
	f6: Fn<F, G>,
): G;
export function pipe<A, B, C, D, E, F, G, H>(
	arg: A,
	f1: Fn<A, B>,
	f2: Fn<B, C>,
	f3: Fn<C, D>,
	f4: Fn<D, E>,
	f5: Fn<E, F>,
	f6: Fn<F, G>,
	f7: Fn<G, H>,
): H;
export function pipe<A, B, C, D, E, F, G, H, I>(
	arg: A,
	f1: Fn<A, B>,
	f2: Fn<B, C>,
	f3: Fn<C, D>,
	f4: Fn<D, E>,
	f5: Fn<E, F>,
	f6: Fn<F, G>,
	f7: Fn<G, H>,
	f8: Fn<H, I>,
): I;
export function pipe<A, B, C, D, E, F, G, H, I, J>(
	arg: A,
	f1: Fn<A, B>,
	f2: Fn<B, C>,
	f3: Fn<C, D>,
	f4: Fn<D, E>,
	f5: Fn<E, F>,
	f6: Fn<F, G>,
	f7: Fn<G, H>,
	f8: Fn<H, I>,
	f9: Fn<I, J>,
): J;
export function pipe<A, B, C, D, E, F, G, H, I, J, K>(
	arg: A,
	f1: Fn<A, B>,
	f2: Fn<B, C>,
	f3: Fn<C, D>,
	f4: Fn<D, E>,
	f5: Fn<E, F>,
	f6: Fn<F, G>,
	f7: Fn<G, H>,
	f8: Fn<H, I>,
	f9: Fn<I, J>,
	f10: Fn<J, K>,
): K;
export function pipe(arg: unknown, ...fns: Fn<unknown, unknown>[]): unknown {
	let result = arg;

	for (const fn of fns) {
		result = fn(result);
	}

	return result;
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("pipe", () => {
		const add = (a: number) => (b: number) => a + b;
		const double = (x: number) => x * 2;
		const square = (x: number) => x * x;
		const halve = (x: number) => x / 2;

		expect(pipe(1, add(2), double, square)).toBe(36);
		expect(pipe(1, add(3), double, square, double)).toBe(128);
		expect(pipe(1, add(4), double, square, halve)).toBe(50);
	});
}
