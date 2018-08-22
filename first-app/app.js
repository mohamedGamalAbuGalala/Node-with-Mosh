const sayHello = name => {
  console.log(`Hello ${name}`);
};

sayHello("Mohamed");

// console.log(window); // not working start global console.log(); setTimeout(()
// => { }, 1000); clearTimeout(); setInterval(); clearInterval();
// global.console; const message = "fdf"; console.log(global.message); //
// undefined end global start modules console.log(module);

const log = require("./logger");

log.log("app.js logger");

// end modules
