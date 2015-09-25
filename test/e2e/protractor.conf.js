exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    'scenario/*.js'
  ],

  capabilities: {
    'browserName': 'firefox'
  },

  baseUrl: 'http://localhost:9001/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
