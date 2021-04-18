/* eslint-disable import/no-extraneous-dependencies */
const { config, createProject } = require('carna/configs/jest.config.js');

module.exports = Object.assign(config, {
  projects: [
    // createProject('<foldername>', '<color>', { /* extend config */})
    // => colors: red green yellow blue magenta cyan gray
    createProject('unit', 'cyan', {}),
    createProject('integration', 'magenta', {}),
    createProject('e2e', 'yellow', {}),
  ],

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
