const EventEmitter = require("events");

class Logger extends EventEmitter {
  log(message) {
    // Raise an event
    this.emit("messageLogged", 1, "http://");
    // console.log(__dirname);
    console.log(message);
  }
}

module.exports = Logger;
