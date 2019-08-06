
export const name = 'README.md';

export function render({
	pkg: {
		name,
		description,
		repository,
		peerDependencies
	},
	type,
	lang,
	coverage
}) {

	const isConfig = type === 'config';
	const isNode = type === 'node';
	const isTS = lang === 'ts';
	const shieldName = repository.replace(/.*\/\/[^/]*\//, '');
	const [
		organization,
		project
	] = shieldName.toLowerCase().split('/');

	return `\
# ${name}

[![NPM version][npm]][npm-url]
${!isNode && !isConfig ? '' : '[![Node version][node]][node-url]\n'}\
${!peerDependencies ? '' : '[![Peer dependencies status][peer-deps]][peer-deps-url]\n'}\
[![Dependencies status][deps]][deps-url]
[![Build status][build]][build-url]
${!coverage ? '' : '[![Coverage status][coverage]][coverage-url]\n'}\
[![Dependabot badge][dependabot]][dependabot-url]
${!isTS ? '' : '[![Documentation badge][documentation]][documentation-url]\n'}\

[npm]: https://img.shields.io/npm/v/${name}.svg
[npm-url]: https://npmjs.com/package/${name}
\
${!isNode && !isConfig ? '' : `
[node]: https://img.shields.io/node/v/${name}.svg
[node-url]: https://nodejs.org
`}\
\
${!peerDependencies ? '' : `
[peer-deps]: https://david-dm.org/${shieldName}/peer-status.svg
[peer-deps-url]: https://david-dm.org/${shieldName}?type=peer
`}\

[deps]: https://david-dm.org/${shieldName}.svg
[deps-url]: https://david-dm.org/${shieldName}

[build]: http://img.shields.io/travis/com/${shieldName}/master.svg
[build-url]: https://travis-ci.com/${shieldName}
\
${!coverage ? '' : `
[coverage]: https://img.shields.io/coveralls/${shieldName}.svg
[coverage-url]: https://coveralls.io/r/${shieldName}
`}\

[dependabot]: https://api.dependabot.com/badges/status?host=github&repo=${shieldName}
[dependabot-url]: https://dependabot.com/
\
${!isTS ? '' : `
[documentation]: https://img.shields.io/badge/API-Documentation-2b7489.svg
[documentation-url]: https://${organization}.github.io/${project}
`}\

${description}

> This project generated with [generator-trigen-lib](https://www.npmjs.com/package/generator-trigen-lib)
`;
}
