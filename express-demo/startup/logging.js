const winston = require("winston");
// require("winston-mongodb");

// moves control of errors from route handler
// to error handler without using asyncMiddleware
require("express-async-errors");

module.exports = function() {
  // winston start
  winston.add(winston.transports.File, { filename: "logfile.log" });
  // winston.add(winston.transports.MongoDB, {
  //   db: "mongodb://localhost/expressDemo",
  //   level: "info"
  // });

  // process.on("uncaughtException", ex => {
  //   winston.error(ex.message, ex);
  //   process.exit(1);
  // });

  // handle only uncaughtException
  winston.handleExceptions(
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );
  // throw new Error("Something failed during startup.");

  process.on("unhandledRejection", ex => {
    // make it uncaughtException
    throw ex;
  });
  // const p = Promise.reject(new Error("Something failed miserably!"));
  // p.then(() => console.log("Done"));

  // winston end
};
