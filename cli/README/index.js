import { readFileSync, writeFileSync } from 'node:fs';

const { npm_package_version, npm_lifecycle_event } = process.env;

if (npm_lifecycle_event !== 'version')
	throw new Error('Run `pnpm version` to bump the README.');

if (!npm_package_version) throw new TypeError('Version is not found.');

// On version 1.0 and higher, the regex should be updated.
const matchedVersion = npm_package_version.match(/^0\.[1-9]\d*(?=\.\d+$)/);
if (!matchedVersion) throw new Error('Major version is not found.');

const readMe =
	readFileSync('cli/README/intro.md', { encoding: 'utf8' }).replace(
		'bite-size@version',
		`bite-size@${matchedVersion[0]}`
	) +
	'\n' +
	readFileSync('cli/README/modules.md', { encoding: 'utf8' });

writeFileSync('README.md', readMe);
