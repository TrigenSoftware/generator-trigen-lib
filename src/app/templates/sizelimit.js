import stringify from './stringify';

export const name = '.size-limit';

export function render({
	type,
	rollup,
	publishAsRoot
}) {

	const isNode = type === 'node';
	const buildDir = publishAsRoot
		? 'package/'
		: 'lib/';
	const sizelimit = [{
		path:    `${buildDir}index.js`,
		limit:   '1 KB',
		webpack: false
	}];

	if (!isNode && rollup) {
		sizelimit.push({
			path:    `${buildDir}index.es.js`,
			limit:   '1 KB',
			webpack: false
		});
	}

	return stringify(sizelimit);
}

export function test(params) {
	return params.checkSize;
}
