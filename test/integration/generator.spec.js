/* eslint-disable import/unambiguous */
const path = require('path');
const fs = require('fs');
const {
	execSync
} = require('child_process');
const chalk = require('chalk');
const del = require('del');

const YO_RC = '.yo-rc.json';
const SANDBOX_PATH = path.join(__dirname, 'sandbox');
const LIB_PATH = path.join(SANDBOX_PATH, 'my-lib');
const shouldLeave = process.argv.includes('--leave');

function cleanup() {
	del.sync([path.join(SANDBOX_PATH, 'node_modules')]);
	del.sync([path.join(SANDBOX_PATH, 'yarn.lock')]);
	del.sync([LIB_PATH]);
}

try {

	console.log(chalk.blue('\n> Cleaning...\n'));

	cleanup();

	console.log(chalk.blue('\n> Creating `my-lib` directory...\n'));

	fs.mkdirSync(LIB_PATH);
	fs.copyFileSync(
		path.join(SANDBOX_PATH, YO_RC),
		path.join(LIB_PATH, YO_RC)
	);

	console.log(chalk.blue('\n> Installing sandbox dependencies...\n'));

	execSync('yarn', {
		stdio: 'inherit',
		cwd:   SANDBOX_PATH
	});

	console.log(chalk.blue('\n> Generating...\n'));

	execSync(`yarn yo my-lib -S --skip-install`, {
		stdio: 'inherit',
		cwd:   SANDBOX_PATH
	});

} finally {

	if (!shouldLeave) {
		console.log(chalk.blue('\n> Cleaning...\n'));
		cleanup();
	}
}
