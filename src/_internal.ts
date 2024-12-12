/**
 * Defers inference of an array type so that multiple arrays of different types
 * can be passed to rest parameters.
 *
 * @example
 * ```ts
 * declare function f<T>(...args: Iterable<T>[]): void;
 *
 * f([1, 2, 3], ["a"]);
 * //             ^-- Argument of type 'string[]' is not assignable ...
 *
 * declare function g<T extends unknown[]>(...args: Rest<T>): void;
 *
 * g([1, 2, 3], ["a"]);
 * // No error
 * ```
 */
export type Rest<T extends unknown[]> = { [K in keyof T]: Iterable<T[K]> };
