import stringify from './stringify';
import {
	scripts,
	scriptsVersion
} from './trigenscripts';

export const name = 'package.json';

export function render({
	rewriteScripts,
	pkg: {
		name,
		version,
		description,
		author,
		repository,
		...pkg
	},
	publishAsRoot,
	lang,
	type,
	rollup,
	jest,
	checkSize,
	coverage,
	cleanPublish
}) {

	const isTS = lang === 'ts';
	const isConfig = type === 'config';
	const isJS = lang === 'js';
	const isBrowser = type === 'browser';
	const isNode = type === 'node';
	const packageJson = {
		name,
		version,
		description,
		author,
		license: 'MIT'
	};

	packageJson.repository = {
		type: 'git',
		url:  repository
	};
	packageJson.bugs = {
		url: /^http/.test(repository)
			? `${repository}/issues`
			: ''
	};

	if (pkg.os) {
		packageJson.os = pkg.os;
	}

	const publishDir = publishAsRoot || isConfig
		? ''
		: 'lib/';

	packageJson.main = `${publishDir}index.js`;

	if (!isNode && rollup) {
		packageJson.module = `${publishDir}index.es.js`;
	}

	if (isTS) {
		packageJson.types = `${publishDir}index.d.ts`;
	}

	if (!isBrowser) {
		packageJson.engines = {
			node: '>=8.0.0'
		};
	}

	packageJson.scripts = {
		lint: 'trigen-scripts lint'
	};

	if (jest) {
		packageJson.scripts.jest = 'trigen-scripts jest';
	}

	if (checkSize) {
		packageJson.scripts.checkSize = 'trigen-scripts checkSize';
	}

	packageJson.scripts.test = 'trigen-scripts test';

	if (isTS) {
		packageJson.scripts['build:docs'] = 'trigen-scripts build:docs';
	}

	if (!isJS) {
		packageJson.scripts.start = 'trigen-scripts start';
	}

	if (publishAsRoot) {
		packageJson.scripts.build = './scripts/buildPackage.sh';
		packageJson.scripts.prepublishOnly = 'if [ -f .gitignore ]; then exit 1; fi';
	} else
	if (!isJS) {
		packageJson.scripts.build = 'trigen-scripts build';
	}

	if (cleanPublish) {
		packageJson.scripts.cleanPublish = publishAsRoot
			? 'trigen-scripts cleanPublish ./package'
			: 'trigen-scripts cleanPublish';
	} else
	if (!publishAsRoot) {
		packageJson.scripts.prepublishOnly = 'trigen-scripts test';
	}

	if (coverage) {
		packageJson.scripts.coverage = 'cat ./coverage/lcov.info | coveralls';
	}

	if (pkg.scripts && !rewriteScripts) {
		Object.assign(packageJson.scripts, pkg.scripts);
	}

	packageJson.keywords = pkg.keywords || [];

	if (pkg.peerDependencies) {
		packageJson.peerDependencies = pkg.peerDependencies;
	}

	if (pkg.dependencies) {
		packageJson.dependencies = pkg.dependencies;
	}

	packageJson.devDependencies = scripts({
		lang,
		jest,
		rollup,
		checkSize
	}).reduce((scripts, plugin) => {
		scripts[plugin] = scriptsVersion;
		return scripts;
	}, {
		'@trigen/scripts': scriptsVersion
	});

	if (isTS) {

		if (rollup) {
			packageJson.devDependencies['rollup-plugin-tslint'] = '^0.2.2';
			packageJson.devDependencies['rollup-plugin-typescript2'] = '^0.21.0';
		} else {
			packageJson.devDependencies['del-cli'] = '^1.1.0';
		}

	} else {

		if (rollup) {
			packageJson.devDependencies['rollup-plugin-eslint'] = '^6.0.0';
		}

		if (jest) {
			packageJson.devDependencies['eslint-plugin-jest'] = '^22.6.4';
		}
	}

	if (pkg.devDependencies) {
		Object.assign(packageJson.devDependencies, pkg.devDependencies);
	}

	if (!publishAsRoot && !isConfig) {
		packageJson.files = ['lib'];
	}

	if (pkg.files) {
		packageJson.files = pkg.files;
	}

	return stringify(packageJson, '  ');
}
