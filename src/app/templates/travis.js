
export const name = '.travis.yml';

export const render = ({
	type,
	coverage
}) => `\
language: node_js
node_js:
  - "lts/*"\
${type === 'browser' ? '' : '\n  - "10"'}
cache:
  directories:
    - node_modules\
${!coverage ? '' : '\nafter_success: npm run coverage'}
`;
