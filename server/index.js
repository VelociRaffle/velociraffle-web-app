import app from './app';
import config from './app/config';
import logger from './app/util/logger';

app.listen(config.port);
logger.info(`⚡⚡  Listening on localhost:${config.port} ⚡⚡`);
