import path from 'path';
import express from 'express';
import errors from 'common-errors';
import favicon from 'serve-favicon';

import config from './config';
import { connectDb } from './util/db';
import appMiddleware from './middleware/app';

// TODO: add api and auth
// import api from './api';
// import auth from './auth/routes';

const { errorHandler } = errors.middleware;

const app = express();

// start db
connectDb(config.db.url);

// load middlewares
appMiddleware(app);

app.set('views', path.join(__dirname, '../../dist'));
app.use(express.static(path.join(__dirname, '../../dist')));
app.use(favicon(path.join(__dirname, '../../favicon.ico')));

// TODO: add api routes
// app.use('/api', api);
// app.use('/auth', auth);

app.get('*', (req, res) => res.render('index'));

app.use(errorHandler);

export default app;
