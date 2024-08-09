import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['./index.js'],
	format: ['cjs', 'esm'],
	dts: true,
	clean: true,
});
