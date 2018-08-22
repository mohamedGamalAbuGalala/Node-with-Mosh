// const sayHello = name => {
//   console.log(`Hello ${name}`);
// };

// sayHello("Mohamed");

// console.log(window); // not working start global console.log(); setTimeout(()
// => { }, 1000); clearTimeout(); setInterval(); clearInterval();
// global.console; const message = "fdf"; console.log(global.message); //
// undefined end global start modules console.log(module);

// const log = require("./logger");

// log.log("app.js logger");
// log.log("app.js logger 2");

// const path = require("path");

// const pathObj = path.parse(__filename);

// console.log(pathObj);

// const os = require("os");

// const totalMemory = os.totalmem();
// const freeMemory = os.freemem();

// console.log(`Total memory is ${totalMemory}`);
// console.log(`Free memory is ${freeMemory}`);

// const fs = require("fs");

// const files = fs.readdirSync("./");
// console.log(files);

// fs.readdir("./", (err, files) => {
//   if (err) console.log(`Error: ${err}`);
//   else console.log(`Results: ${files}`);
// });

// const EventEmitter = require("events");
// const emitter = new EventEmitter();

// Register a listener
// emitter.on("messageLogged", (...arg) => {
//   console.log("Listener called", arg);
// });

// Raise an event
// emitter.emit("messageLogged", 1, "http://");

// const Logger = require("./logger");
// const logger = new Logger();

// // Register a listener
// logger.on("messageLogged", (...arg) => {
//   console.log("Listener called", arg);
// });

// logger.log("message");

// emit => making a noise, produce -signalling

// const http = require("http");

// const server = http.createServer((req, res) => {
//   if (req.url === "/") res.write("Hello world!");

//   if (req.url === "/api/courses") res.write(JSON.stringify([1, 2, 3]));
//   res.end();
// });

// // server.on("connection", socket => {
// //   console.log("New Connection...");
// // });

// server.on("clientError", (err, socket) => {
//   socket.end("HTTP/1.1 400 Bad Request\r\n\r\n");
// });
// server.listen(8000);
// console.log("Listening on port 8000");

// end modules


// start npm



// end npm