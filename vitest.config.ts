import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		include: ["{test,src}/**/*.ts"],
		exclude: ["src/index.ts"],
		coverage: {
			enabled: true,
		},
	},
});
