
export const name = 'scripts/buildPackage.sh';

export function render({
	lang,
	rollup
}) {

	const isJS = lang === 'js';
	const isTS = lang === 'ts';

	if (isJS) {
		return `
#!/bin/bash

set -e

rm -rf package
cp -R src package
cp LICENSE package
cp package.json package
cp README.md package
`;
	}

	return rollup
		? `\
#!/bin/bash

set -e

trigen-scripts build
rm -rf package
mv lib package
cp LICENSE package
cp package.json package
cp README.md package
`
		: `\
#!/bin/bash

set -e

rm -rf package
cp -R src package
${!isTS ? '' : `\
tsc --rootDir src --outDir package
del 'package/**/*.{ts,tsx}' '!package/**/*.d.ts'
`}\
NODE_ENV=production babel ./package -d ./package -s inline
cp LICENSE package
cp package.json package
cp README.md package
`;
}

export function test(params) {
	return params.publishAsRoot;
}

