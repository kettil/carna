# The `lint` task

Run the code quality tools

## Options

| Options | Description                                      |
| ------- | ------------------------------------------------ |
| --ci    | Run it in CI mode                                |
| --only  | Run a single code quality tool (required `--ci`) |
|         | Choices: eslint, prettier, typescript            |

## Exit codes

| Exit code | Description |
| --------- | ----------- |
| 0         | Success     |
| 1         | task failed |
