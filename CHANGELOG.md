# Changelog

# [5.0.0-beta.10](https://github.com/kettil/carna/compare/5.0.0-beta.9...5.0.0-beta.10) (2021-10-12)


### Features

* for babel use the config of carna as default ([b29e695](https://github.com/kettil/carna/commit/b29e6956a1a2ad21b4a57e9cc6bd79c9c22511ad))

# [5.0.0-beta.9](https://github.com/kettil/carna/compare/5.0.0-beta.8...5.0.0-beta.9) (2021-10-11)


### Bug Fixes

* remove the double argument --watch ([547b831](https://github.com/kettil/carna/commit/547b8312003e32d7f1a32899ef4e5dc1de030441))


### Features

* ignore comments in the files when building by babel ([37577a9](https://github.com/kettil/carna/commit/37577a9dd9b6f0dfa837c8d2607496f254d0060f))
* improved watching handling at start command ([d380b04](https://github.com/kettil/carna/commit/d380b046e1f7f450b2f9202a1dfaa1a927b04def))

# [5.0.0-beta.8](https://github.com/kettil/carna/compare/5.0.0-beta.7...5.0.0-beta.8) (2021-10-11)


### Features

* add alias "s" to the start command ([9f90747](https://github.com/kettil/carna/commit/9f907476da22dea755138036e2ed4644a252b548))
* add argument build-dependencies to the command start ([3de4ee7](https://github.com/kettil/carna/commit/3de4ee7beffa9f2513a3554ad265139e93756bd6))

# [5.0.0-beta.7](https://github.com/kettil/carna/compare/5.0.0-beta.6...5.0.0-beta.7) (2021-10-10)


### Features

* add watch mode to the command build ([b7720f1](https://github.com/kettil/carna/commit/b7720f1efae95ad5d32b33eb1872c1aff17ff2bd))

# [5.0.0-beta.6](https://github.com/kettil/carna/compare/5.0.0-beta.5...5.0.0-beta.6) (2021-10-10)


### Features

* show the cwd when calling exec ([a878fef](https://github.com/kettil/carna/commit/a878fef9a8d775a3a77893dfc3cb6296c9b7c50e))

# [5.0.0-beta.5](https://github.com/kettil/carna/compare/5.0.0-beta.4...5.0.0-beta.5) (2021-10-07)


### Features

* add monorepo support in the jest config ([4a8e24d](https://github.com/kettil/carna/commit/4a8e24d75f78d9b1657915046495264e793be65e))


### BREAKING CHANGES

* The jest config file needs to be rewritten because the structure has changed.

# [5.0.0-beta.4](https://github.com/kettil/carna/compare/5.0.0-beta.3...5.0.0-beta.4) (2021-10-07)


### Bug Fixes

* add carna to the depcheck ignore list ([143a1bf](https://github.com/kettil/carna/commit/143a1bf9ab18a1d499123e98e46fd4d0ac1a7d7b))
* unclear error message when checking licenses ([16414f4](https://github.com/kettil/carna/commit/16414f436d77a7fe22ff28938c5fd9d66c5973fa))

# [5.0.0-beta.3](https://github.com/kettil/carna/compare/5.0.0-beta.2...5.0.0-beta.3) (2021-10-06)


### Bug Fixes

* search the babel config in the cwd and root folder ([ae1a0ec](https://github.com/kettil/carna/commit/ae1a0ec5decb28f8cc6f671cd3df51b6817b2ea5))


### Features

* extend babel extension list ([d9e35be](https://github.com/kettil/carna/commit/d9e35bee416857bba37f43e6668f9d5b84612a3f))
* extend build command for monorepo's ([23c4398](https://github.com/kettil/carna/commit/23c4398053f4cd45a56e53cb15d70b5234c2e1e8))

# [5.0.0-beta.2](https://github.com/kettil/carna/compare/5.0.0-beta.1...5.0.0-beta.2) (2021-10-06)


### Bug Fixes

* incorrect resolution of the root path ([883b1b4](https://github.com/kettil/carna/commit/883b1b44027958ccca821d5e3b11191cfb63de8f))
* incorrect resolution of tools paths ([a8db695](https://github.com/kettil/carna/commit/a8db695e33c1fcbf37967723e71cf335c07e3ab5))

# [5.0.0-beta.1](https://github.com/kettil/carna/compare/4.13.0-beta.1...5.0.0-beta.1) (2021-10-05)


### Bug Fixes

* incorrect handling of special characters in getCoverageFolder() ([dd18d32](https://github.com/kettil/carna/commit/dd18d3295145fb070c9aff6383b7b4eb356b2cd0))


### Features

* add support for monorepo's ([399bf04](https://github.com/kettil/carna/commit/399bf042d0305d709b081f7452abad129836f54f))
* remove init command ([d7f8814](https://github.com/kettil/carna/commit/d7f8814168c970c3b69681b23b9a3cc74f14608e)), closes [#540](https://github.com/kettil/carna/issues/540)


### BREAKING CHANGES

* The `init` command has been removed and instead Github repo templates have been created.

# [4.13.0-beta.1](https://github.com/kettil/carna/compare/4.12.1...4.13.0-beta.1) (2021-10-04)


### Features

* detection of the test projects based on the jest config ([aca3e86](https://github.com/kettil/carna/commit/aca3e86606a67d933175e597d8442d1c3f548891))
* run babel-watch with --config-file option ([a5efd29](https://github.com/kettil/carna/commit/a5efd294a6f1149d18dc853ef5deec4a2c2389da))
* set "analyse" as default command ([7954e9e](https://github.com/kettil/carna/commit/7954e9e2f4e055aa085789765dbdde12d750e14b))

## [4.12.1](https://github.com/kettil/carna/compare/4.12.0...4.12.1) (2021-10-04)


### Bug Fixes

* **deps:** bump @commitlint/cli from 13.1.0 to 13.2.0 ([6a80835](https://github.com/kettil/carna/commit/6a808359e151ae0ef575f0ea0a5f1203e7661483))
* **deps:** bump @kettil/eslint-config from 3.5.0 to 3.5.1 ([cf26ca7](https://github.com/kettil/carna/commit/cf26ca7e6facd44e8c001ceac13fcf43acbc9aa3))
* **deps:** bump babel-jest from 27.2.1 to 27.2.2 ([d101666](https://github.com/kettil/carna/commit/d1016660316a49a7f4f60c0e1a7f5564d75ffe9a))
* **deps:** bump babel-jest from 27.2.2 to 27.2.4 ([586930b](https://github.com/kettil/carna/commit/586930b7a04afd9aea22a4f1974f5fdcb9cadb5f))
* **deps:** bump jest from 27.2.1 to 27.2.2 ([1896b99](https://github.com/kettil/carna/commit/1896b995f770beb2f1b4f3e58e2c5ea21fb9d12d))
* **deps:** bump jest from 27.2.2 to 27.2.4 ([d86d6d8](https://github.com/kettil/carna/commit/d86d6d8c9d6f1d2579cc8856becfc78b669ec82c))
* **deps:** bump yargs from 17.2.0 to 17.2.1 ([f0b0a3b](https://github.com/kettil/carna/commit/f0b0a3b17b1115a7aba4c1469ab02984c3c68a38))

# [4.12.0](https://github.com/kettil/carna/compare/4.11.0...4.12.0) (2021-09-23)


### Features

* update license package list ([cad1333](https://github.com/kettil/carna/commit/cad1333b37d2c198889e4b62b56f64246af1d837))

# [4.11.0](https://github.com/kettil/carna/compare/4.10.10...4.11.0) (2021-09-23)


### Bug Fixes

* wrong order at default coverage watermarks ([0489fc1](https://github.com/kettil/carna/commit/0489fc1525d261bfd9c74ce388b1d712e84cddb5))
* **deps:** bump @babel/cli from 7.14.8 to 7.15.7 ([f2ebb2f](https://github.com/kettil/carna/commit/f2ebb2f9b6d468d262c77be350680c7a9912e05f))
* **deps:** bump @babel/core from 7.14.8 to 7.15.5 ([f49e561](https://github.com/kettil/carna/commit/f49e561e782d20318131bfcd15aaf4c30bbe8667))
* **deps:** bump @babel/node from 7.14.7 to 7.15.4 ([16aeb7c](https://github.com/kettil/carna/commit/16aeb7c4bfd58d169346e2c6de577bfbf6231fd6))
* **deps:** bump @babel/plugin-transform-runtime from 7.14.5 to 7.15.0 ([77e5d65](https://github.com/kettil/carna/commit/77e5d6514d2bd3e05bf1f3b778928ca929e10fb5))
* **deps:** bump @babel/preset-env from 7.14.8 to 7.15.6 ([7ffdb93](https://github.com/kettil/carna/commit/7ffdb9316ce53b8018c533bd9f04a3a79c347db0))
* **deps:** bump @babel/preset-typescript from 7.14.5 to 7.15.0 ([fd19f8e](https://github.com/kettil/carna/commit/fd19f8e6d487e635c2bfc19d2f24509a9bab644f))
* **deps:** bump @kettil/eslint-config from 3.2.4 to 3.3.0 ([7702159](https://github.com/kettil/carna/commit/77021592ddfd12e2a0cd69d6c19a00c894fbc8d0))
* **deps:** bump @kettil/eslint-config from 3.3.0 to 3.5.0 ([4e1e80c](https://github.com/kettil/carna/commit/4e1e80c573b1b5cab4867caedab09222f335dca2))
* **deps:** bump @types/jest from 26.0.24 to 27.0.2 ([41e69df](https://github.com/kettil/carna/commit/41e69dfa35b45e1a37b46f161891e51fd0a33adf))
* **deps:** bump @types/yargs from 17.0.2 to 17.0.3 ([2ce2e25](https://github.com/kettil/carna/commit/2ce2e25ac3296c7c6a16a2d76a54e48f274c2d03))
* **deps:** bump babel-jest from 27.0.6 to 27.2.1 ([ee88db7](https://github.com/kettil/carna/commit/ee88db793380f50191e8de36c50b27bb5e3e5cfe))
* **deps:** bump babel-watch from 7.4.1 to 7.5.0 ([74bfbcd](https://github.com/kettil/carna/commit/74bfbcd20b4eef60dc8dcde89115531dac24e084))
* **deps:** bump chalk from 4.1.1 to 4.1.2 ([4fa79ec](https://github.com/kettil/carna/commit/4fa79ecf893b3f97a82b412c609421fec899f86b))
* **deps:** bump eslint from 7.31.0 to 7.32.0 ([ac382d9](https://github.com/kettil/carna/commit/ac382d90dba964999f28ed3add735696517b65d2))
* **deps:** bump husky from 6.0.0 to 7.0.2 ([cf05d4d](https://github.com/kettil/carna/commit/cf05d4de2200c86463773354f66bffe48ef26164))
* **deps:** bump istanbul-lib-coverage from 3.0.0 to 3.0.1 ([f5825eb](https://github.com/kettil/carna/commit/f5825eb2306df11ce5fe78fb1d00afa5ff757b27))
* faulty error handling ([559a6c6](https://github.com/kettil/carna/commit/559a6c68f5836a6696f1bb928383046e27fdedd6))
* **deps:** bump jest from 27.0.6 to 27.2.1 ([1c8a74a](https://github.com/kettil/carna/commit/1c8a74a5d3c400ab1215f89c0e8a94a2ea155386))
* **deps:** bump prettier from 2.3.2 to 2.4.1 ([42d9e19](https://github.com/kettil/carna/commit/42d9e193c78947efcd6ed521c89fc82008462ed9))
* **deps:** bump semantic-release from 17.4.4 to 17.4.7 ([872099a](https://github.com/kettil/carna/commit/872099ae2c9e91a9ada2073762cb8c7083d60074))
* **deps:** bump yargs from 17.0.1 to 17.1.1 ([eb584c2](https://github.com/kettil/carna/commit/eb584c255cf344ba5a8edd63796bd3cea6cb1b91))
* **deps:** bump yargs from 17.1.1 to 17.2.0 ([b0c7fab](https://github.com/kettil/carna/commit/b0c7fabc0398a8139367fe77425398ea2820cd1c))


### Features

* add noImplicitOverride typescript option ([0880cfd](https://github.com/kettil/carna/commit/0880cfdfa81d19dc080a5daad263af5cfc2152cb))
* add noImplicitOverride typescript option ([990bb51](https://github.com/kettil/carna/commit/990bb5199ff59436c61c303f86f25ca2a1c8cdb5))
* checks the order in coverage watermarks ([9429dcd](https://github.com/kettil/carna/commit/9429dcdb916f064e475ee434824afe882fee0ed0))

## [4.10.10](https://github.com/kettil/carna/compare/4.10.9...4.10.10) (2021-08-02)


### Bug Fixes

* **deps:** bump @commitlint/cli from 12.1.4 to 13.1.0 ([1dcedb0](https://github.com/kettil/carna/commit/1dcedb09e1238c451f567cf38a167f8c0a6b91a7))
* **deps:** bump @kettil/eslint-config from 3.2.3 to 3.2.4 ([6adc317](https://github.com/kettil/carna/commit/6adc317d572bd4dd889d2d09004ccdfa52867dcb))
* **deps:** bump @types/semver from 7.3.7 to 7.3.8 ([3374d1e](https://github.com/kettil/carna/commit/3374d1e56609d0e8f9c523c01d6ae1ee3e098fcd))

## [4.10.9](https://github.com/kettil/carna/compare/4.10.8...4.10.9) (2021-07-26)


### Bug Fixes

* **deps:** bump @babel/cli from 7.14.5 to 7.14.8 ([76e2976](https://github.com/kettil/carna/commit/76e297688b2cf7d64c1641cea10b565a1e51669e))
* **deps:** bump @babel/core from 7.14.6 to 7.14.8 ([c39d70f](https://github.com/kettil/carna/commit/c39d70fb84d57f653522df73b6bc131f33e0b54b))
* **deps:** bump @babel/preset-env from 7.14.7 to 7.14.8 ([c8efeb4](https://github.com/kettil/carna/commit/c8efeb47194b30bf472cd779be517b174b45cce0))
* **deps:** bump @kettil/eslint-config from 3.2.1 to 3.2.3 ([8d51786](https://github.com/kettil/carna/commit/8d51786bc865b7ec5b6ce7c457f3b565637cc152))
* **deps:** bump eslint from 7.30.0 to 7.31.0 ([6d016dd](https://github.com/kettil/carna/commit/6d016dd2c5063e26027d92c225720a4beadbae73))

## [4.10.8](https://github.com/kettil/carna/compare/4.10.7...4.10.8) (2021-07-12)


### Bug Fixes

* **deps:** bump @types/jest from 26.0.23 to 26.0.24 ([51d1542](https://github.com/kettil/carna/commit/51d1542647a1688b675ab361d469d790c394d97c))
* **deps:** bump @types/semver from 7.3.6 to 7.3.7 ([92068d3](https://github.com/kettil/carna/commit/92068d3bd97320d8f5b269f334a0d672a3bbef0c))
* **deps:** bump @types/yargs from 17.0.0 to 17.0.2 ([b466ca5](https://github.com/kettil/carna/commit/b466ca58df932c680ed8029edd2309ead50f6dd4))
* **deps:** bump eslint from 7.29.0 to 7.30.0 ([e3f35ee](https://github.com/kettil/carna/commit/e3f35ee5bdf22f22b05f4007ab7efd2eb7a1ec63))

## [4.10.7](https://github.com/kettil/carna/compare/4.10.6...4.10.7) (2021-07-05)


### Bug Fixes

* **deps:** bump @kettil/eslint-config from 3.2.0 to 3.2.1 ([41a3565](https://github.com/kettil/carna/commit/41a3565c158b29147e1a946c75d7ba715e52ed36))
* **deps:** bump babel-jest from 27.0.5 to 27.0.6 ([67ba1e4](https://github.com/kettil/carna/commit/67ba1e4dc8f2a2271450bf3236359c037e93d28f))
* **deps:** bump depcheck from 1.4.1 to 1.4.2 ([e6ee0be](https://github.com/kettil/carna/commit/e6ee0bedd9a9dae05196045e74414ce2f5191522))
* **deps:** bump jest from 27.0.5 to 27.0.6 ([43ad0c0](https://github.com/kettil/carna/commit/43ad0c0dd47e51f7d9bc6928f9b91bf109300c83))
* **deps:** bump prettier from 2.3.1 to 2.3.2 ([1bea6c5](https://github.com/kettil/carna/commit/1bea6c5f0872ac342039b9c3a4d94395f1177914))

## [4.10.6](https://github.com/kettil/carna/compare/4.10.5...4.10.6) (2021-06-28)


### Bug Fixes

* **deps:** bump @babel/node from 7.14.5 to 7.14.7 ([03a45fa](https://github.com/kettil/carna/commit/03a45fa3bb8fbbff21f8017475fb58505cc03c9f))
* **deps:** bump @babel/preset-env from 7.14.5 to 7.14.7 ([53c0492](https://github.com/kettil/carna/commit/53c04928ec4c1e5ac7e6e33124bbd254998d167d))
* **deps:** bump babel-jest from 27.0.2 to 27.0.5 ([627cb69](https://github.com/kettil/carna/commit/627cb698f223e542e1ce40483e00d07ed1e41e47))
* **deps:** bump jest from 27.0.4 to 27.0.5 ([0298375](https://github.com/kettil/carna/commit/029837509d5b631f5b394107aa267e31290906bf))

## [4.10.5](https://github.com/kettil/carna/compare/4.10.4...4.10.5) (2021-06-21)


### Bug Fixes

* **deps:** bump @kettil/eslint-config from 3.1.0 to 3.2.0 ([d38fa6d](https://github.com/kettil/carna/commit/d38fa6d727da84996bf855b0aca8aed67839f5a8))

## [4.10.4](https://github.com/kettil/carna/compare/4.10.3...4.10.4) (2021-06-21)


### Bug Fixes

* **deps:** bump @babel/core from 7.14.5 to 7.14.6 ([6b2c5a4](https://github.com/kettil/carna/commit/6b2c5a4d89af37c10cf0cc7853d17458192fae2b))
* **deps:** bump @kettil/eslint-config from 3.0.2 to 3.0.3 ([3559dd4](https://github.com/kettil/carna/commit/3559dd4c15ce32efc37b6f71d3bb96a3f7f1bcc2))
* **deps:** bump @kettil/eslint-config from 3.0.3 to 3.1.0 ([be8493b](https://github.com/kettil/carna/commit/be8493b611e6636b25000d4475aafe98cde196cc))
* **deps:** bump eslint from 7.28.0 to 7.29.0 ([db613e2](https://github.com/kettil/carna/commit/db613e26e70e65a26a81adc257e94b4c0c814e6c))
* **deps:** bump semantic-release from 17.4.3 to 17.4.4 ([e7e5bca](https://github.com/kettil/carna/commit/e7e5bcab278576827ef4c9706366a713e46b045d))

## [4.10.3](https://github.com/kettil/carna/compare/4.10.2...4.10.3) (2021-06-14)


### Bug Fixes

* **deps:** bump @babel/cli from 7.14.3 to 7.14.5 ([93f1f61](https://github.com/kettil/carna/commit/93f1f617cb0295f2fb8c3d4291742abe06b53364))
* **deps:** bump @babel/core from 7.14.3 to 7.14.5 ([d6da5e0](https://github.com/kettil/carna/commit/d6da5e0d6ca1f5df72489caaccab1f5d2977550a))
* **deps:** bump @babel/node from 7.14.2 to 7.14.5 ([50406d2](https://github.com/kettil/carna/commit/50406d27a8c7d1544f7b01649f04634727aa4006))
* **deps:** bump @babel/plugin-transform-runtime from 7.14.3 to 7.14.5 ([bd49a86](https://github.com/kettil/carna/commit/bd49a86625425d83d1050ad5c4d880e048b4bc33))
* **deps:** bump @babel/preset-env from 7.14.4 to 7.14.5 ([120bb16](https://github.com/kettil/carna/commit/120bb162af2f6b9760fd23ae1b1d473427f81b2e))
* **deps:** bump @babel/preset-typescript from 7.13.0 to 7.14.5 ([8bd830a](https://github.com/kettil/carna/commit/8bd830a31aea604c803308736bb78d07760af2e5))
* **deps:** bump @kettil/eslint-config from 2.5.3 to 3.0.2 ([adddaf6](https://github.com/kettil/carna/commit/adddaf6b9cd94b7eed6db3fff8c32b8bec19962a))
* **deps:** bump ora from 5.4.0 to 5.4.1 ([f4b7939](https://github.com/kettil/carna/commit/f4b79393823d5376d82416c9e97064630d897252))

## [4.10.2](https://github.com/kettil/carna/compare/4.10.1...4.10.2) (2021-06-07)


### Bug Fixes

* **deps:** bump eslint from 7.27.0 to 7.28.0 ([b39ebec](https://github.com/kettil/carna/commit/b39ebec8d75c9fc1544ca17eb3434ce7a1357963))
* **deps:** bump prettier from 2.3.0 to 2.3.1 ([4b42499](https://github.com/kettil/carna/commit/4b42499e1d06d1b8a9979c7c66d8623513208cae))

## [4.10.1](https://github.com/kettil/carna/compare/4.10.0...4.10.1) (2021-06-06)


### Bug Fixes

* update semver action with handling versions with postfix ([4f1aaf0](https://github.com/kettil/carna/commit/4f1aaf0fc803d320c3f447eb305578c4a6561fe9))

# [4.10.0](https://github.com/kettil/carna/compare/4.9.2...4.10.0) (2021-06-06)


### Bug Fixes

* update eslint-disable comment in the template files ([f1127d6](https://github.com/kettil/carna/commit/f1127d61faa84ae57f16dc14c15e608388a8a969))


### Features

* add LGPL-3.0 license to MIT compatibility list ([c82102f](https://github.com/kettil/carna/commit/c82102f8f67711e8b772fe067c34b22cfb54d103))
* add license and deps task to git commit subtask ([8662b9d](https://github.com/kettil/carna/commit/8662b9d3acf9af595f892e218508c951bba1b052))

## [4.9.2](https://github.com/kettil/carna/compare/4.9.1...4.9.2) (2021-06-03)


### Bug Fixes

* **deps:** bump @kettil/eslint-config from 2.5.2 to 2.5.3 ([38babb5](https://github.com/kettil/carna/commit/38babb5caab7479b7f35198736bc1103b83432a5))

## [4.9.1](https://github.com/kettil/carna/compare/4.9.0...4.9.1) (2021-06-03)


### Bug Fixes

* **deps:** bump @kettil/eslint-config from 2.5.0 to 2.5.1 ([0a36e74](https://github.com/kettil/carna/commit/0a36e740732780aed7dcd8abb45a22243ca5bfe8))
* **deps:** bump @kettil/eslint-config from 2.5.1 to 2.5.2 ([4df8f88](https://github.com/kettil/carna/commit/4df8f8884792cf7c6c7e2d14602ded613fd4490e))
* **deps:** bump @types/istanbul-reports from 3.0.0 to 3.0.1 ([8eea7a5](https://github.com/kettil/carna/commit/8eea7a57f1c05f0e1c973f4329a46a22dd3cad59))
* **deps:** bump babel-jest from 27.0.1 to 27.0.2 ([8f6312f](https://github.com/kettil/carna/commit/8f6312f0c30a6e9506f51c7d59ec0f792a6f42e6))
* **deps:** bump jest from 27.0.1 to 27.0.3 ([2cda0ff](https://github.com/kettil/carna/commit/2cda0ffa84fc7aa260ff55a3916e83ebcd258de9))
* **deps:** bump jest from 27.0.3 to 27.0.4 ([2ad91bf](https://github.com/kettil/carna/commit/2ad91bf10fbe946a496d3de59e458134e9ce0c98))

# [4.9.0](https://github.com/kettil/carna/compare/4.8.0...4.9.0) (2021-05-31)


### Bug Fixes

* disabled the "verbose" and "runInBand" options in the git task ([c99b242](https://github.com/kettil/carna/commit/c99b242f6f8da5cc643cd6a89dc6939b804cb610))
* **deps:** bump @babel/preset-env from 7.14.2 to 7.14.4 ([17da7d1](https://github.com/kettil/carna/commit/17da7d1913c905ed3d8fa560c5045a26f736bcb8))
* **deps:** bump @kettil/eslint-config from 2.3.2 to 2.5.0 ([87a2147](https://github.com/kettil/carna/commit/87a214751476abcdedb8edba39f207db48d46e22))
* fix the wrong spinner status ([bbc0702](https://github.com/kettil/carna/commit/bbc070235e3562595f25cc64c1bfdc0585d1a1f0))


### Features

* add the folder "utils" (init-command) ([20840ac](https://github.com/kettil/carna/commit/20840ac0a45e18a6f91e6764d9336d3eed579816))

# [4.8.0](https://github.com/kettil/carna/compare/4.7.1...4.8.0) (2021-05-26)


### Bug Fixes

* **deps:** bump @kettil/eslint-config from 2.3.1 to 2.3.2 ([57a566b](https://github.com/kettil/carna/commit/57a566b0078becbd970226678b0f96d5add87b54))
* **deps:** bump babel-jest from 26.6.3 to 27.0.1 ([5243f61](https://github.com/kettil/carna/commit/5243f61ef7ee1b0e84706021bd4c4a32754a8d6d))
* **deps:** bump jest from 26.6.3 to 27.0.0 ([45f156b](https://github.com/kettil/carna/commit/45f156bb17f76bf8f104fd0a2d0209341bb986f3))
* **deps:** bump jest from 27.0.0 to 27.0.1 ([1fa0837](https://github.com/kettil/carna/commit/1fa0837b6c51ea402ff50fa8ecfa4a37bf979b86))


### Features

* build task integrated into the CI task ([6651e50](https://github.com/kettil/carna/commit/6651e5001bdf69b4a2e36db1b096ecf035820241))
* change the default coverage value ([67ccdd9](https://github.com/kettil/carna/commit/67ccdd93f51bfebb89cf78a091f480c3615a37d8))
* show the individual test results in CI mode ([094dd9d](https://github.com/kettil/carna/commit/094dd9d39398356218242f1701b4b29e2efd1bc1))

## [4.7.1](https://github.com/kettil/carna/compare/4.7.0...4.7.1) (2021-05-24)


### Bug Fixes

* the path to the babel config file was resolved incorrectly ([d3571df](https://github.com/kettil/carna/commit/d3571dfcb6acd3b345b6b5c6549a02fede162ca8))

# [4.7.0](https://github.com/kettil/carna/compare/4.6.1...4.7.0) (2021-05-24)


### Bug Fixes

* **deps:** bump @babel/cli from 7.13.16 to 7.14.3 ([05ca469](https://github.com/kettil/carna/commit/05ca469fd87e154537429b1ec5f5a493d477394d))
* **deps:** bump @babel/core from 7.14.2 to 7.14.3 ([26422aa](https://github.com/kettil/carna/commit/26422aaefdd4c7e284abe264a8356db79fe89172))
* **deps:** bump @babel/plugin-transform-runtime from 7.14.2 to 7.14.3 ([4348c4e](https://github.com/kettil/carna/commit/4348c4e5e384d098b3dd230d94554a055069c952))
* **deps:** bump @kettil/eslint-config from 2.2.1 to 2.2.2 ([ffe083d](https://github.com/kettil/carna/commit/ffe083db00233eeccf94551021e6703f72263955))
* **deps:** bump @kettil/eslint-config from 2.2.2 to 2.3.0 ([8981005](https://github.com/kettil/carna/commit/8981005a20a580d210bec08fa43fa7a052366721))
* **deps:** bump @kettil/eslint-config from 2.3.0 to 2.3.1 ([7109f9b](https://github.com/kettil/carna/commit/7109f9b5013513cbcb0febfda37b236e767fc750))
* **deps:** bump @kettil/semantic-release-config from 2.0.0 to 2.0.1 ([1db6748](https://github.com/kettil/carna/commit/1db6748a137d96fa74bc7cae3d7f5b765651573a))
* **deps:** bump @types/yargs from 16.0.1 to 16.0.2 ([97a74df](https://github.com/kettil/carna/commit/97a74df93a7f5e27c25caa498084550a8e95b10f))
* **deps:** bump @types/yargs from 16.0.2 to 17.0.0 ([df15a53](https://github.com/kettil/carna/commit/df15a532ee1a43ba5c105f2d6e47e8a7b67a2431))
* **deps:** bump eslint from 7.26.0 to 7.27.0 ([7774206](https://github.com/kettil/carna/commit/7774206a531b42b977b17f7954cf73cf380b678f))


### Features

* add __mock__ folder in shared ([6846841](https://github.com/kettil/carna/commit/6846841a9984fa5efc9c21dd6361d85b5b6d2485))
* add dummy pre/post test hooks ([e6b7298](https://github.com/kettil/carna/commit/e6b72987bf2289ee4d8da842c01f0e13274edbf4))
* add github issue templates ([5ea4ea6](https://github.com/kettil/carna/commit/5ea4ea692b7f1f408dca2d9171aaeccb3d5c02d0))
* add setupFilesAfterEnv config handler ([a7f2635](https://github.com/kettil/carna/commit/a7f26353e5f2e1ecb1db693b5416e239c20a2ae5))
* converting the git hook subcommand to a parameter ([e921d7c](https://github.com/kettil/carna/commit/e921d7c6657e40c96d16624f539e83a567aba7e3))

## [4.6.1](https://github.com/kettil/carna/compare/4.6.0...4.6.1) (2021-05-17)


### Bug Fixes

* **deps:** bump @babel/core from 7.14.0 to 7.14.2 ([2f35b01](https://github.com/kettil/carna/commit/2f35b01f65b8ca4e544f57b02a28e1d0c0f3201c))
* **deps:** bump @babel/node from 7.13.13 to 7.14.2 ([74793b8](https://github.com/kettil/carna/commit/74793b8f31898259c82d6d659c98f3cba972016b))
* **deps:** bump @babel/plugin-transform-runtime from 7.13.15 to 7.14.2 ([a9ec945](https://github.com/kettil/carna/commit/a9ec9454230bcfbbc883fa481d15bae994384268))
* **deps:** bump @babel/preset-env from 7.14.1 to 7.14.2 ([6c69051](https://github.com/kettil/carna/commit/6c69051c40d4d88a71ff9d6b263cefcca6726202))
* **deps:** bump @commitlint/cli from 12.1.1 to 12.1.3 ([ff3505d](https://github.com/kettil/carna/commit/ff3505de627492800a004e8479d6dbdf8b2d68da))
* **deps:** bump @commitlint/cli from 12.1.3 to 12.1.4 ([9902ae2](https://github.com/kettil/carna/commit/9902ae284ebfa0e9574db0caa5708969d2d211d7))
* **deps:** bump @kettil/eslint-config from 2.1.2 to 2.2.0 ([b5d76a4](https://github.com/kettil/carna/commit/b5d76a408f739ccc2dc87bc92b44f5d9a4e7278d))
* **deps:** bump @kettil/eslint-config from 2.2.0 to 2.2.1 ([7ad05f3](https://github.com/kettil/carna/commit/7ad05f3deb27b769a49f015b98cfc04b3a2a4250))
* **deps:** bump @types/semver from 7.3.5 to 7.3.6 ([619b666](https://github.com/kettil/carna/commit/619b6664d910b7b4d56943f9ee376ab6b15e4568))
* **deps:** bump depcheck from 1.4.0 to 1.4.1 ([a91618d](https://github.com/kettil/carna/commit/a91618d3e9cf15be85f4da49646b30ae6ac2f6b9))
* **deps:** bump eslint from 7.25.0 to 7.26.0 ([0960592](https://github.com/kettil/carna/commit/096059249685440d58deb933d453088b2428bd17))
* **deps:** bump prettier from 2.2.1 to 2.3.0 ([668b2ee](https://github.com/kettil/carna/commit/668b2ee8ffe71e1100dac80222621aba6b192089))
* **deps:** bump semantic-release from 17.4.2 to 17.4.3 ([f78d742](https://github.com/kettil/carna/commit/f78d7428daa70387187dd988d2b7ff2520c64579))

# [4.6.0](https://github.com/kettil/carna/compare/4.5.0...4.6.0) (2021-05-10)


### Bug Fixes

* **deps:** bump @babel/preset-env from 7.14.0 to 7.14.1 ([af55152](https://github.com/kettil/carna/commit/af55152b01518bc048f1050fcd447dfe73de7f08))
* **deps:** bump @kettil/tool-lib from 3.1.0 to 3.2.0 ([21e6e66](https://github.com/kettil/carna/commit/21e6e663e3968f614a4db5161f0312c2a9ae9303))
* **deps:** bump yargs from 16.2.0 to 17.0.0 ([46f2a43](https://github.com/kettil/carna/commit/46f2a4334d5f99b53f42d8feb6bf53b8b001288a))
* **deps:** bump yargs from 17.0.0 to 17.0.1 ([dd67a35](https://github.com/kettil/carna/commit/dd67a359d835dc3be178f94bb8ed4d6a09a3f00b))


### Features

* add different node versions (ci template) ([ad9df68](https://github.com/kettil/carna/commit/ad9df68d397b45df0bbf744fb9a4dd091892a349))

# [4.5.0](https://github.com/kettil/carna/compare/4.4.0...4.5.0) (2021-05-03)


### Bug Fixes

* **deps:** bump @kettil/eslint-config from 2.1.1 to 2.1.2 ([2760351](https://github.com/kettil/carna/commit/2760351b6cbe7aeae6af6e110ecc9b124c507e9d))
* post lifecycle was not executed on error ([b39a21b](https://github.com/kettil/carna/commit/b39a21b00120dd548705347173dd52d421dfa2ef))
* **deps:** bump @kettil/tool-lib from 3.0.0 to 3.1.0 ([169cb81](https://github.com/kettil/carna/commit/169cb814fdff1141feaf24608687d40eacb6756b))


### Features

* add start command ([#346](https://github.com/kettil/carna/issues/346)) ([a7fc317](https://github.com/kettil/carna/commit/a7fc31718f11ce5457cbc34106e72bcf5bddab85))
* update the init task ([7948ccf](https://github.com/kettil/carna/commit/7948ccfc45b316c1c451f31139dd107e186ab901))

# [4.4.0](https://github.com/kettil/carna/compare/4.3.0...4.4.0) (2021-04-30)


### Bug Fixes

* **deps:** bump @babel/core from 7.13.16 to 7.14.0 ([e2b9939](https://github.com/kettil/carna/commit/e2b9939762308ce7d230da7b2cdef7ac363962f1))
* **deps:** bump @babel/preset-env from 7.13.15 to 7.14.0 ([b0bb76e](https://github.com/kettil/carna/commit/b0bb76e3df223c6c4f8ee0d3231cd2bcc4d62919))
* **deps:** bump @kettil/eslint-config from 2.1.0 to 2.1.1 ([0530b31](https://github.com/kettil/carna/commit/0530b31b7774b85518ee30a5dd931530aa7c57f1))
* **deps:** bump @types/jest from 26.0.22 to 26.0.23 ([bd989f1](https://github.com/kettil/carna/commit/bd989f189f305369270f098fbf4fcab9422bca90))
* **deps:** bump @types/semver from 7.3.4 to 7.3.5 ([25fd485](https://github.com/kettil/carna/commit/25fd4852bd90372e7051c0e25347a2dcf585c484))


### Features

* add a lifecycle hook for the test projects ([332a62e](https://github.com/kettil/carna/commit/332a62e32947c56a4b00deaaf80912d03ce3f449))
* creation of code coverage has been optimized ([#337](https://github.com/kettil/carna/issues/337)) ([1cbb290](https://github.com/kettil/carna/commit/1cbb290e7e994507fb713dff86fec2ee345cde58)), closes [#335](https://github.com/kettil/carna/issues/335)

# [4.3.0](https://github.com/kettil/carna/compare/4.2.0...4.3.0) (2021-04-26)


### Bug Fixes

* **deps:** bump @kettil/commitlint-config from 1.0.1 to 2.0.0 ([99ae95c](https://github.com/kettil/carna/commit/99ae95c0ab01ecc193278322a2cfb06eaf013aa2))
* **deps:** bump @kettil/eslint-config from 1.17.2 to 2.1.0 ([f38126a](https://github.com/kettil/carna/commit/f38126a9bc0171f5ff93e506b3f6db134b0958b1))
* **deps:** bump @kettil/semantic-release-config from 1.3.0 to 2.0.0 ([583d33d](https://github.com/kettil/carna/commit/583d33def7c0433f59970f2e05043c3128760f82))


### Features

* add semver check ([#305](https://github.com/kettil/carna/issues/305)) ([67c542d](https://github.com/kettil/carna/commit/67c542d9bb47156302717a745440cd5006d282d0))

# [4.2.0](https://github.com/kettil/carna/compare/4.1.2...4.2.0) (2021-04-26)


### Bug Fixes

* remove eslint errors ([c14843c](https://github.com/kettil/carna/commit/c14843c67272298a61ea5737d886e8d7ed002f4e))
* remove the build task from the ci task ([4226b12](https://github.com/kettil/carna/commit/4226b126acbf8855ec8a5f35d311f9a17aea0d81))
* update .npmignore file ([f504cce](https://github.com/kettil/carna/commit/f504cce36257ae6f3b43d100ac767ffb0f28f1d7))
* **deps:** bump @kettil/tool-lib from 2.9.2 to 3.0.0 ([f165848](https://github.com/kettil/carna/commit/f1658489dac3ee4098bcd34c353d4f4e7e64c03a))


### Features

* add globalSetup and globalTeardown handling in the jest config ([d05c87a](https://github.com/kettil/carna/commit/d05c87af148187b8705337e7fa8cbd45231af5b2))
* add js extension to babel calling ([d96df79](https://github.com/kettil/carna/commit/d96df7940c7baaea98eb0202c3b21338e9b799d5))
* add the build task as subtask to the ci task ([5ca2838](https://github.com/kettil/carna/commit/5ca283806fbc9a467cf424fa4a6d42890499b52d))
* export only tasks ([db22d04](https://github.com/kettil/carna/commit/db22d040a0b08cead9ade345d9b741dc49893696))
* indentation of the output while spinners is active ([d2c2965](https://github.com/kettil/carna/commit/d2c2965ff8a03224ef55529ba88269351eeba0bf))
* update of the task description ([08ff2d9](https://github.com/kettil/carna/commit/08ff2d9ef513ec4fb12bf593be844a17803e0597))
* update packages.json config ([87bf36c](https://github.com/kettil/carna/commit/87bf36c616dffa4ca78e50e26eb06cca1c4c782f))

## [4.1.2](https://github.com/kettil/carna/compare/4.1.1...4.1.2) (2021-04-24)


### Bug Fixes

* **deps:** bump @kettil/eslint-config from 1.17.1 to 1.17.2 ([5d2b0e8](https://github.com/kettil/carna/commit/5d2b0e88cd79eb7b7cd2c4ddb7fa694d42302939))
* **deps:** bump eslint from 7.24.0 to 7.25.0 ([03dbb9d](https://github.com/kettil/carna/commit/03dbb9d9e4d950d6c68fcfaa77e2d5433b564f44))
* **deps:** bump table from 6.4.0 to 6.5.1 ([bb84b31](https://github.com/kettil/carna/commit/bb84b31a4e8161e62cadf189728852231a7bce24))

## [4.1.1](https://github.com/kettil/carna/compare/4.1.0...4.1.1) (2021-04-24)


### Bug Fixes

* add @babel/plugin-transform-runtime for testing needs ([3c8b26a](https://github.com/kettil/carna/commit/3c8b26a7e5775359ac929f2350c7c22b4aeae0dd))
* change the main/module hanlding in packages.json ([3f60d82](https://github.com/kettil/carna/commit/3f60d82034dbee51f69ef1ad68e8819e3c7ee8de))
* update dependabot and release action config ([cc86870](https://github.com/kettil/carna/commit/cc86870f70a42b6d17fd2c49d260800c87479bb2))

# [4.1.0](https://github.com/kettil/carna/compare/4.0.1...4.1.0) (2021-04-23)


### Bug Fixes

* add @types/node to the deps default ignore list ([ea81b39](https://github.com/kettil/carna/commit/ea81b3935fcaad0e07dcfd178a723b836285a8a4))


### Features

* simplification of the babel config ([aa5dc59](https://github.com/kettil/carna/commit/aa5dc59785e7551ef8fa3538e914ba7c922673fc))

## [4.0.1](https://github.com/kettil/carna/compare/4.0.0...4.0.1) (2021-04-23)


### Bug Fixes

* update release job ([3e380fe](https://github.com/kettil/carna/commit/3e380fe711f11af9dc46a55038b563a687ca661e))
* **deps:** bump @kettil/eslint-config from 1.16.3 to 1.17.1 ([59b3617](https://github.com/kettil/carna/commit/59b36176bda0cd041c5bfe70addd0b92d3bbee8d))
* **deps:** bump table from 6.3.2 to 6.3.4 ([6cd15aa](https://github.com/kettil/carna/commit/6cd15aa81249303cd144da0b3ec7719b9a19c746))
* **deps:** bump table from 6.3.4 to 6.4.0 ([50931fe](https://github.com/kettil/carna/commit/50931fe8702882511b67d8702ec5810dbfa53726))

# [4.0.0](https://github.com/kettil/carna/compare/3.1.1...4.0.0) (2021-04-22)


### Bug Fixes

* remove carna logo ([ba1ab8f](https://github.com/kettil/carna/commit/ba1ab8fd192a208f99901efcb063102a791adff6))
* **deps:** bump @babel/cli from 7.13.14 to 7.13.16 ([998e0b8](https://github.com/kettil/carna/commit/998e0b8e113711ea2969bae533b017d8fc22a839))
* **deps:** bump chalk from 4.1.0 to 4.1.1 ([82123b3](https://github.com/kettil/carna/commit/82123b35a8e316ecb150394e02f5c810147fb0dd))
* checks if the folders cwd, cfg and tpl are readable ([2d5cb02](https://github.com/kettil/carna/commit/2d5cb02ca493b368eafa96610466aaee77aeafa9))
* extend the deps ignore list ([c12f8f4](https://github.com/kettil/carna/commit/c12f8f495d51ffe18a5fd10b4bdd460425f97640))
* no error if no staged files are found ([d487587](https://github.com/kettil/carna/commit/d4875872177f1cc34974229736985a9d2ce196f9))
* **deps:** bump @babel/core from 7.13.15 to 7.13.16 ([3daf6f6](https://github.com/kettil/carna/commit/3daf6f6050dab0219303dcfda096f8860e017989))
* **deps:** bump table from 6.1.0 to 6.3.2 ([60909ab](https://github.com/kettil/carna/commit/60909ab7dd7490443f1fe7803cb3d21e2b1387a0))


### Features

* babel always converts to CommonJS and node v14 ([0c9616a](https://github.com/kettil/carna/commit/0c9616a3b999ab4efbb0766e75df82d2a9a3de5e))
* create a json test report in the ci command ([a26e281](https://github.com/kettil/carna/commit/a26e281cf009f6cc3034f20a04fe35f9169794da))
* remove git pre-push hook ([8d378c1](https://github.com/kettil/carna/commit/8d378c13a119503824aa2d049afb030aea9b91dc))
* remove webpack ([5244234](https://github.com/kettil/carna/commit/5244234cc5ae422bc4d772818588e0818fa567a3))
* run webpack only if the configuration file exists (build-command) ([01034e7](https://github.com/kettil/carna/commit/01034e7fd15fea931ca9721a7d66020d4c2f4e96))


### BREAKING CHANGES

* Webpack had no added value in the context of carna and so I removed it

## [3.1.1](https://github.com/kettil/carna/compare/3.1.0...3.1.1) (2021-04-19)


### Bug Fixes

* update template folder handling in .npmignore file ([315c5f5](https://github.com/kettil/carna/commit/315c5f50447e45d792344907b2c668ecb1221cea))

# [3.1.0](https://github.com/kettil/carna/compare/3.0.1...3.1.0) (2021-04-19)


### Bug Fixes

* **deps:** bump @kettil/semantic-release-config from 1.2.5 to 1.3.0 ([bff9299](https://github.com/kettil/carna/commit/bff9299436d23bd2e45d805cf5cfdc8646b18741))


### Features

* move some dev dependency into dependency ([ba0a18d](https://github.com/kettil/carna/commit/ba0a18d916988a6084ee43121a6a174aaa71988f))

## [3.0.1](https://github.com/kettil/carna/compare/3.0.0...3.0.1) (2021-04-19)


### Bug Fixes

* add .carnarc.json ([c7fff9a](https://github.com/kettil/carna/commit/c7fff9a46c46e8c29f36e67968cee81683c7ee38))

# [3.0.0](https://github.com/kettil/carna/compare/2.2.2...3.0.0) (2021-04-19)


### Bug Fixes

* **deps:** bump @kettil/semantic-release-config from 1.2.4 to 1.2.5 ([4cfdcb7](https://github.com/kettil/carna/commit/4cfdcb778e1593c8954e96295acf83ab6587eb69))
* wrong ci setting in the git commit task ([78f4040](https://github.com/kettil/carna/commit/78f40405fa527cbddd0d00baca1eb4a93e7f3150))
* **deps:** bump @kettil/eslint-config from 1.16.2 to 1.16.3 ([bfd49c9](https://github.com/kettil/carna/commit/bfd49c9f14011d1bb546ee8206f051b00f9bad19))
* **deps:** bump @kettil/tool-lib from 2.9.0 to 2.9.2 ([2db5a19](https://github.com/kettil/carna/commit/2db5a19f1bc51ebd3ca44272f761129b2e36c176))
* **deps:** bump @types/figlet from 1.5.0 to 1.5.1 ([f0cf27c](https://github.com/kettil/carna/commit/f0cf27c97adb256236330daf71e7431c0dcd1f30))
* change github ci cache key ([60584fb](https://github.com/kettil/carna/commit/60584fb9b7c8b62b357957df27da5d8157658771))
* remove jest ci config file ([8bf5d13](https://github.com/kettil/carna/commit/8bf5d13c301370fe6b4e111c6f5982f3644797f5))
* remove the verbose mode at jest ([0c65970](https://github.com/kettil/carna/commit/0c65970e3aac78c8d9022de114b5bc3c0dbf5445))
* remove typo on the option parser ([a8e7551](https://github.com/kettil/carna/commit/a8e75519ff5e3672a99f221a8ce3e200091e2f9b))
* rename dummy test files ([c992ef6](https://github.com/kettil/carna/commit/c992ef62e4874e02e0c5a9a9e18ee58bff7e2bcc))


### Features

* add a hook system ([#286](https://github.com/kettil/carna/issues/286)) ([fb23cdc](https://github.com/kettil/carna/commit/fb23cdc358bcb2d3b51a712e74053b8686373b08))
* add cache action in the github ci ([ac64359](https://github.com/kettil/carna/commit/ac64359389740c6e387902e40bc365d2faab4d1a))
* add ci command ([261634b](https://github.com/kettil/carna/commit/261634b8e170d6bf80244045b480605748280be0))
* add new test folder structure and template file ([bc81667](https://github.com/kettil/carna/commit/bc816673f984897f5fed9838d749c5edc2e8c074))
* add shared folder for tests ([3fde8f2](https://github.com/kettil/carna/commit/3fde8f291024af64c08722b82d0bf8832e7b1aa3))
* add test command ([b21c716](https://github.com/kettil/carna/commit/b21c716903b2202623f63bf283ede1153a9784d8))
* add test coverage mode to git commit task ([cb24e71](https://github.com/kettil/carna/commit/cb24e71ee0abf48d4dba3c0e96f2fedd21ef8a75))
* add the coverage mode at test command ([9179c9d](https://github.com/kettil/carna/commit/9179c9d40b86e3de446ce6a18b8ba114c5b09593))
* add verbose option (in ci context) when calling jest ([34bf2a5](https://github.com/kettil/carna/commit/34bf2a56ea0a70bf65eda6e6683d36cd39943495))
* adjustment of the config files for the test command ([6482f1e](https://github.com/kettil/carna/commit/6482f1e5de21e7b9f8482cf60c37000e1cf34dec))
* enable "strip-aliased" option from yargs ([84785ae](https://github.com/kettil/carna/commit/84785aeded66d43f6531fcbf8b3d37684fb505bd))
* rename command "lint" to "analyse" ([42b9a41](https://github.com/kettil/carna/commit/42b9a4102cec29bc5f842430a856dc0fdf469614))
* simplification of the jest configuration ([2dfc22c](https://github.com/kettil/carna/commit/2dfc22c50973a6a2f42088686b9aceec07725560))
* update Dependabot config files ([b2977de](https://github.com/kettil/carna/commit/b2977de2d63a56f7465049598a1685974d457f44))


### BREAKING CHANGES

* Simplifies the adding of test projects and the whole handling.
* The command "lint" is renamed to "analyse", as this better describes the task of the command.

## [2.2.2](https://github.com/kettil/carna/compare/2.2.1...2.2.2) (2021-04-19)


### Bug Fixes

* **deps:** bump @kettil/eslint-config from 1.16.1 to 1.16.2 ([0a5b497](https://github.com/kettil/carna/commit/0a5b497542b1af9586ad15bed980d737228d4efc))
* **deps:** bump table from 6.0.9 to 6.1.0 ([d63e5d2](https://github.com/kettil/carna/commit/d63e5d240408bf3dd848555b395f1cc83fc9fcf3))

## [2.2.1](https://github.com/kettil/carna/compare/2.2.0...2.2.1) (2021-04-12)


### Bug Fixes

* remove husky from installation list ([a7d14f4](https://github.com/kettil/carna/commit/a7d14f4fad06ff35c029c39667608876cad84a6d))

# [2.2.0](https://github.com/kettil/carna/compare/2.1.0...2.2.0) (2021-04-10)


### Bug Fixes

* add test files to the babel ignore list ([94e91fa](https://github.com/kettil/carna/commit/94e91fa4bf024a1f6c18a37787d2dd701de93494))


### Features

* removes the depency for the "--github" parameter ([ba687a7](https://github.com/kettil/carna/commit/ba687a7b4a701c5f1811f1b63a16e538c4ff7ffc))
* update in the job-matrix the node and os values ([ba92fd8](https://github.com/kettil/carna/commit/ba92fd8c51c4be4c9717a95a07db84f1d64460ec))

# [2.1.0](https://github.com/kettil/carna/compare/2.0.3...2.1.0) (2021-04-10)


### Bug Fixes

* **actions:** add an ignore file list for the direct eslint call ([22da0e0](https://github.com/kettil/carna/commit/22da0e0300db48c7473f496c04e947cce979b196))
* **deps:** bump @kettil/eslint-config from 1.14.2 to 1.16.1 ([830b292](https://github.com/kettil/carna/commit/830b2925619474f8d35e306019b90d3f071c0467))
* **deps:** bump @types/figlet from 1.2.1 to 1.5.0 ([719a6cb](https://github.com/kettil/carna/commit/719a6cbe3355fee2ed3e03999c570efab0205b7b))
* **deps:** bump commitlint from 12.0.1 to 12.1.1 ([5e35368](https://github.com/kettil/carna/commit/5e353688c715ab5405ef237c56c4fb7a701b7374))
* **deps:** bump eslint from 7.23.0 to 7.24.0 ([d993e54](https://github.com/kettil/carna/commit/d993e54149d04edd4e7ad2daaa602775a65a577c))
* **sequences:** change the spinner text from debcheck ([4672622](https://github.com/kettil/carna/commit/4672622f2be25cb1ac886780333320b56ff57885))
* **sequences:** disables type checking for JS only projects ([be4fa9e](https://github.com/kettil/carna/commit/be4fa9ecc3f05176ccfdb51e0ebe5f82f54452eb))
* **templates:** change in file .npmignore from ".huskyrc" to ".husky" ([2642fa3](https://github.com/kettil/carna/commit/2642fa365ae3473e6c7d3d38f8040e44c2922477))
* **templates:** remove unused tsc options ([7a38d6e](https://github.com/kettil/carna/commit/7a38d6e1dace3186c15d04a46e0f97ccebbdcd5a))
* add an "eslint-disable" comment to the templates ([85f7cdd](https://github.com/kettil/carna/commit/85f7cdd2074753de1154a6e1d642f79afb070bff))
* switch from "postinstall" to "prepare" ([fa508e2](https://github.com/kettil/carna/commit/fa508e28939b0b93157d7c3fe00df86ca3e4d2ec))


### Features

* add license command ([fa4c480](https://github.com/kettil/carna/commit/fa4c480650ce7e17fc7ecce4d369855bb00b3955)), closes [#251](https://github.com/kettil/carna/issues/251)
* integrate .depsignore into .carnarc.json ([dd2a7cd](https://github.com/kettil/carna/commit/dd2a7cd4c82d281aa1ecc796067f4575d8a04f9a))
* **sequences:** activate "husky" when initializing a project ([3b0c8d3](https://github.com/kettil/carna/commit/3b0c8d30ed40984e912cdb8250cca334eec0e601))
* **sequences:** ci mode can also be activated via env ([bbafbab](https://github.com/kettil/carna/commit/bbafbaba3d48f0817871c470c4cd06c3f3177042))
* **sequences:** optimization of the package checking ([0fce58e](https://github.com/kettil/carna/commit/0fce58e19ea6888ad5b931bc8c65f95c6556f065))

## [2.0.3](https://github.com/kettil/carna/compare/2.0.2...2.0.3) (2021-04-05)


### Bug Fixes

* **deps:** bump husky from 5.2.0 to 6.0.0 ([1b96e39](https://github.com/kettil/carna/commit/1b96e39a411a78d016384627b989ff57168093f8))

## [2.0.2](https://github.com/kettil/carna/compare/2.0.1...2.0.2) (2021-03-28)


### Bug Fixes

* move "husky install" script from postinstall to prepare ([f1d9b90](https://github.com/kettil/carna/commit/f1d9b906cc5bc5aec993503c787b0c46869f5a9f))

## [2.0.1](https://github.com/kettil/carna/compare/2.0.0...2.0.1) (2021-03-27)


### Bug Fixes

* folder can be initialized only once ([778d2ee](https://github.com/kettil/carna/commit/778d2eeed7244934b641931c8e9a75b3b2badefe))

# [2.0.0](https://github.com/kettil/carna/compare/1.4.22...2.0.0) (2021-03-27)


### Bug Fixes

* remove old husky config files ([2553c54](https://github.com/kettil/carna/commit/2553c54d5e6bfd4bd537a75f7ec467574bf70488))
* runs eslint/prettier only if files are present ([d9e0e31](https://github.com/kettil/carna/commit/d9e0e318a05fa3bdbe363bc6431bcb7172d761b5))
* **actions:** replace "--list-different" with "--format codeframe" in the eslint action ([f5c16c6](https://github.com/kettil/carna/commit/f5c16c66cdc40d489d2181a7a83957e366abed62))
* **deps:** bump @kettil/eslint-config from 1.9.10 to 1.14.2 ([5df6393](https://github.com/kettil/carna/commit/5df639357b1b10ad5a16fcbbfcd4240aaca29982))
* **deps:** bump @types/yargs from 16.0.0 to 16.0.1 ([180a211](https://github.com/kettil/carna/commit/180a2119579a1aed72e69e111379f39a7aa324c0))
* **deps:** bump eslint from 7.22.0 to 7.23.0 ([7713a8b](https://github.com/kettil/carna/commit/7713a8b1b85761d88675220b1895b6558a75bfc8))
* change javascript destination version to 12 ([b0a04de](https://github.com/kettil/carna/commit/b0a04dee96cbd522da49f8f97b75b61a370da0c3))


### Features

* **actions:** Add --save-exact to "npm install". ([98384c0](https://github.com/kettil/carna/commit/98384c0078ced538a5b865ea8c7aff758bc9d4dc))
* **actions:** remove tsc debug output ([a1ed5ea](https://github.com/kettil/carna/commit/a1ed5ea86dfe05e97629cf205219a1acc2a6a4d4))
* **actions:** warnings are handled as errors in eslint ([0283e6f](https://github.com/kettil/carna/commit/0283e6f629900168565e2bd7c55f9d8702917a04))
* **cli:** show "verbose" parameters in cli help menu ([5573812](https://github.com/kettil/carna/commit/5573812c9b82b90538747466f088184a7384e5cf))
* **config:** add the yaml extension to the prettier configuration ([ae1beb4](https://github.com/kettil/carna/commit/ae1beb4c29a783cc5654a090735d60a01f511d12))
* **config:** move the babel ignore parameters to the configuration file ([5a1ca4f](https://github.com/kettil/carna/commit/5a1ca4fa7c4952ab94c078e8bb22d73d78d8238b))
* **sequences:** adds the hook "push" to the command "git" ([84772f3](https://github.com/kettil/carna/commit/84772f3d41e0a30f23ae241d7457413e5647a476)), closes [#244](https://github.com/kettil/carna/issues/244)
* **sequences:** merging the "git:*" commands into one ([f542a03](https://github.com/kettil/carna/commit/f542a038c2dfa3a17670bae43d3311cb04383f9b)), closes [#249](https://github.com/kettil/carna/issues/249)
* **sequences:** type check during the lint check ([a37c85a](https://github.com/kettil/carna/commit/a37c85aa598bf31e6e360bbb7f4f4cd2f125a20c))
* update config files ([38b07fd](https://github.com/kettil/carna/commit/38b07fd7050b584488c88922f9a2983dee407ad2))
* update the husky configuration ([7b9eacc](https://github.com/kettil/carna/commit/7b9eacce1fd0ea83671570c8c5ccc3e6ea1f0e73))
* **sequences:** removes the switch in the lint process whether the ts types are correct. ([c7e7220](https://github.com/kettil/carna/commit/c7e72200f2bbc3732e2130ebeceafd4bb18dd8a2))


### BREAKING CHANGES

* **sequences:** By merging the "git:*" commands into one, the structure should be kept simple.
* Change in handling with husky

## [1.4.22](https://github.com/kettil/carna/compare/1.4.21...1.4.22) (2021-03-22)


### Bug Fixes

* **deps:** bump @kettil/semantic-release-config from 1.2.3 to 1.2.4 ([ebedb60](https://github.com/kettil/carna/commit/ebedb60b678a3df744bfdcb32d2198a639618d98))
* **deps:** bump ora from 5.3.0 to 5.4.0 ([ae9d381](https://github.com/kettil/carna/commit/ae9d38113a84184d6a56ece56cee44b6700f6a67))

## [1.4.21](https://github.com/kettil/carna/compare/1.4.20...1.4.21) (2021-03-15)


### Bug Fixes

* **deps:** bump @kettil/semantic-release-config from 1.2.2 to 1.2.3 ([4432c54](https://github.com/kettil/carna/commit/4432c54eeb7f908457658ecd0cdfcd537d1c4ddc))
* **deps:** bump @kettil/tool-lib from 2.8.0 to 2.9.0 ([c16365f](https://github.com/kettil/carna/commit/c16365fc854837152648ca27567650b74d88ca81))
* **deps:** bump eslint from 7.21.0 to 7.22.0 ([c79fcf3](https://github.com/kettil/carna/commit/c79fcf3968ff784f9042741bef55d1b3b71d222d))
* **deps:** bump semantic-release from 17.4.1 to 17.4.2 ([6e98406](https://github.com/kettil/carna/commit/6e98406c6d39ec5b3f8114bbe0234a0e308c6105))

## [1.4.20](https://github.com/kettil/carna/compare/1.4.19...1.4.20) (2021-03-08)


### Bug Fixes

* **deps:** bump @kettil/semantic-release-config from 1.2.1 to 1.2.2 ([eca2a2d](https://github.com/kettil/carna/commit/eca2a2def6a295c8528de60067261f0f9d654111))
* **deps:** bump semantic-release from 17.4.0 to 17.4.1 ([c4ffcb6](https://github.com/kettil/carna/commit/c4ffcb6c29582ad016e812baa50ff8eb50c140fa))

## [1.4.19](https://github.com/kettil/carna/compare/1.4.18...1.4.19) (2021-03-01)


### Bug Fixes

* **deps:** bump commitlint from 11.0.0 to 12.0.1 ([83931bd](https://github.com/kettil/carna/commit/83931bdad76d4d1fa2b4fe4b36d27a5934b2fd9f))
* **deps:** bump eslint from 7.20.0 to 7.21.0 ([043839a](https://github.com/kettil/carna/commit/043839a3a6baadf0753d6648b7f08cd8859a70db))
* **deps:** bump semantic-release from 17.3.9 to 17.4.0 ([8c99abd](https://github.com/kettil/carna/commit/8c99abd0a51e6366fa8a0f52fb6d467790076400))

## [1.4.18](https://github.com/kettil/carna/compare/1.4.17...1.4.18) (2021-02-22)


### Bug Fixes

* **deps:** bump @kettil/semantic-release-config from 1.0.11 to 1.0.12 ([e342f14](https://github.com/kettil/carna/commit/e342f144d263ad9b09b399e8893d358b5f8fa3ba))
* **deps:** bump @kettil/semantic-release-config from 1.0.12 to 1.2.1 ([4405c5b](https://github.com/kettil/carna/commit/4405c5b0d22e23e6a6464cc897b2b45ceeb536cd))
* **deps:** bump depcheck from 1.3.1 to 1.4.0 ([2dea85f](https://github.com/kettil/carna/commit/2dea85f4eacaf6950c7e3f640e1e16f0f8211c0b))

## [1.4.17](https://github.com/kettil/carna/compare/1.4.16...1.4.17) (2021-02-15)


### Bug Fixes

* **deps:** bump eslint from 7.19.0 to 7.20.0 ([a11c64e](https://github.com/kettil/carna/commit/a11c64e8dc438adf16db78662b200db1c9bee001))
* **deps:** bump semantic-release from 17.3.7 to 17.3.9 ([51469fb](https://github.com/kettil/carna/commit/51469fb8d99a146b7e954a3d90af3a53069371a8))

## [1.4.16](https://github.com/kettil/carna/compare/1.4.15...1.4.16) (2021-02-01)


### Bug Fixes

* **deps:** bump @kettil/semantic-release-config from 1.0.10 to 1.0.11 ([e3012ee](https://github.com/kettil/carna/commit/e3012ee9836563b14f85487fd59f8f7b408d94e0))
* **deps:** bump @types/yargs from 15.0.12 to 16.0.0 ([9d84ab4](https://github.com/kettil/carna/commit/9d84ab412755d6edfd68f854c17d14981290ec95))
* **deps:** bump eslint from 7.17.0 to 7.18.0 ([c5bcaf1](https://github.com/kettil/carna/commit/c5bcaf1bbd903f1e55f346ce0c55d83b225cd1a8))
* **deps:** bump eslint from 7.18.0 to 7.19.0 ([643cf97](https://github.com/kettil/carna/commit/643cf97c213875a17919152447a62f47fa51cb46))
* **deps:** bump ora from 5.2.0 to 5.3.0 ([1ed9c4b](https://github.com/kettil/carna/commit/1ed9c4be1d73b32f4f7736396e4da4a39f09b7e4))
* **deps:** bump semantic-release from 17.3.1 to 17.3.7 ([4e65e2c](https://github.com/kettil/carna/commit/4e65e2c6814c5b98b537404fe0aff549991cb842))

## [1.4.15](https://github.com/kettil/carna/compare/1.4.14...1.4.15) (2021-01-11)


### Bug Fixes

* **deps:** bump @kettil/eslint-config from 1.9.9 to 1.9.10 ([b79da0f](https://github.com/kettil/carna/commit/b79da0f87c1104cff334c8176b9abf9153c2809a))

## [1.4.14](https://github.com/kettil/carna/compare/1.4.13...1.4.14) (2021-01-04)


### Bug Fixes

* **deps:** bump @kettil/eslint-config from 1.9.5 to 1.9.9 ([4bd38be](https://github.com/kettil/carna/commit/4bd38bebda290d879bcb83ebee653972331ccc99))
* **deps:** bump @kettil/semantic-release-config from 1.0.9 to 1.0.10 ([67b5487](https://github.com/kettil/carna/commit/67b5487ceefa727d6eed5c050be109f7bf942df1))
* **deps:** bump eslint from 7.15.0 to 7.17.0 ([148d0d5](https://github.com/kettil/carna/commit/148d0d50da2c4b2f51dce309dc7caf4bfe345889))
* **deps:** bump ora from 5.1.0 to 5.2.0 ([dfad3b7](https://github.com/kettil/carna/commit/dfad3b755de3de276cf2694df6fb653c652b92c1))

## [1.4.13](https://github.com/kettil/carna/compare/1.4.12...1.4.13) (2021-01-04)


### Bug Fixes

* **deps:** bump semantic-release from 17.3.0 to 17.3.1 ([a45c265](https://github.com/kettil/carna/commit/a45c26555d9045ad0d06414e75fa7d0bb89455c9))

## [1.4.12](https://github.com/kettil/carna/compare/1.4.11...1.4.12) (2020-12-15)


### Bug Fixes

* **deps:** bump @types/yargs from 15.0.11 to 15.0.12 ([0fa243f](https://github.com/kettil/carna/commit/0fa243fb82fdd16278c50f6a78841cb8251d4f5e))

## [1.4.11](https://github.com/kettil/carna/compare/1.4.10...1.4.11) (2020-12-15)


### Bug Fixes

* **deps:** bump @kettil/tool-lib from 2.7.0 to 2.8.0 ([341111d](https://github.com/kettil/carna/commit/341111d110e821b246cb16cde8859b483723f0be))

## [1.4.10](https://github.com/kettil/carna/compare/1.4.9...1.4.10) (2020-12-15)


### Bug Fixes

* **deps:** bump @kettil/eslint-config from 1.9.2 to 1.9.5 ([0fc17ad](https://github.com/kettil/carna/commit/0fc17ade8736c5ee28fd3570c7f582ef99a27f00))

## [1.4.9](https://github.com/kettil/carna/compare/1.4.8...1.4.9) (2020-12-09)


### Bug Fixes

* **deps:** bump @kettil/eslint-config from 1.9.1 to 1.9.2 ([2f671e6](https://github.com/kettil/carna/commit/2f671e6a103f693b0dd49c8906374fc5a658da86))

## [1.4.8](https://github.com/kettil/carna/compare/1.4.7...1.4.8) (2020-12-09)


### Bug Fixes

* **deps:** bump eslint from 7.14.0 to 7.15.0 ([3188785](https://github.com/kettil/carna/commit/3188785ab39795c1fd0d539ef9fb645e1757b080))

## [1.4.7](https://github.com/kettil/carna/compare/1.4.6...1.4.7) (2020-12-08)


### Bug Fixes

* **deps:** bump yargs from 16.1.1 to 16.2.0 ([4087878](https://github.com/kettil/carna/commit/40878781da71426494ec674cef75b923ff21377c))

## [1.4.6](https://github.com/kettil/carna/compare/1.4.5...1.4.6) (2020-12-08)


### Bug Fixes

* **deps:** bump @kettil/eslint-config from 1.8.0 to 1.9.1 ([9050a49](https://github.com/kettil/carna/commit/9050a49326f7ef72a05e37dbe0ccee2fec8b0e22))

## [1.4.5](https://github.com/kettil/carna/compare/1.4.4...1.4.5) (2020-12-02)


### Bug Fixes

* **deps:** bump @kettil/eslint-config from 1.7.1 to 1.8.0 ([4eb34fe](https://github.com/kettil/carna/commit/4eb34fe977fb1259ec8eac591c90a08c5f838d09))
* **deps:** bump @types/yargs from 15.0.10 to 15.0.11 ([29ab95d](https://github.com/kettil/carna/commit/29ab95da8be898aabbc3d7538c988957700701c6))

## [1.4.4](https://github.com/kettil/carna/compare/1.4.3...1.4.4) (2020-12-02)


### Bug Fixes

* **deps:** bump @kettil/eslint-config from 1.7.0 to 1.7.1 ([ab17965](https://github.com/kettil/carna/commit/ab17965e1d42f584a0eda9f45759d90492dfd588))

## [1.4.3](https://github.com/kettil/carna/compare/1.4.2...1.4.3) (2020-12-01)


### Bug Fixes

* **deps:** bump @kettil/eslint-config from 1.6.11 to 1.7.0 ([f91836b](https://github.com/kettil/carna/commit/f91836bdebc0f8f4afd19b087f63a874c9dd8b03))

## [1.4.2](https://github.com/kettil/carna/compare/1.4.1...1.4.2) (2020-12-01)


### Bug Fixes

* **deps:** bump prettier from 2.2.0 to 2.2.1 ([3c243f6](https://github.com/kettil/carna/commit/3c243f6ea96ab264801e81544d67539be7d3eb6b))

## [1.4.1](https://github.com/kettil/carna/compare/1.4.0...1.4.1) (2020-11-27)


### Bug Fixes

* **deps:** bump @kettil/eslint-config from 1.6.10 to 1.6.11 ([9813267](https://github.com/kettil/carna/commit/98132674d8bf10a7cb6ecc94ea9cf8beecb7381d))

# [1.4.0](https://github.com/kettil/carna/compare/1.3.7...1.4.0) (2020-11-26)


### Features

* **config:** add support for lerna ([5cfc50f](https://github.com/kettil/carna/commit/5cfc50f160ca16c68c6af74be3670902c26c7be0))
* **config:** change the webpack handling ([8635526](https://github.com/kettil/carna/commit/86355262e378f0b3e2be7640cbe8503107e706cc))
* **debs:** add the command debs ([def0453](https://github.com/kettil/carna/commit/def0453b699e1fc5c7f3ce289771427fa838ef63))

## [1.3.7](https://github.com/kettil/carna/compare/1.3.6...1.3.7) (2020-11-26)


### Bug Fixes

* **deps:** bump @kettil/eslint-config from 1.6.9 to 1.6.10 ([ebb3e5e](https://github.com/kettil/carna/commit/ebb3e5e338813569163b8ed23a63b8f774167bea))

## [1.3.6](https://github.com/kettil/carna/compare/1.3.5...1.3.6) (2020-11-25)


### Bug Fixes

* **deps:** bump @kettil/eslint-config from 1.6.8 to 1.6.9 ([972a35b](https://github.com/kettil/carna/commit/972a35b83742e941f7c9ae9c648a5f0e4a5685a1))

## [1.3.5](https://github.com/kettil/carna/compare/1.3.4...1.3.5) (2020-11-24)


### Bug Fixes

* **deps:** bump @kettil/eslint-config from 1.6.5 to 1.6.8 ([b3a0c01](https://github.com/kettil/carna/commit/b3a0c0100c42735c58c519d711288715a1e291c5))

## [1.3.4](https://github.com/kettil/carna/compare/1.3.3...1.3.4) (2020-11-24)


### Bug Fixes

* **deps:** bump @kettil/semantic-release-config from 1.0.8 to 1.0.9 ([77c8edf](https://github.com/kettil/carna/commit/77c8edf73184ecfc27bc1bc25475aee47a39c26d))

## [1.3.3](https://github.com/kettil/carna/compare/1.3.2...1.3.3) (2020-11-24)


### Bug Fixes

* **deps:** bump yargs from 16.1.0 to 16.1.1 ([3e508b4](https://github.com/kettil/carna/commit/3e508b4c699a24e4b794e1555c480cfe102b6da0))

## [1.3.2](https://github.com/kettil/carna/compare/1.3.1...1.3.2) (2020-11-24)


### Bug Fixes

* **deps:** bump semantic-release from 17.2.3 to 17.3.0 ([e11afce](https://github.com/kettil/carna/commit/e11afce39ed908540593a309710f5157edde17c7))

## [1.3.1](https://github.com/kettil/carna/compare/1.3.0...1.3.1) (2020-11-24)


### Bug Fixes

* **deps:** bump prettier from 2.1.2 to 2.2.0 ([2a66604](https://github.com/kettil/carna/commit/2a66604350382e02f1ec7ab4207bf51b2fcc3086))

# [1.3.0](https://github.com/kettil/carna/compare/1.2.0...1.3.0) (2020-11-22)


### Bug Fixes

* **actions:** add --list-different argument ([52e1ecc](https://github.com/kettil/carna/commit/52e1ecca17f245740f4017e0cb30bfd3819138e7))
* **actions:** no outDir argument for type check ([846f149](https://github.com/kettil/carna/commit/846f14936505530dbb4096707c1a6f9dda13a56e))
* **sequences:** add missing try-catch block ([1400967](https://github.com/kettil/carna/commit/1400967f46afc68e15c2ccc710aeff4425123945))
* **templates:** extend @babel/env config ([de3a807](https://github.com/kettil/carna/commit/de3a807fe3622a07a6c30625ba7a80b7ae8871fb))


### Features

* **template:** add baseUrl and paths to tsconfig ([066e8b7](https://github.com/kettil/carna/commit/066e8b7e5c11c27e5f83d96a43e52fa621292bee))

# [1.2.0](https://github.com/kettil/carna/compare/1.1.6...1.2.0) (2020-11-21)


### Bug Fixes

* **config:** update npmignore with test files ([68bb70f](https://github.com/kettil/carna/commit/68bb70faff978782b98f3e46110367f6e2380cdd))
* **deps:** bump @kettil/eslint-config from 1.4.12 to 1.6.2 ([16f0184](https://github.com/kettil/carna/commit/16f01843fc020a17187bd14276bf7141db98a558))
* **deps:** bump @kettil/eslint-config from 1.6.2 to 1.6.3 ([245974d](https://github.com/kettil/carna/commit/245974db73a10d63224a8a10a0cb455b410afd97))
* **deps:** bump @kettil/eslint-config from 1.6.3 to 1.6.5 ([f903b3e](https://github.com/kettil/carna/commit/f903b3ee6012aca0e0cbc35c8c8479ae72590988))
* **deps:** bump @kettil/semantic-release-config from 1.0.5 to 1.0.8 ([1ac689e](https://github.com/kettil/carna/commit/1ac689e2199f980ef59cb6ca7a4f384e80310271))
* **deps:** bump @types/figlet from 1.2.0 to 1.2.1 ([6cc1132](https://github.com/kettil/carna/commit/6cc1132bbb540fbcd8aad6df337781cfcccd1130))
* **deps:** bump @types/yargs from 15.0.5 to 15.0.10 ([1efa2a8](https://github.com/kettil/carna/commit/1efa2a8ccf21678eaa94e0ed011e11655d89f4c9))
* **deps:** bump eslint from 7.11.0 to 7.13.0 ([b226088](https://github.com/kettil/carna/commit/b2260881fb21bcc207f07dce50ee1ee4fa64a425))
* **deps:** bump eslint from 7.13.0 to 7.14.0 ([4f34e65](https://github.com/kettil/carna/commit/4f34e656e63c240762e617c82a9614cd03a66993))
* **deps:** bump semantic-release from 17.1.1 to 17.2.3 ([98fe3c3](https://github.com/kettil/carna/commit/98fe3c3ac9931caad5967b4f64da316caae3248e))
* update existConfigFile() ([5335972](https://github.com/kettil/carna/commit/5335972e03844454fb8b105e38c93612d1535803))
* **deps:** bump prettier from 2.1.1 to 2.1.2 ([a6e023b](https://github.com/kettil/carna/commit/a6e023b655ddde620dc8c23e5e4798752f39d7e5))


### Features

* add build command ([284a77c](https://github.com/kettil/carna/commit/284a77cb1f92d73e71298de7f7a77861650f16bf))

## [1.1.6](https://github.com/kettil/carna/compare/1.1.5...1.1.6) (2020-10-22)


### Bug Fixes

* **deps:** bump @kettil/semantic-release-config from 1.0.4 to 1.0.5 ([8394c60](https://github.com/kettil/carna/commit/8394c604a6cd04dd0e8483a4e60d6e9d45fb4a75))

## [1.1.5](https://github.com/kettil/carna/compare/1.1.4...1.1.5) (2020-10-22)


### Bug Fixes

* **deps:** bump eslint from 7.7.0 to 7.11.0 ([ecf852f](https://github.com/kettil/carna/commit/ecf852f607e0d79b3eb1c8f3cff866f456ed95e6))
* **deps:** bump yargs from 15.4.1 to 16.1.0 ([0dd67bb](https://github.com/kettil/carna/commit/0dd67bb85f7444ec44c11c2c4393a79ae69aae9e))

## [1.1.4](https://github.com/kettil/carna/compare/1.1.3...1.1.4) (2020-10-21)


### Bug Fixes

* **deps:** bump commitlint from 9.1.2 to 11.0.0 ([a35a262](https://github.com/kettil/carna/commit/a35a26238f6997f230524d86ff25e82d90df5d48))
* **deps:** bump ora from 5.0.0 to 5.1.0 ([f872347](https://github.com/kettil/carna/commit/f872347cb094c163326a07b91d7deda0bf06acc3))

## [1.1.3](https://github.com/kettil/carna/compare/1.1.2...1.1.3) (2020-09-01)


### Bug Fixes

* **config:** update the jest config ([f03885b](https://github.com/kettil/carna/commit/f03885b105915fb8234446f4b941e2187733012a))

## [1.1.2](https://github.com/kettil/carna/compare/1.1.1...1.1.2) (2020-09-01)


### Bug Fixes

* **config:** add missing module.exports ([f34b9a2](https://github.com/kettil/carna/commit/f34b9a2d8fc9ca294dbcb00fd28e3d5b049b4c49))
* **config:** update jest config and handling ([afd9b8d](https://github.com/kettil/carna/commit/afd9b8d53e825731a365356edfd202c6d72bd037))
* **deps:** bump @kettil/eslint-config from 1.4.8 to 1.4.12 ([79b98b0](https://github.com/kettil/carna/commit/79b98b0dab8439c5655d8e2a1d247ad2aacfcb76))

## [1.1.1](https://github.com/kettil/carna/compare/1.1.0...1.1.1) (2020-08-31)


### Bug Fixes

* **config:** Move path config into locale file ([ca66617](https://github.com/kettil/carna/commit/ca6661760bfe44a3a5fb544422ff0a03f2de9fa7))
* move the logo function to a separate file ([8a5d8ba](https://github.com/kettil/carna/commit/8a5d8ba201deb40a56c14bda36e89e5c543532ca))

# [1.1.0](https://github.com/kettil/carna/compare/1.0.5...1.1.0) (2020-08-31)


### Bug Fixes

* **config:** remove paths from typescript config ([8f12272](https://github.com/kettil/carna/commit/8f122727842190a442fec52db9727a05ea05ed67))


### Features

* **init:** update the init command ([cbf6810](https://github.com/kettil/carna/commit/cbf681062dfcf6b3b601d4f404db02fc5ce449d8))

## [1.0.5](https://github.com/kettil/carna/compare/1.0.4...1.0.5) (2020-08-27)


### Bug Fixes

* **deps:** bump @kettil/eslint-config from 1.4.5 to 1.4.8 ([c087b1e](https://github.com/kettil/carna/commit/c087b1eae5c0fe4ef112176c22a96ab1dc208454))

## [1.0.4](https://github.com/kettil/carna/compare/1.0.3...1.0.4) (2020-08-27)


### Bug Fixes

* **deps:** bump prettier from 2.0.5 to 2.1.1 ([d99f5ff](https://github.com/kettil/carna/commit/d99f5ff5ba5054e6d84b57cfde2dbb244c4989a8))

## [1.0.3](https://github.com/kettil/carna/compare/1.0.2...1.0.3) (2020-08-23)


### Bug Fixes

* add a epilogue ([fd5c40a](https://github.com/kettil/carna/commit/fd5c40ab96868784a14a8214a9efb042fd052ecb))
* **lint:** add option descriptions ([f534b3a](https://github.com/kettil/carna/commit/f534b3ae8edd2ea63bfb56fcba454e4509325295))

## [1.0.2](https://github.com/kettil/carna/compare/1.0.1...1.0.2) (2020-08-22)


### Bug Fixes

* **deps:** bump @kettil/eslint-config from 1.4.3 to 1.4.5 ([dbcd264](https://github.com/kettil/carna/commit/dbcd264f2a149480cacefe875855d2e38211cfaa))
* **deps:** bump commitlint from 9.1.0 to 9.1.2 ([a3c1aa5](https://github.com/kettil/carna/commit/a3c1aa5c5a1ed46f5d92661ebb7504c44241916b))

## [1.0.1](https://github.com/kettil/carna/compare/1.0.0...1.0.1) (2020-08-22)


### Bug Fixes

* **deps:** bump eslint from 7.6.0 to 7.7.0 ([e32b6bc](https://github.com/kettil/carna/commit/e32b6bc5e062821c1941c8ff875272178d742cee))

# 1.0.0 (2020-08-21)


### Bug Fixes

* **config:** switch from master to main ([bcf6986](https://github.com/kettil/carna/commit/bcf69869bdaaa82214da489e674e470a7def19a4))
* **deps:** bump @kettil/semantic-release-config from 1.0.3 to 1.0.4 ([eda3547](https://github.com/kettil/carna/commit/eda35472fe6ca2bc38556c267ef33e6465d8a935))


### Features

* 🐣 ([59b26c1](https://github.com/kettil/carna/commit/59b26c1473a675ba8937e4a5a03793cfd4c4aefa))
