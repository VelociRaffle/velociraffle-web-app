import mongoose from 'mongoose';
import logger from './logger';

export const connectDb = dbUrl => {
  mongoose.connect(dbUrl);

  // Mongo connection events
  mongoose.connection.on('connected', () => {
    logger.info(`💾  Mongo connected to ${dbUrl}`);
  });
  mongoose.connection.on('error', err => {
    logger.error('💾  Mongo connection error:', err);
  });
  mongoose.connection.on('disconnected', () => {
    logger.info('💾  Mongo disconnected');
  });

  // To be called when process is restarted or terminated
  const gracefulShutdown = (msg, callback) => {
    mongoose.connection.close(() => {
      logger.info(`💾  Mongo disconnected through ${msg}`);
      callback();
    });
  };

  // For nodemon restarts
  process.once('SIGUSR2', () => {
    gracefulShutdown(
      'nodemon restart', () => process.kill(process.pid, 'SIGUSR2')
    );
  });

  // For app termination
  process.on('SIGINT', () => {
    gracefulShutdown('app termination', () => process.exit(0));
  });

  // For Heroku app termination
  process.on('SIGTERM', () => {
    gracefulShutdown('Heroku app termination', () => process.exit(0));
  });
};
