/**
 * Returns a 2D array containing the contents of {@link matrix} flipped over its
 * main diagonal. In other words, the resulting array is {@link matrix} with its
 * rows and columns indices swapped.
 *
 * @example
 * ```ts
 * import { transpose } from "c8n";
 *
 * const matrix = [
 * 	[1, 2, 3],
 * 	[4, 5, 6],
 * 	[7, 8, 9],
 * ];
 *
 * console.log(transpose(matrix));
 * // [
 * //   [1, 4, 7],
 * //   [2, 5, 8],
 * //   [3, 6, 9],
 * // ]
 * ```
 *
 * @example
 * With a matrix with differing row and column lengths:
 *
 * ```ts
 * import { transpose } from "c8n";
 *
 * const matrix = [
 * 	[1, 2],
 * 	[3, 4],
 * 	[5, 6],
 * ];
 *
 * console.log(transpose(matrix));
 * // [
 * //   [1, 3, 5],
 * //   [2, 4, 6],
 * // ]
 * ```
 */
export function transpose<T>(matrix: T[][]): T[][] {
	const transposed: T[][] = [];

	for (let y = 0; y < matrix[0].length; y++) {
		transposed[y] = [];

		for (let x = 0; x < matrix.length; x++) {
			transposed[y][x] = matrix[x][y];
		}
	}

	return transposed;
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("transpose with NxN matrix", () => {
		const matrix = [
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9],
		];

		expect(transpose(matrix)).toEqual([
			[1, 4, 7],
			[2, 5, 8],
			[3, 6, 9],
		]);
	});

	it("transpose with NxM matrix", () => {
		const matrix = [
			[1, 2],
			[3, 4],
			[5, 6],
		];

		expect(transpose(matrix)).toEqual([
			[1, 3, 5],
			[2, 4, 6],
		]);
	});
}
