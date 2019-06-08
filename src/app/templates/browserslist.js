
export const name = '.browserslistrc';

export function render({
	type
}) {

	switch (type) {

		case 'browser':
			return 'extends browserslist-config-trigen/browsers\n';

		case 'node':
			return 'extends browserslist-config-trigen/node\n';

		default:
			return 'extends browserslist-config-trigen\n';
	}
}

export function test(params) {
	return params.lang !== 'js';
}
