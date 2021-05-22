const { config, createProject } = require('./configs/jest.config.js');

module.exports = Object.assign(config, {
  projects: [
    // createProject('<foldername>', '<color>', { /* extend config */})
    // => colors: red green yellow blue magenta cyan gray
    createProject('unit', 'cyan', {}),
    createProject('integration', 'magenta', {}),
  ],

  // extend options for this project
});
