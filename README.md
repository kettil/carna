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

| Commands   | Description                         |
| ---------- | ----------------------------------- |
| init       | Initializes the project             |
| lint       | Run the code quality tools          |
| git:commit | Handler for the git commit-msg hook |
| git:msg    | Handler for the git pre-commit hook |

For the help text, execute `npx carna --help` and the individual commands `npx carna <command> --help`.
