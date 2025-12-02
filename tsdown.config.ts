import { defineConfig } from 'tsdown';

export default defineConfig({
	entry: './index.ts',
	format: ['cjs', 'esm'],
	dts: true,
	clean: true,
	platform: 'neutral',
});
