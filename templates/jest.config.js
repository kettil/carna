const { projects, config } = require('./node_modules/carna/configs/jest.config.js');

Object.assign(projects.unit, {
  // extend options for unit tests
});

Object.assign(projects.integration, {
  // extend options for integration tests
});

module.exports = Object.assign(config, {
  projects: Object.values(projects),
  // extend options for this project
});
