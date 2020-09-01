const { ciThreshold } = require('./node_modules/carna/configs/jest.config.js');

module.exports = Object.assign(require('./jest.config.js'), {
  coverageThreshold: ciThreshold,
  coverageReporters: ['text'],
});
