var flightModule=require('./Modules/FlightModule');
let myFlights = flightModule.flights;
let f1 = new myFlights();
console.log("############# display all tickets ################");
console.log(f1.displayAll());
console.log("############# add new ticket ################");
f1.add(4,100,"alex","france","2024-12-31");
console.log(f1.displayAll());
console.log("############# display one ticket ################");
console.log(f1.displayOne(1));
console.log("############# update one ticket ################");
f1.update(4,{flightNum:100,departure:"turkey",travelingDate:"2025-12-31"});
console.log(f1.displayOne(4));