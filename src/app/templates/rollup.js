
export const name = 'rollup.config.js';

export function render({
	type,
	lang
}) {

	const isNode = type === 'node';
	const isTS = lang === 'ts';

	return `\
import {
	external
} from '@trigen/scripts-plugin-rollup/helpers';
${
	isTS
		? 'import tslint from \'rollup-plugin-tslint\';\n'
		: 'import { eslint } from \'rollup-plugin-eslint\';\n'
}\
import commonjs from 'rollup-plugin-commonjs';
${!isTS ? '' : 'import typescript from \'rollup-plugin-typescript2\';\n'}\
import babel from 'rollup-plugin-babel';
${!isTS ? '' : 'import { DEFAULT_EXTENSIONS } from \'@babel/core\';\n'}\
import pkg from './package.json';

const plugins = [
${isTS ? `\
	tslint({
		exclude:    ['**/*.json', 'node_modules/**'],
		throwError: true
	}),` : `\
	eslint({
		exclude:      ['**/*.json', 'node_modules/**'],
		throwOnError: true
	}),`
}
	commonjs(),
${isTS ? `\
	typescript(),
	babel({
		extensions: [
			...DEFAULT_EXTENSIONS,
			'ts',
			'tsx'
		],
		runtimeHelpers: true
	})` : `\
	babel({
		runtimeHelpers: true
	})`
}
];

export default {
	input:    'src/index.${isTS ? 'ts' : 'js'}',
	plugins,
	external: external(pkg, true),
${isNode ? `\
	output:   {
		file:      pkg.main,
		format:    'cjs',
		exports:   'named',
		sourcemap: 'inline'
	}` : `\
	output:   [{
		file:      pkg.main,
		format:    'cjs',
		exports:   'named',
		sourcemap: 'inline'
	}, {
		file:      pkg.module,
		format:    'es',
		sourcemap: 'inline'
	}]`
}
};
`;
}

export function test(params) {
	return params.rollup;
}
