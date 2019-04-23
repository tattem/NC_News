const express = require('express');
const apiRouter = require('./routes/api');
const cors = require('cors');
const { routeNotFound, handle500, handle422, handle404, handle400 } = require('./errors');

const app = express();
app.use(cors())

app.use(express.json());

app.use('/api', apiRouter);

app.all('/*', routeNotFound);

app.use(handle400);
app.use(handle404);
app.use(handle422);
app.use(handle500);

module.exports = app;
