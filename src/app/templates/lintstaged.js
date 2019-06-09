import stringify from './stringify';

export const name = '.lintstagedrc';

export function render({
	type,
	lang
}) {

	const isConfig = type === 'config';
	const isTS = lang === 'ts';
	let lintstaged = {};

	switch (true) {

		case isConfig:
			lintstaged = {
				'**/*.js': ['trigen-scripts lint:js', 'git add']
			};
			break;

		case isTS:
			lintstaged = {
				'src/**/*.{ts,tsx}': ['trigen-scripts lint:ts', 'git add']
			};
			break;

		default:
			lintstaged = {
				'src/**/*.{js,jsx}': ['trigen-scripts lint:js', 'git add']
			};
			break;
	}

	return stringify(lintstaged);
}
