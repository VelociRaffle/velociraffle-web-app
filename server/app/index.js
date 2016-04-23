import path from 'path';
import express from 'express';
import errors from 'common-errors';
import favicon from 'serve-favicon';

import appMiddleware from './middleware/app';

import apiV1 from './api/v1';

const { errorHandler } = errors.middleware;

const app = express();

// load middlewares
appMiddleware(app);

app.set('views', path.join(__dirname, '../../dist'));
app.use(express.static(path.join(__dirname, '../../dist')));
app.use(favicon(path.join(__dirname, '../../favicon.ico')));

app.use('/api/v1', apiV1);

app.get('*', (req, res) => res.render('index'));
app.use(errorHandler);

export default app;
