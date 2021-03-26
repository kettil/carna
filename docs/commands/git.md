# The `git` tasks

The tasks will be automatically called by husky during commit.

## The `git commit` task

Checks the files in staged with type, prettier and eslint.

### Exit codes

| Exit code | Description |
| --------- | ----------- |
| 0         | Success     |
| 1         | task failed |

## The `git msg` task

Checks the git commit message for a consistent structure.

### Options

| Options | Description                     |
| ------- | ------------------------------- |
| --edit  | Path to the COMMIT_EDITMSG file |

### Exit codes

| Exit code | Description |
| --------- | ----------- |
| 0         | Success     |
| 1         | task failed |

## The `git push` task

Checks the files with type, prettier and eslint.

### Exit codes

| Exit code | Description |
| --------- | ----------- |
| 0         | Success     |
| 1         | task failed |
