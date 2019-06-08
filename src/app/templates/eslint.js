import stringify from './stringify';

export const name = '.eslintrc';

export function render({
	type
}) {

	let eslint = {
		extends: 'trigen/base'
	};

	switch (type) {

		case 'config':
			eslint = {
				extends: 'trigen/base',
				env:     {
					node: true
				},
				rules:   {
					'import/unambiguous': 'off'
				}
			};
			break;

		case 'node':
			eslint.env = {
				node: true
			};
			break;

		case 'browser':
			eslint.env = {
				browser: true
			};
			break;

		case 'jest':
			eslint = {
				plugins: ['jest'],
				env:     {
					'jest/globals': true
				},
				rules:   {
					'no-magic-numbers':     'off',
					'max-nested-callbacks': 'off'
				}
			};
			break;

		default:
	}

	return stringify(eslint);
}

export function test(params) {

	if (params.lang !== 'ts' && params.jest) {
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
