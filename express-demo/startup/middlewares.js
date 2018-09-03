const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const debug = require("debug")("app:startup");
const helmet = require("helmet");
const express = require("express");
const errorHandler = require("../middleware/errorHandler");
const path = require("path");

module.exports = app => {
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

  // catch 404 and forward to error handler
  app.use(errorHandler.catch_404_Errors);

  // error handler
  app.use(errorHandler.handle_unExpected_Errors);

  // handling middleware routines :: end

  // view engine setup
  app.set("views", path.join(__dirname, "views"));
  // app.set("view engine", "pug");
  app.set("view engine", "jade");
};
