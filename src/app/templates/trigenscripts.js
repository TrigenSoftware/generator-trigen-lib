import stringify from './stringify';

export const name = '.trigenscriptsrc';
export const scriptsVersion = '4';

export function scripts({
	type,
	lang,
	jest,
	rollup,
	checkSize
}) {

	const isConfig = type === 'config';
	const isBabel = lang === 'babel';
	const isTS = lang === 'ts';
	const scripts = [
		isConfig ? [
			'@trigen/scripts-plugin-eslint',
			{
				lint: '**/*.js'
			}
		] : '@trigen/scripts-plugin-eslint',
		jest && '@trigen/scripts-plugin-jest',
		(isBabel || isTS) && '@trigen/scripts-plugin-babel',
		isTS && '@trigen/scripts-plugin-typescript',
		rollup && '@trigen/scripts-plugin-rollup',
		'@trigen/scripts-preset-lib',
		checkSize && '@trigen/scripts-plugin-size-limit'
	].filter(Boolean);

	return scripts;
}

export function render(params) {

	const isTS = params.lang === 'ts';
	const trigenscripts = scripts(params);
	const renderScripts = isTS
		? trigenscripts.filter(_ => _ !== '@trigen/scripts-plugin-eslint')
		: trigenscripts;

	return stringify(renderScripts);
}
