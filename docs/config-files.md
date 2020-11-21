# Default config files

It is possible to overwrite the default config files.

The following files can be overwritten and must be created in the root folder of the project.
If the existing configuration is only to be extended, the corresponding code block must be copied into the file.

## `.commitlintrc.json`

```json
{
  "extends": "@kettil"
}
```

## `.eslintrc.json`

```json
{
  "extends": "@kettil"
}
```

## `.prettierrc.json`

The configuration cannot be extended, but is overwritten.

For VS Code users the entry `prettier.configPath` in the `.vscode/settings.json` must be removed.

```json
{
  "printWidth": 120,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "bracketSpacing": true,
  "jsxBracketSameLine": false,
  "arrowParens": "always",
  "overrides": [
    { "files": "{*.ts,*.tsx}", "options": { "parser": "typescript" } },
    { "files": "{*.json,.prettierrc,.huskyrc}", "options": { "parser": "json" } },
    { "files": "*.md", "options": { "parser": "markdown" } },
    { "files": "*.scss", "options": { "parser": "scss" } },
    { "files": "*.yml", "options": { "parser": "yaml" } },
    { "files": "*.html", "options": { "parser": "html" } }
  ]
}
```
