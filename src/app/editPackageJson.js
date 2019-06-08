
import {
	getValue
} from './helpers';

export default function editPackageJson(projectPkg, pkgProps) {

	const pkg = {
		...(projectPkg || {}),
		...(pkgProps || {})
	};

	pkg.repository = getValue(
		[projectPkg, 'repository', 'url'],
		[projectPkg, 'repository'],
		[pkgProps, 'repository'],
		''
	).replace(/\.[^/]*$/, '');

	return pkg;
}
