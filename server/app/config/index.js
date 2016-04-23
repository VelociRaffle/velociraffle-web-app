import merge from 'lodash/merge';

const config = {
  dev: 'development',
  test: 'testing',
  stage: 'staging',
  prod: 'production',
  port: process.env.PORT || 5000,
  expireTime: process.env.EXPIRE_TIME,
  secrets: {
    jwt: process.env.JWT
  }
};

// sets NODE_ENV to config.dev if not set
process.env.NODE_ENV = process.env.NODE_ENV || config.dev;
config.env = process.env.NODE_ENV;

let envConfig;

// pulls in config file based on NODE_ENV (config.env)
try {
  envConfig = require('./env/' + config.env);
  envConfig = envConfig.default || {};
} catch (e) {
  envConfig = {};
}

// merges config with envConfig
export default merge(config, envConfig);
