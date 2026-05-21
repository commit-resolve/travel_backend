const express = require('express');
const routes = require('./routes/users');

const app = express();

app.use(express.json());
app.use('/users', routes);

module.exports = app;