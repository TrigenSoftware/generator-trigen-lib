
export const name = 'README.md';

export function render({
	pkg: {
		name,
		description,
		repository
	},
	type,
	coverage
}) {

	const isNode = type === 'node';
	const shieldName = repository.replace(/.*\/\/[^/]*\//, '');

	return `\
# ${name}

[![NPM version][npm]][npm-url]
${!isNode ? '' : '[![Node version][node]][node-url]\n'}\
[![Dependency status][deps]][deps-url]
[![Build status][build]][build-url]
${!coverage ? '' : '[![Coverage status][coverage]][coverage-url]\n'}\
[![Greenkeeper badge][greenkeeper]][greenkeeper-url]

[npm]: https://img.shields.io/npm/v/${name}.svg
[npm-url]: https://npmjs.com/package/${name}
\
${!isNode ? '' : `
[node]: https://img.shields.io/node/v/${name}.svg
[node-url]: https://nodejs.org
`}\

[deps]: https://david-dm.org/${shieldName}.svg
[deps-url]: https://david-dm.org/${shieldName}

[build]: http://img.shields.io/travis/com/${shieldName}.svg
[build-url]: https://travis-ci.com/${shieldName}
\
${!coverage ? '' : `
[coverage]: https://img.shields.io/coveralls/${shieldName}.svg
[coverage-url]: https://coveralls.io/r/${shieldName}
`}\

[greenkeeper]: https://badges.greenkeeper.io/${shieldName}.svg
[greenkeeper-url]: https://greenkeeper.io/

${description}

> This project generated with [generator-trigen-lib](https://www.npmjs.com/package/generator-trigen-lib)
`;
}
