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

| Commands                       | Description                           |
| ------------------------------ | ------------------------------------- |
| [`init`](#the-init-task)       | Initializes the project               |
| [`analyse`](#the-analyse-task) | Run the code quality tools            |
| [`test`](#the-test-task)       | Run the tests                         |
| [`deps`](#the-deps-task)       | Checks if there are orphaned packages |
| [`license`](#the-license-task) | Checks for incompatible licenses      |
| [`build`](#the-build-task)     | Build the application                 |
| [`git`](#the-git-tasks)        | Handler for the git hooks             |

For the help text, execute `npx carna --help` and the individual commands `npx carna <command> --help`.

### Global options

| Options   | short | Description               |
| --------- | ----- | ------------------------- |
| --ci      |       | Run carna in CI mode      |
| --help    |       | Show help                 |
| --verbose | -v    | Print info messages       |
| --vvv     |       | Print info/debug messages |
| --version |       | Show version number       |

## Hook system

Each time a command is executed, different hooks are called. Every hook corresponds to a script in the npm `package.json`.

The hooks have the structure `<pre|post>carna:<task>[:<subtask>]`.

If you add the option `--verbose` when calling a command, all possible hooks will be displayed.

## The `init` task

Creates a new project with all config files in the current folder.

### Options

| Options    | short | Description                                                                              |
| ---------- | ----- | ---------------------------------------------------------------------------------------- |
| --package  | -p    | Project is created as a package                                                          |
| --cli      | -c    | Extends the package with CLI features (required `--package`)                             |
| --github   |       | Expects the Github username and then adds the repository data and CI configuration file. |
| --noCommit |       | No initial commit is executed at the end                                                 |

### Exit codes

| Exit code | Description |
| --------- | ----------- |
| 0         | Success     |
| 1         | task failed |

## The `analyse` task

Run the code quality tools

### Options

| Options | Description                                 |
| ------- | ------------------------------------------- |
| --only  | Run a single code quality tool              |
|         | Choices: `eslint`, `prettier`, `typescript` |

### Exit codes

| Exit code | Description |
| --------- | ----------- |
| 0         | Success     |
| 1         | task failed |

## The `test` task

Runs the unit, integration and other tests with `jest`.

Each subfolder in the [tests folder](./tests) is a test project, such as `unit` or `integration` test. By default, the projects `unit`, `integration` and `e2e` are created. For a new test project, a folder must be created in the [tests folder](./tests) and the [jest-config](./jest.config.js) must be adjusted.

The test projects are executed in the following order: `unit`, `integration`, `e2e` and the rest alphabetically.

For helper functions and/or functions for multiple test projects can be stored in the folder [test/shared](./tests/shared). This folder is not interpreted as a test project. Likewise, the folder [test/type](./tests/type) is ignored, since this is for `type` tests and are checked by Typescript directly.

For each test project there are corresponding [hooks](#hook-system).

### Options

| Options          | short | Description                                                               |
| ---------------- | ----- | ------------------------------------------------------------------------- |
| --coverage       | -c    | Runs the coverage projects together and builds the coverage from them     |
| --project        | -p    | Run only the tests of the specified projects                              |
| --runInBand      | -i    | Run all tests serially in the current process                             |
| --updateSnapshot | -u    | Use this flag to re-record every snapshot that fails during this test run |
| --watch          | -w    | Watch files for changes and rerun tests related to changed files          |

### Exit codes

| Exit code | Description |
| --------- | ----------- |
| 0         | Success     |
| 1         | task failed |

## The `deps` task

Checks if there are orphaned packages

Packages that are no longer to be listed can be defined in the `.depsignore` file (in the project directory), directly or with a wildcard (e.g. `babel-*`).

### Options

None

### Exit codes

| Exit code | Description |
| --------- | ----------- |
| 0         | Success     |

## The `license` task

Carna checks the license compatibility of each dependency. The license is read from the `package.json` or from [another source](./src/lib/actions/tools/helpers/getPackageInfo.ts) from the dependency. The [compatibility list](./src/configs/licenseCompatibilities.ts) is used to validate the license for compatibility.

If you think that an assignment is incorrect or can be added, please submit a pull request with the change in the [compatibility list](./src/configs/licenseCompatibilities.ts) or [license list](./src/configs/licensePackages.ts).

If the project uses an unknown license, the compatibility check will be disabled.

**_Note: License compatibility checking is only a suggestion and it is not legal advice. If you would like to have a legally binding assessment, please contact a lawyer._**

### Options

None

### Exit codes

| Exit code | Description |
| --------- | ----------- |
| 0         | Success     |
| 1         | task failed |

## The `build` task

Build the application

### Options

None

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

### Options

| Options | Description                                         |
| ------- | --------------------------------------------------- |
| --edit  | Path to the COMMIT_EDITMSG file (only by `git msg`) |

### Exit codes

| Exit code | Description |
| --------- | ----------- |
| 0         | Success     |
| 1         | task failed |

## Carna config file

Carna can be adjusted via the configuration file [.carnarc.json](./.carnarc.json).
The file is structured as follows

```json5
{
  deps: {
    ignore: {
      // Ignores the packets when checking whether a packet is used or not
      packages: [],
    },
  },
  license: {
    ignore: {
      // The packages are ignored during the license check
      packages: [],
    },
  },
  test: {
    coverage: {
      // Overwrites default coverage test projects ("unit" and "integration")
      projects: [],
    },
  },
}
```

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
    { "files": "{*.json,.prettierrc}", "options": { "parser": "json" } },
    { "files": "*.md", "options": { "parser": "markdown" } },
    { "files": "*.scss", "options": { "parser": "scss" } },
    { "files": ["*.yml", "*.yaml"], "options": { "parser": "yaml" } },
    { "files": "*.html", "options": { "parser": "html" } }
  ]
}
```
