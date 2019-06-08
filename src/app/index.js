import Generator from 'yeoman-generator';
import chalk from 'chalk';
import yosay from 'yosay';
import {
	hasYarn,
	gitInit
} from './helpers';
import prompts from './prompts';
import editPackageJson from './editPackageJson';
import {
	render
} from './templates';

export default class GeneratorTrigenLib extends Generator {

	constructor(args, opts) {

		super(args, opts);

		this.argument('projectDirectory', {
			description: 'Project directory to create',
			optional:    true,
			default:     false
		});

		this.option('silent', {
			description: 'Run generator without prompts, using defaults from .yo-rc.json',
			alias:       'S',
			default:     false
		});

		this.props = {};

		this._changeDestinationRoot();
	}

	_changeDestinationRoot() {

		const [
			projectDirectory
		] = this.arguments;

		if (projectDirectory) {
			this.destinationRoot(
				this.destinationPath(projectDirectory)
			);
		}
	}

	_package() {

		const pathToPkg = this.destinationPath('package.json');

		if (this.fs.exists(pathToPkg)) {
			return this.fs.readJSON(pathToPkg);
		}

		return false;
	}

	async prompting() {

		this.log(
			yosay(`Welcome to the delightful ${chalk.green('trigen-lib')} generator!`)
		);

		const { silent } = this.options;
		const pkgOrNot = this._package();

		if (silent) {

			const props = this.config.getAll();

			if (!Object.keys(props).length) {
				throw new Error(chalk.red('`.yo-rc.json` file not found.'));
			}

			this.props = props;
		} else {
			this.props = await prompts(this, pkgOrNot);
		}

		if (pkgOrNot) {
			this.props.pkg = editPackageJson(pkgOrNot, this.props.pkg);
		}
	}

	async writing() {

		const {
			props
		} = this;
		const files = render(props);

		Object.entries(files).forEach(([
			path,
			content
		]) => {
			this.fs.write(
				this.destinationPath(path),
				content
			);
		});
	}

	async _gitInit() {

		if (this.props.gitInit) {
			await gitInit(this.destinationRoot());
		}
	}

	async install() {

		await this._gitInit();

		const withYarn = await hasYarn();

		if (withYarn) {
			this.yarnInstall();
		} else {
			this.npmInstall();
		}
	}
}
