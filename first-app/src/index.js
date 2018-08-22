import helpers from "./helpers/helpers";

/**
 * An awesome script
 */
export default class {
  constructor(name = "Dear Coder", text = "hi there") {
    this.name = name;
    this.text = text;
  }
  get message() {
    return `${this.text} ${this.name}!`;
  }
  set message(text) {
    this.text = helpers.trim(text);
  }
}

const sayHello = name => {
  console.log(`Hello ${name}`);
};

sayHello("Mohamed");

// console.log(window); // not working start global console.log(); setTimeout(()
// => { }, 1000); clearTimeout(); setInterval(); clearInterval();
// global.console; const message = "fdf"; console.log(global.message); //
// undefined end global start modules console.log(module);

import { log } from "./logger";

log("app.js logger");

// end modules
