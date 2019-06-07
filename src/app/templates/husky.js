import stringify from './stringify';

export const name = '.huskyrc';

export const render = () => stringify({
	hooks: {
		'pre-commit': 'lint-staged',
		'pre-push':   'npm test'
	}
});
