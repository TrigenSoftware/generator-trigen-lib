
# generator-trigen-lib spec

### Possible types

1) NodeJS specific, e. g. plugins:
    - flexis-srcset, flexis-favicons
    - webpack plugins and loaders
    - gulp plugins
    - configs
2) Browser specific, e. g. UI components
    - flexis-ui
3) Universal, e. g. common JS libraries
    - flexis-redux
    - i18n-for-browser

### Differences

- Languages
    - Vanilla
        - eslint
            - husky
            - lint staged
    - JS
        - eslint
            - husky
            - lint staged
        - babel build step
    - TS
        - tslint
            - husky
            - lint staged
        - tsc + babel build step
        - Documentation generating
            - yes
            - no
- Building
    - 1-to-1 with Babel
        - package dir to publish with custom script
            - yes
            - no
    - all-to-bundle with Rollup
        - size limit
- Testing
    - Jest
    - Custom script
    - No tests
    - coverege
        - yes
        - no
- Publishing
    - Clean publish
    - Simple publish
- Type specific
    - NodeJS
        - specific babel config
        - specific browserslist config
        - commonjs output
    - Browser
        - specific babel config
        - specific browserslist config
        - es output
        - commonjs output
        - umd output
    - Universal
        - specific babel config
        - specific browserslist config
        - es output
        - commonjs output

### Commons

- package.json [e]
- LICENSE
- README.md [e]
- CHANGELOG.md
- .gitignore
- .editorconfig
- .travis.yml (coverege)
- .eslintrc (not Vanilla + specific type)
- .huskyrc
- .lintstagedrc (TS)

### Customs

- .babelrc (not Vanilla + specific type)
- .browserslistrc (not Vanilla + specific type)
- jest.config.json (tests with Jest)
- tslint.json (TS + specific type)
- tsconfig.json (TS)
- rollup.config.js (Rollup + specific type)
- .clean-publish (clean publish)
- .size-limit (Rollup)

### Questions

- What kind of library it is?
    - for NodeJS
    - for browser
    - universal
- Which scripts language you want to use?
    - JavaScript
    - JavaScript with Babel
    - TypeScript
        - Building sources by which way?
            - 1-to-1 with Babel
            - bundle with Rollup
- Which tests runner you want to use?
    - Jest
        - Do you want to collect code coverege?
        - yes
        - no
    - custom script
    - none
- Do you want to publish it by "clean" way?
    - yes
    - no
- Do you want to publish "src" directory as package root?
    - yes
    - no

babel
ts
rollup
jest
