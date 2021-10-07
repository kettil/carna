const { createJestConfig, createJestProject } = require('./build');

module.exports = createJestConfig(__dirname, {
  projects: [
    // => colors: red green yellow blue magenta cyan gray
    createJestProject({ testFolder: 'unit', color: 'cyan', customeConfig: {} }),
    createJestProject({ testFolder: 'integration', color: 'magenta', customeConfig: {} }),
  ],

  // extend options for this project
});
