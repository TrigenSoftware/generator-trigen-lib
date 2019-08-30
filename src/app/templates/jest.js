import stringify from './stringify';

export const name = 'jest.config.json';

export function render({
	type,
	coverage
}) {

	const isBrowser = type === 'browser';
	const testEnvironment = isBrowser ? {} : {
		testEnvironment: 'node'
	};
	const jest = {
		...testEnvironment,
		testRegex: '/test/.*\\.spec\\.(jsx?|tsx?)$',
		transform: {
			'^.+\\.(jsx?|tsx?)$': 'babel-jest'
		}
	};

	if (coverage) {
		Object.assign(jest, {
			collectCoverage:     true,
			collectCoverageFrom: [
				'src/**/*.{js,jsx,ts,tsx}',
				'!**/*.d.ts',
				'!**/node_modules/**'
			],
			coverageReporters:   [
				'lcovonly',
				'text'
			]
		});
	}

	return stringify(jest);
}

export function test(params) {
	return params.jest;
}
