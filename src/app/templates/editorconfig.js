
export const name = '.editorconfig';

export const render = () => `\
root = true

[*]
indent_style = tab
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[{package.json,manifest.json,*.yml}]
indent_style = space
indent_size = 2

[*.md]
indent_style = space
indent_size = 4
trim_trailing_whitespace = false
`;
