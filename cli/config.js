const path = require("path");
const convict = require('convict');

const configPath = path.join(__dirname, 'testnet.config.json');

// Define a schema
const config = convict({
  apiSettings: {
    hostUrl: {
      doc: 'The burst nodes host address.',
      format: 'url',
      default: 'http://testnet.getburst.net:6876',
      env: 'API_HOST_URL',
    },
    apiRootUrl: {
      doc: 'The root path of the node Api',
      format: String,
      default: 'burst',
      env: "API_ROOT_PATH",
    }
  },
  test: {
    doc: 'The root path of the node Api',
    format: String,
    default: 'burst',
    env: "API_ROOT_PATH",
  }


});

//config.loadFile(configPath);

config.validate()

module.exports = config;
