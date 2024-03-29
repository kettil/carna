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

| Commands                       | Description                      |
| ------------------------------ | -------------------------------- |
| [`analyse`](#the-analyse-task) | Run the code quality tools       |
| [`test`](#the-test-task)       | Run the tests                    |
| [`license`](#the-license-task) | Checks for incompatible licenses |
| [`build`](#the-build-task)     | Build the application            |
| [`start`](#the-start-task)     | Run a script                     |
| [`manage`](#the-manage-task)   | Run general conditions check     |
| [`ci`](#the-ci-task)           | Run different Tasks as unit      |
| [`git`](#the-git-task)         | Handler for the git hooks        |

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

The hooks have the structure `<pre|post>carna:<task>`.

If you add the option `--verbose` when calling a command, all possible hooks will be displayed.

## The `analyse` task

Run the code quality tools

When the command is executed, only the changed or new files are checked.
If all files are to be checked, then the parameter `--all` must be set.
If the `.git` folder does not exist, all files are always checked.

### Options

| Options | short | Description                                 |
| ------- | ----- | ------------------------------------------- |
| --all   | -a    | Checks all files                            |
| --path  | -p    | Checks only files in the specified path     |
| --only  | -o    | Run a single code quality tool              |
|         |       | Choices: `eslint`, `prettier`, `typescript` |

### Exit codes

| Exit code | Description |
| --------- | ----------- |
| 0         | Success     |
| 1         | task failed |

## The `test` task

Runs the unit, integration and other tests with `jest`.

Each subfolder in the [tests folder](./tests) is a test project, such as `unit` or `integration` test. By default, the projects `unit`, `integration` and `e2e` are created. For a new test project, a folder must be created in the [tests folder](./tests) and the [jest-config](./jest.config.js) must be adjusted.

The test projects are executed in the following order: `unit`, `integration`, `e2e` and the rest alphabetically.

The Code Coverage Threshold can be configured in [.carnarc.json](#carna-config-file).

For helper functions and/or functions for multiple test projects can be stored in the folder [test/shared](./tests/shared). This folder is not interpreted as a test project. Likewise, the folder [test/type](./tests/type) is ignored, since this is for `type` tests and are checked by Typescript directly.

If there is an `pre.[js|ts]` or `post.[js|ts]` file in the test project folder, then it is called before or after from the respective test project.

If there is an `setupTests.[js|ts]` file in the test project folder, then the file is called before each test file.

### Options

| Options          | short | Description                                                               |
| ---------------- | ----- | ------------------------------------------------------------------------- |
| --project        | -p    | Run only the tests of the specified projects                              |
| --runInBand      | -i    | Run all tests serially in the current process                             |
| --updateSnapshot | -u    | Use this flag to re-record every snapshot that fails during this test run |
| --watch          | -w    | Watch files for changes and rerun tests related to changed files          |

### Exit codes

| Exit code | Description |
| --------- | ----------- |
| 0         | Success     |
| 1         | task failed |

## The `build` task

Build the application

### Options

| Options | short | Description                                                                  |
| ------- | ----- | ---------------------------------------------------------------------------- |
| --watch | -w    | Watch files for changes and rebuild the changed files (only for monorepo's). |

### Exit codes

| Exit code | Description |
| --------- | ----------- |
| 0         | Success     |
| 1         | task failed |

## The `start` task

Calls the application directly, without build process.

### Options

| Options              | short | Description                                                                 |
| -------------------- | ----- | --------------------------------------------------------------------------- |
| --script             | -s    | Script to be called (default: `src/index.[ts\|js]`)                         |
| --watch              | -w    | Watch files for changes and rerun script                                    |
| --build-dependencies | -b    | In a monorepo, all packages are built beforehand                            |
| --clear-console      | -c    | Clear console on each restart (only in watch mode)                          |
| --pino-pretty        | -p    | Enables the [pino log formatter](https://www.npmjs.com/package/pino-pretty) |

### Exit codes

| Exit code | Description |
| --------- | ----------- |
| 0         | Success     |
| 1         | task failed |

## The `manage` task

The task analyzes...

- ...the structure of package.json.
  In the [carna config file](#carna-config-file) the subtask can be configured under the point `packageLint`.

- ...if there are orphaned packages.
  In the [carna config file](#carna-config-file) the subtask can be configured under the point `deps`.

- ...the license compatibility of each dependency.
  In the [carna config file](#carna-config-file) the subtask can be configured under the point `license`.
  The license is read from the `package.json` or from [another source](./src/lib/actions/tools/helpers/getPackageInfo.ts) from the dependency.
  The [compatibility list](./src/configs/licenseCompatibilities.ts) is used to validate the license for compatibility.

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

## The `ci` task

Run build, analyse, tests, license and deps tasks.
This command is intended for execution in a CI.

### Options

| Options | short | Description                             |
| ------- | ----- | --------------------------------------- |
| --build | -b    | Executes additionally the build process |

### Exit codes

| Exit code | Description |
| --------- | ----------- |
| 0         | Success     |
| 1         | task failed |

## The `git` task

The tasks will be automatically called by husky (via git hooks).

The following hooks exists:

- `commit`: Checks the files in staged with a part of
  [analyse](#the-analyse-task) command (git-hook: `pre-commit`).
- `msg`: Checks the git commit message and run the other part of
  [analyse](#the-analyse-task) and [test](#the-test-task),
  [license](#the-license-task) and [deps](#the-deps-task) (git-hook: `commit-msg`).

### Options

| Options | Description                                          |
| ------- | ---------------------------------------------------- |
| --hook  | The git hook to execute (Choices: `commit`, `msg`)   |
| --edit  | Path to the COMMIT_EDITMSG file (only by `msg` hook) |

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
    // Disables the verification
    disable: false,

    ignore: {
      // Ignores the packets when checking whether a packet is used or not
      packages: [],
    },
  },

  license: {
    // Disables the verification
    disable: false,

    // Whether to merge or replace the existing list with the list defined here
    replaceAliaseList: false,
    replaceCompatibleList: false,
    replaceHeuristicList: false,

    // If the license cannot be extracted, a license can be defined here
    aliases: {
      // <package-name>: { <version>: <existing license name> }
    },

    // List which license is compatible with the other licenses
    compatibilities: {
      // <license-name>: ['<compatible license>', '<...>'],
    },

    // The license name must be entered at the top of the combalitity list
    // Important: The name should **not** be an existing license
    heuristics: {
      // Searches with the regexp in the corresponding files (z.B. license/readme/markdown files)
      // <license-name>: /<search-regexp>/u
    },

    ignore: {
      // The packages are ignored during the license check
      packages: [],
    },
  },

  packageLint: {
    // Disables the verification
    disable: false,
  }

  log: {
    ignore: {
      // Will be passed 1to1 to --ignore argument from pino-pretty
      keys: [],
    },
  },

  test: {
    coverage: {
      // Overwrites default coverage threshold (value: number or tuple with two numbers)
      threshold: {
        statements: 90,
        branches: 90,
        functions: 90,
        lines: [50, 90],
      },
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
