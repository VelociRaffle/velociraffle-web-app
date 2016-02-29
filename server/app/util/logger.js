import { Logger, transports } from 'winston';
import config from '../config';

const logger = new Logger({
  transports: [
    new (transports.Console)({
      level: config.logLevel,
      colorize: true
    })
    /* new (transports.File)()({ filename: 'somefile.log' }) */
  ]
});

export default logger;
