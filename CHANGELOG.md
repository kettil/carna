# Changelog

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
