const config = require("config");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const debug = require("debug")("app:startup");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const helmet = require("helmet");

const errorHandler = require("./middleware/errorHandler");

mongoose
  .connect("mongodb://localhost/expressDemo")
  .then(() => console.log("Connected to mongoDB..."))
  .catch(() => console.log("could not Connect to mongoDB..."));

// routers
const indexRouter = require("./routes/index");
const coursesRouter = require("./routes/courses");
const genresRouter = require("./routes/genres");
const customersRouter = require("./routes/customers");
const moviesRouter = require("./routes/movies");
const rentalsRouter = require("./routes/rentals");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");

const app = express();

if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR: jwtPrivateKey isn't defined.");
  process.exit(1);
}

// view engine setup
app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "pug");
app.set("view engine", "jade");

// handling middleware routines :: start

if (app.get("env") === "development")
  // TODO:: https://expressjs.com/en/resources/middleware/morgan.html
  app.use(morgan("dev")), debug("Morgan is enabled");

// enable json parse in req.body
app.use(express.json());

//TODO:: https://stackoverflow.com/questions/29960764/what-does-extended-mean-in-express-4-0
app.use(express.urlencoded({ extended: false })); // for (NOT TO) parse application/x-www-form-urlencoded

//TODO:: why to use : https://stackoverflow.com/questions/27961320/when-should-i-use-cookie-parser-with-express-session
app.use(cookieParser());

// serve static folder
app.use(express.static(path.join(__dirname, "public")));

// TODO:: https://github.com/helmetjs/helmet
app.use(helmet());

// handling middleware routines :: end

// routes :: start
app.use("/", indexRouter);
app.use("/api/courses", coursesRouter);
app.use("/api/genres", genresRouter);
app.use("/api/customers", customersRouter);
app.use("/api/movies", moviesRouter);
app.use("/api/rentals", rentalsRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
// routes :: end

// catch 404 and forward to error handler
app.use(errorHandler.catch_404_Errors);

// error handler
app.use(errorHandler.handle_404_Errors);

module.exports = app;

// Db simulate working
// const dbDebugger = require("debug")("app:db");
// dbDebugger("Connected to database...");

//// env process

// debug(`NODE_ENV: ${process.env.NODE_ENV}`);
// debug(`app: ${app.get("env")}`);

// //// configuration
// const config = require("config");
// debug(`Application Name: ${config.get("name")}`);
// debug(`Mail Server: ${config.get("mail.host")}`);
// // // set using: set app_password=15654 eg. password for a service
// debug(`Mail Password: ${config.get("mail.password")}`);

/** This is in powershell (in cmd use set NODE_ENV=production)
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
 */

/** TODO::
 * before publishing any site running with express,
 * please read this article properly before.
 * (This is for "Production Best Practices: Security")
 * https://expressjs.com/en/advanced/best-practice-security.html
 */

/** TODO:: read these articles:
 * https://blog.nodeswat.com/implement-access-control-in-node-js-8567e7b484d1
 * https://gist.github.com/joshnuss/37ebaf958fe65a18d4ff
 *
 */
