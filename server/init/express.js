const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

module.exports = app;
