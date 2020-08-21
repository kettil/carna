/* eslint-disable import/no-unused-modules, node/global-require */
const config = require('./jest.json');

// export modified jest config
module.exports = { ...config, coverageReporters: ['text-summary'] };
