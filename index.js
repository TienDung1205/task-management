const express = require('express');
const database = require('./config/database');
require('dotenv').config();

const routesApiVer1 = require('./api/v1/routes/index.route');

const app = express();
const port = process.env.PORT;

database.connect();

// Routes Ver1
routesApiVer1(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});