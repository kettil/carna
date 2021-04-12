const { projects, config } = require('./configs/jest.config.js');

Object.assign(projects.unit, {
  // extend options for unit tests
});

Object.assign(projects.integration, {
  // extend options for integration tests
});

Object.assign(projects.e2e, {
  // extend options for e2e tests
});

module.exports = Object.assign(config, {
  projects: Object.values(projects),
  // extend options for this project

  coverageThreshold: {
    global: {
      statements: 0,
      branches: 0,
      functions: 0,
      lines: 0,
    },
  },
});
