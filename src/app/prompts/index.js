import askForEditPackage from './editPackage';
import askForLibInfo from './libInfo';
import askForGitInit from './gitInit';

const asks = [
	askForEditPackage,
	askForLibInfo,
	askForGitInit
];

export default async function prompts(generator, pkg) {

	const props = generator.config.getAll();

	for (const ask of asks) {
		Object.assign(props, await ask(generator, props, pkg));
	}

	generator.config.set(props);
	generator.config.save();

	return props;
}
