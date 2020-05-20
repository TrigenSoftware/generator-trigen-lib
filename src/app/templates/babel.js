import stringify from './stringify';

export const name = '.babelrc';

export function render({
	jest,
	lang
}) {

	const isTS = lang === 'ts';
	const babel = {
		exclude: 'node_modules/**',
		presets: [
			['babel-preset-trigen', {
				env: 'lib'
			}]
		]
	};

	if (jest) {

		const presetOptions = {
			env: 'jest'
		};

		if (isTS) {
			presetOptions.typescript = true;
		}

		babel.env = {
			test: {
				presets: [
					['babel-preset-trigen', presetOptions]
				]
			}
		};
	}

	return stringify(babel);
}

export function test(params) {
	return params.lang !== 'js';
}
