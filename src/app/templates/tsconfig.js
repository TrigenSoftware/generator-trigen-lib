import stringify from './stringify';

export const name = 'tsconfig.json';

export function render({
	dev: isDev,
	...params
}) {

	const tsconfig = isDev
		? dev()
		: main(params);

	return stringify(tsconfig);
}

function dev() {
	return {
		compilerOptions: {
			module:                       'commonjs',
			moduleResolution:             'node',
			target:                       'es5',
			jsx:                          'preserve',
			noUnusedLocals:               true,
			noUnusedParameters:           true,
			noImplicitAny:                false,
			allowSyntheticDefaultImports: true,
			esModuleInterop:              true,
			resolveJsonModule:            true,
			experimentalDecorators:       true,
			emitDecoratorMetadata:        false,
			baseUrl:                      '.',
			lib:                          [
				'esnext'
			]
		}
	};
}

function main({
	type,
	publishAsRoot
}) {

	const isBrowser = type === 'browser';
	const buildDir = publishAsRoot
		? 'package/'
		: 'lib/';
	const tsconfig = {
		compilerOptions: {
			declaration:                  true,
			declarationMap:               true,
			module:                       'esnext',
			moduleResolution:             'node',
			target:                       'esnext',
			jsx:                          'preserve',
			noUnusedLocals:               true,
			noUnusedParameters:           true,
			noImplicitAny:                false,
			allowSyntheticDefaultImports: true,
			esModuleInterop:              true,
			resolveJsonModule:            true,
			experimentalDecorators:       true,
			emitDecoratorMetadata:        false,
			inlineSourceMap:              true,
			baseUrl:                      '.',
			lib:                          [
				'esnext',
				isBrowser && 'dom'
			].filter(Boolean)
		},
		include: [
			'src/index.ts'
		],
		exclude: [
			`${buildDir}**/*`
		]
	};

	return tsconfig;
}

export function test(params) {

	if (params.lang === 'ts') {
		return {
			[name]:              render(params),
			'tsconfig.dev.json': render({
				...params,
				dev: true
			})
		};
	}

	return false;
}
