exports.config = {
  
  framework: 'jasmine',
  specs: [
      'spec/**/*.js'
  ],
  capabilities: {
      browserName: 'chrome'
  },
  jasmineNodeOpts: {
    showColors: true // Use colors in the command line report.
  }
};
