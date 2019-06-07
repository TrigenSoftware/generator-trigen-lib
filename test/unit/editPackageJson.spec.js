import editPackageJson from '../../src/app/editPackageJson';

describe('editPackageJson', () => {

	it('should handle only package data', () => {

		const pkg = {
			test: 123
		};

		expect(
			editPackageJson(pkg, null)
		).toEqual({
			...pkg,
			repository: ''
		});
	});

	it('should handle only props data', () => {

		const props = {
			foo: 'str'
		};

		expect(
			editPackageJson(null, props)
		).toEqual({
			...props,
			repository: ''
		});
	});

	it('should set repository', () => {

		const pkg = {
			license:    'private',
			repository: {
				type: 'git',
				url:  'http://someUrl'
			}
		};

		expect(
			editPackageJson(pkg)
		).toEqual({
			license:    'private',
			repository: 'http://someUrl'
		});
	});
});
