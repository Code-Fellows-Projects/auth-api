'use strict';
//api-server
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const notFoundHandler = require('./__error-handlers__/404.js');
const errorHandler = require('./__error-handlers__/500.js');
const logger = require('./__middleware__/logger.js');
/////auth-server
// const notFound = require('./error-handlers/404.js');
const authRoutes = require('./__routes__/routes.js');
const v1Routes = require('./__routes__/v1.js');


const app = express();

// App Level MW auth-server
app.use(cors());
app.use(morgan('dev'));

// auth-server
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes auth-server
app.use(authRoutes);


app.use(express.json());

app.use(logger);

app.use('/api/v1', v1Routes);

app.use('*', notFoundHandler);
app.use(errorHandler);

// Catchalls auth-servers
// app.use(notFound);


module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};