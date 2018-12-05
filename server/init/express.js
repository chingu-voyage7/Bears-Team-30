const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const logger = require('morgan');

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

module.exports = app;
