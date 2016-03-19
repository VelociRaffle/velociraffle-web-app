import { Logger, transports } from 'winston';
import config from '../config';

const logger = new Logger({
  transports: [
    new (transports.Console)({
      level: config.logLevel,
      colorize: true
    })
  ]
});

export default logger;
