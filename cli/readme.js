import { readFileSync, writeFileSync } from 'node:fs';
import { env } from 'node:process';

const { npm_package_version: version } = env;
if (!version) throw new TypeError('npm_package_version is not defined.');

const majorVersion = version.match(/^([1-9]\d*|0\.\d+)/)?.at(0);
if (!majorVersion) throw new Error('npm_package_version does not match SemVer.');

writeFileSync(
	'README.md',
	readFileSync('./README.md', { encoding: 'utf8' }).replace(
		/@([1-9]\d*|0\.\d+)/g,
		`@${majorVersion}`,
	),
);
