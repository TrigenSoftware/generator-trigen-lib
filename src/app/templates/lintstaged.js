import stringify from './stringify';

export const name = '.lintstagedrc';

export function render({
	type,
	lang
}) {

	const isConfig = type === 'config';
	const isTS = lang === 'ts';
	const lintstaged = isConfig ? {
		'**/*.js': ['trigen-scripts lint:js', 'git add']
	} : {
		'src/**/*.{js,jsx}': ['trigen-scripts lint:js', 'git add']
	};

	if (isTS) {
		lintstaged['src/**/*.{ts,tsx}'] = ['trigen-scripts lint:ts', 'git add'];
	}

	return stringify(lintstaged);
}
