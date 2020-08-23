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

| Commands                            | Description                         |
| ----------------------------------- | ----------------------------------- |
| [`init`](#the-init-task)            | Initializes the project             |
| [`lint`](#the-lint-task)            | Run the code quality tools          |
| [`git:commit`](#the-gitcommit-task) | Handler for the git commit-msg hook |
| [`git:msg`](#the-gitmsg-task)       | Handler for the git pre-commit hook |

For the help text, execute `npx carna --help` and the individual commands `npx carna <command> --help`.

### Exit codes

| Exit code | Description |
| --------- | ----------- |
| 0         | Success     |
| 1         | task failed |

## The `init` task

Creates a new project with all config files in the current folder.

### Options

| Options     | short | Description                                                  |
| ----------- | ----- | ------------------------------------------------------------ |
| --package   | -p    | Project is created as a package                              |
| --cli       | -c    | Extends the package with CLI features (required `--package`) |
| --no-ts     | -t    | Typescript will be not installed                             |
| --no-jest   | -j    | Jest will be not installed                                   |
| --no-commit |       | No initial commit is executed at the end                     |

## The `lint` task

Run the code quality tools

### Options

| Options | Description                                      |
| ------- | ------------------------------------------------ |
| --ci    | Run it in CI mode                                |
| --only  | Run a single code quality tool (required `--ci`) |

## The `git:commit` task

Checks the files in staged with prettier and eslint
Automatically called by husky during commit.

## The `git:msg` task

Checks the git commit message for a consistent structure.
Automatically called by husky during commit.
