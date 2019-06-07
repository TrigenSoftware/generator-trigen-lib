import stringify from './stringify';

export const name = '.size-limit';

export function render({
	rollup,
	publishAsRoot
}) {

	const buildDir = publishAsRoot
		? 'package/'
		: 'lib/';
	const sizelimit = [{
		path:  `${buildDir}index.js`,
		limit: '1 KB'
	}];

	if (rollup) {
		sizelimit.push({
			path:  `${buildDir}index.es.js`,
			limit: '1 KB'
		});
	}

	return stringify(sizelimit);
}

export function test(params) {
	return params.checkSize;
}
