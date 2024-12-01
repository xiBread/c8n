import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts"],
	format: "esm",
	dts: true,
	clean: true,
	minifySyntax: true,
	define: {
		"import.meta.vitest": "undefined",
	},
});
