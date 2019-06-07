import stringify from './stringify';

export const name = '.clean-publish';

export const render = () => stringify({
	packageManager: 'yarn'
});

export function test(params) {
	return params.cleanPublish;
}
