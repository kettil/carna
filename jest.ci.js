/* eslint-disable import/no-unused-modules, node/global-require */

// export modified jest config
module.exports = {
  ...require('./jest.json'),
  coverageReporters: ['text-summary'],
};
