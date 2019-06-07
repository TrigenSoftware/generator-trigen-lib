import stringify from './stringify';

export const name = 'jest.config.json';

export const render = () => stringify({
	testRegex:           '/test/.*\\.spec\\.(jsx?|tsx?)$',
	transform:           {
		'^.+\\.(jsx?|tsx?)$': 'babel-jest'
	},
	collectCoverage:     true,
	collectCoverageFrom: [
		'src/**/*.{ts,tsx}',
		'!**/*.d.ts',
		'!**/node_modules/**'
	],
	coverageReporters:   [
		'lcovonly',
		'text'
	]
});

export function test(params) {
	return params.jest;
}
