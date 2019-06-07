/* eslint-disable import/no-dynamic-require */
import * as babel from './babel';
import * as browserslist from './browserslist';
import * as buildPackage from './buildPackage';
import * as changelog from './changelog';
import * as cleanpublish from './cleanpublish';
import * as editorconfig from './editorconfig';
import * as eslint from './eslint';
import * as gitignore from './gitignore';
import * as husky from './husky';
import * as jest from './jest';
import * as license from './license';
import * as lintstaged from './lintstaged';
import * as pkg from './package';
import * as readme from './readme';
import * as rollup from './rollup';
import * as sizelimit from './sizelimit';
import * as travis from './travis';
import * as trigenscripts from './trigenscripts';
import * as tsconfig from './tsconfig';
import * as tslint from './tslint';

const templates = [
	babel,
	browserslist,
	buildPackage,
	changelog,
	cleanpublish,
	editorconfig,
	eslint,
	gitignore,
	husky,
	jest,
	license,
	lintstaged,
	pkg,
	readme,
	rollup,
	sizelimit,
	travis,
	trigenscripts,
	tsconfig,
	tslint
];

export function getTemplates() {
	return templates.reduce((templates, _) => {

		const template = {
			..._
		};
		const {
			test,
			name,
			render
		} = template;

		if (!test) {
			template.test = params => ({
				[name]: render(params)
			});
		} else {
			template.test = (params) => {

				const result = test(params);

				if (result === true) {
					return {
						[name]: render(params)
					};
				}

				return result;
			};
		}

		templates.push(template);

		return templates;
	}, []);
}

export function render(params) {

	const templates = getTemplates();
	const rendered = templates.reduce((rendered, template) => {

		const result = template.test(params);

		if (result) {
			Object.assign(rendered, result);
		}

		return rendered;
	}, {});

	return rendered;
}
