import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { env } from 'node:process';

const path = join(import.meta.dirname, '../README.md');
existsSync(path);

const { npm_package_version: version } = env;
if (!version) throw new Error('npm_package_version is not set');

const majorVersion = version.match(/^([1-9]\d*|0\.\d+)/)?.at(0);
if (!majorVersion) throw new Error('major version cannot be determined');

writeFileSync(
	path,
	readFileSync(path, { encoding: 'utf8' }) //
		.replace(/@([1-9]\d*|0\.\d+)/g, `@${majorVersion}`),
);
