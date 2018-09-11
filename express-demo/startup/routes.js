const debug = require("debug")("app:startup");
const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const helmet = require("helmet");

const errorHandler = require("../middleware/errorHandler");
// routers
const indexRouter = require("../routes/index");
const coursesRouter = require("../routes/courses");
const genresRouter = require("../routes/genres");
const customersRouter = require("../routes/customers");
const moviesRouter = require("../routes/movies");
const rentalsRouter = require("../routes/rentals");
const usersRouter = require("../routes/users");
const authRouter = require("../routes/auth");

module.exports = function(app) {
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
  app.use(errorHandler.handle_unExpected_Errors);
};
