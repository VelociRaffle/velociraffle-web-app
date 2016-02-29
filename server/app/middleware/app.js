import morgan from 'morgan';
import bodyParser from 'body-parser';
import errors from 'common-errors';
import helmet from 'helmet';

const { urlencoded, json } = bodyParser;
const { crashProtector } = errors.middleware;

export default (app) => {
  app.use(morgan('dev'));
  app.use(urlencoded({ extended: true }));
  app.use(json());
  app.use(crashProtector());
  app.use(helmet());
};
