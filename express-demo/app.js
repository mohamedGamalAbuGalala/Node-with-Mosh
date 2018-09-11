const winston = require("winston");
const express = require("express");

const app = express();

require("./startup/logging")();
require("./startup/validation")();
require("./startup/db")();
require("./startup/config")();
require("./startup/routes")(app);

const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  winston.info(`Listening on port ${port}...`)
);

module.exports = server;

/*
Db simulate working
const dbDebugger = require("debug")("app:db");
dbDebugger("Connected to database...");

env process

debug(`NODE_ENV: ${process.env.NODE_ENV}`);
debug(`app: ${app.get("env")}`);

configuration
const config = require("config");
debug(`Application Name: ${config.get("name")}`);
debug(`Mail Server: ${config.get("mail.host")}`);
set using: set app_password=15654 eg. password for a service
debug(`Mail Password: ${config.get("mail.password")}`);

** This is in powershell (in cmd use set NODE_ENV=production)
 * To set app to production run:
 * $env:NODE_ENV="production"
 *
 * To set port run:
 * $env:PORT=5000
 *
 * To set variables eg. password on env run:
 * $env:app_password=12346
 *
 * To set debugging env run:
 * $env:DEBUG="app:startup"
 * $env:DEBUG="app:startup,app:db"
 * $env:DEBUG="app:startup,app:*"
 * $env:DEBUG=""
 *

** TODO::
 * before publishing any site running with express,
 * please read this article properly before.
 * (This is for "Production Best Practices: Security")
 * https://expressjs.com/en/advanced/best-practice-security.html

 * TODO:: read these articles:
 * https://blog.nodeswat.com/implement-access-control-in-node-js-8567e7b484d1
 * https://gist.github.com/joshnuss/37ebaf958fe65a18d4ff
 *
*/
