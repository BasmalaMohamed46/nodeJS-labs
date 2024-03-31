const myMod = require('./Modules/EventModule');

let e1 = new myMod();
e1.on("basmala", () => {
  console.log("Event basmala Fired!!");
});
e1.emit('basmala');
