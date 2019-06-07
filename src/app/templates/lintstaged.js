import stringify from './stringify';

export const name = '.lintstagedrc';

export function render({
	lang
}) {

	const isTS = lang === 'ts';
	const lintstaged = {
		'src/**/*.{js,jsx}': ['trigen-scripts lint:js', 'git add']
	};

	if (isTS) {
		lintstaged['src/**/*.{ts,tsx}'] = ['trigen-scripts lint:ts', 'git add'];
	}

	return stringify(lintstaged);
}
