import {
	getValue
} from '../helpers';

const types = [
	{
		name:  'for node',
		value: 'node'
	},
	{
		name:  'for browser',
		value: 'browser'
	},
	{
		name:  'universal',
		value: 'universal'
	}
];
const langs = [
	{
		name:  'JavaScript',
		value: 'js'
	},
	{
		name:  'JavaScript with Babel',
		value: 'babel'
	},
	{
		name:  'TypeScript',
		value: 'ts'
	}
];

function indexOfType(_) {
	return types.findIndex(({ value }) => value === _);
}

function indexOfLang(_) {
	return langs.findIndex(({ value }) => value === _);
}

export default async function askForLibInfo(generator, props) {

	generator.log('Library info:');

	let libInfoPrompts = [{
		type:    'list',
		name:    'type',
		message: 'What kind of library it is?',
		choices: types,
		default: getValue(
			[props, 'type', indexOfType],
			0
		)
	}, {
		type:    'list',
		name:    'lang',
		message: 'Which language you want to use?',
		choices: langs,
		default: getValue(
			[props, 'lang', indexOfLang],
			0
		)
	}];
	const result = await generator.prompt(libInfoPrompts);

	if (result.lang !== 'js') {
		Object.assign(result, await generator.prompt([{
			type:    'confirm',
			name:    'rollup',
			message: 'Do you want to build a bundle using Rollup?',
			default: getValue(
				[props, 'rollup'],
				false
			)
		}]));
	} else {
		result.rollup = false;
		result.checkSize = false;
	}

	Object.assign(result, await generator.prompt([{
		type:    'confirm',
		name:    'jest',
		message: 'Do you want to run tests using Jest?',
		default: getValue(
			[props, 'jest'],
			false
		)
	}]));

	if (result.jest) {
		Object.assign(result, await generator.prompt([{
			type:    'confirm',
			name:    'coverage',
			message: 'Do you want to collect code coverege?',
			default: getValue(
				[props, 'coverage'],
				false
			)
		}]));
	} else {
		result.coverage = false;
	}

	libInfoPrompts = [{
		type:    'confirm',
		name:    'publishAsRoot',
		message: 'Do you want to publish "src" directory as package root?',
		default: getValue(
			[props, 'publishAsRoot'],
			false
		)
	}, {
		type:    'confirm',
		name:    'cleanPublish',
		message: 'Do you want to publish package by "clean" way?',
		default: getValue(
			[props, 'cleanPublish'],
			false
		)
	}, result.rollup && {
		type:    'confirm',
		name:    'checkSize',
		message: 'Do you want to run bundle size checks?',
		default: getValue(
			[props, 'checkSize'],
			false
		)
	}].filter(Boolean);

	Object.assign(result, await generator.prompt(libInfoPrompts));

	return result;
}
