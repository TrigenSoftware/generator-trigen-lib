import stringify from './stringify';

export const name = '.trigenscriptsrc';
export const scriptsVersion = '2';

export function scripts({
	type,
	lang,
	jest,
	rollup,
	checkSize
}) {

	const isConfig = type === 'config';
	const isBabel = lang === 'babel';
	const isJS = lang === 'js' || isBabel;
	const isTS = lang === 'ts';
	const scripts = [
		(isBabel || isTS) && '@trigen/scripts-plugin-babel',
		isJS && (
			isConfig
				? [
					'@trigen/scripts-plugin-eslint',
					{
						lint: '**/*.js'
					}
				]
				: '@trigen/scripts-plugin-eslint'
		),
		jest && '@trigen/scripts-plugin-jest',
		rollup && '@trigen/scripts-plugin-rollup',
		isTS && '@trigen/scripts-plugin-typescript',
		'@trigen/scripts-preset-lib',
		checkSize && '@trigen/scripts-plugin-size-limit'
	].filter(Boolean);

	return scripts;
}

export function render(params) {

	const trigenscripts = scripts(params);

	return stringify(trigenscripts);
}
