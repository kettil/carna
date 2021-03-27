# Carna

![npm](https://img.shields.io/npm/v/carna)
![David](https://img.shields.io/david/kettil/carna)
![Release](https://github.com/kettil/carna/workflows/Release/badge.svg)
![GitHub](https://img.shields.io/github/license/kettil/carna)

Global management of the config files

## Installation

```bash
npm install carna -D
```

Never install `carna` globally, but always into the local context.

## Quick Start

To run `carna`, execute the following command:

```bash
npx carna
```

## Commands

The following commands are available:

| Commands                   | Description                           |
| -------------------------- | ------------------------------------- |
| [`init`](#the-init-task)   | Initializes the project               |
| [`lint`](#the-lint-task)   | Run the code quality tools            |
| [`debs`](#the-debs-task)   | Checks if there are orphaned packages |
| [`build`](#the-build-task) | Build the application                 |
| [`git`](#the-git-tasks)    | Handler for the git hooks             |

For the help text, execute `npx carna --help` and the individual commands `npx carna <command> --help`.

## The `init` task

Creates a new project with all config files in the current folder.

### Options

| Options    | short | Description                                                  |
| ---------- | ----- | ------------------------------------------------------------ |
| --package  | -p    | Project is created as a package                              |
| --cli      | -c    | Extends the package with CLI features (required `--package`) |
| --noCommit |       | No initial commit is executed at the end                     |

### Exit codes

| Exit code | Description |
| --------- | ----------- |
| 0         | Success     |
| 1         | task failed |

## The `lint` task

Run the code quality tools

### Options

| Options | Description                                      |
| ------- | ------------------------------------------------ |
| --ci    | Run it in CI mode                                |
| --only  | Run a single code quality tool (required `--ci`) |
|         | Choices: eslint, prettier, typescript            |

### Exit codes

| Exit code | Description |
| --------- | ----------- |
| 0         | Success     |
| 1         | task failed |

## The `debs` task

Checks if there are orphaned packages

### Options

| Options | Description       |
| ------- | ----------------- |
| --ci    | Run it in CI mode |

### Exit codes

| Exit code | Description |
| --------- | ----------- |
| 0         | Success     |
| 1         | task failed |

## The `build` task

Build the application

### Options

| Options | Description       |
| ------- | ----------------- |
| --ci    | Run it in CI mode |

### Exit codes

| Exit code | Description |
| --------- | ----------- |
| 0         | Success     |
| 1         | task failed |

## The `git` tasks

The tasks will be automatically called by husky (via git hooks).

The following subtask exists:

- `git commit`: Checks the files in staged with prettier, eslint and typescript (git-hook: `pre-commit`).
- `git msg`: Checks the git commit message for a consistent structure (git-hook: `commit-msg`).
- `git push`: Checks the files with prettier, eslint and typescript (git-hook: `pre-push`).

### Options

| Options | Description                                         |
| ------- | --------------------------------------------------- |
| --edit  | Path to the COMMIT_EDITMSG file (only by `git msg`) |

### Exit codes

| Exit code | Description |
| --------- | ----------- |
| 0         | Success     |
| 1         | task failed |

## Default config files

It is possible to overwrite the default config files.

The following files can be overwritten and must be created in the root folder of the project.
If the existing configuration is only to be extended, the corresponding code block must be copied into the file.

### `.commitlintrc.json`

```json
{
  "extends": "@kettil"
}
```

### `.eslintrc.json`

```json
{
  "extends": "@kettil"
}
```

### `.prettierrc.json`

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
    { "files": ["*.yml", "*.yaml"], "options": { "parser": "yaml" } },
    { "files": "*.html", "options": { "parser": "html" } }
  ]
}
```
