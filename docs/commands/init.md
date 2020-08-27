# The `init` task

Creates a new project with all config files in the current folder.

## Options

| Options    | short | Description                                                  |
| ---------- | ----- | ------------------------------------------------------------ |
| --package  | -p    | Project is created as a package                              |
| --cli      | -c    | Extends the package with CLI features (required `--package`) |
| --noCommit |       | No initial commit is executed at the end                     |

## Exit codes

| Exit code | Description |
| --------- | ----------- |
| 0         | Success     |
| 1         | task failed |
