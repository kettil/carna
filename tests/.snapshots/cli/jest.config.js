/* eslint-disable import/no-extraneous-dependencies */
const { projects, config } = require('carna/configs/jest.config.js');

Object.assign(projects.unit, {
  // extend options for unit tests
});

Object.assign(projects.integration, {
  // extend options for integration tests
});

module.exports = Object.assign(config, {
  projects: Object.values(projects),
  // extend options for this project

  // ####################
  // Temporary entry for the project start
  coverageThreshold: {
    global: {
      statements: 0,
      branches: 0,
      functions: 0,
      lines: 0,
    },
  },
  // ####################
});
