const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const {API_VERSION} = require("./config");

//load routing
const UserRoutes = require("./routers/user");
const authRoutes = require("./routers/auth");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//configure header HTTP

//Router Basic
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, UserRoutes);

module.exports = app;