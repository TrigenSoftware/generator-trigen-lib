import stringify from './stringify';

export const name = 'tslint.json';

export function render({
	type
}) {

	let tslint = null;

	switch (type) {

		case 'jest':
			tslint = {
				extends: '../tslint.json',
				rules:   {
					'no-magic-numbers': false
				}
			};
			break;

		default:
			tslint = {
				extends: 'tslint-config-trigen/base'
			};
	}

	return stringify(tslint);
}

export function test(params) {

	if (params.lang !== 'ts') {
		return false;
	}

	if (params.jest) {
		return {
			[name]:           render(params),
			[`test/${name}`]: render({
				...params,
				type: 'jest'
			})
		};
	}

	return true;
}
