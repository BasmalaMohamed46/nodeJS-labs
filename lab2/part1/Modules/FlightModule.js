class flights{
    #Tickets = [
        {
            seatNum:1,
            flightNum:100,
            departure:"cairo",
            arival:"Borg el-arab",
            travelingDate: "2024-12-31",
        },
        {
            seatNum:2,
            flightNum:100,
            departure:"cairo",
            arival:"Borg el-arab",
            travelingDate: "2024-12-31",
        },
        {
            seatNum:3,
            flightNum:100,
            departure:"cairo",
            arival:"Borg el-arab",
            travelingDate: "2024-12-31",
        }
    ];

    add(seat,flight,depart,arrive,tDate){
        var ticket={}
        ticket={
            seatNum:seat,
            flightNum:flight,
            departure:depart,
            arival:arrive,
            travelingDate: tDate, 
        }
        this.#Tickets.push(ticket);
    }

    displayAll(){
        var allFlights="";
        this.#Tickets.forEach(ticket=>{
           allFlights+=`seatNum:${ticket.seatNum} \n
           flightNum:${ticket.flightNum} \n
           departure:${ticket.departure} \n
           arival:${ticket.arival} \n
           travelingDat:${ticket.travelingDate} \n \n  `
        })
        return allFlights;
    }
    displayOne(seatNo){
        var requiredTicket = this.#Tickets.find(ticket => ticket.seatNum === seatNo);
        if (requiredTicket) {
            var requiredFlight = `seatNum:${requiredTicket.seatNum} \n
            flightNum:${requiredTicket.flightNum} \n
            departure:${requiredTicket.departure} \n
            arrival:${requiredTicket.arival} \n
            travelingDate:${requiredTicket.travelingDate} \n \n`;
            return requiredFlight;
        } else {
            console.log("The required flight is not found");
            return null;
        }
    }
    update(seatNo,updateValues){
        var requiredTicket = this.#Tickets.find(ticket => ticket.seatNum === seatNo);
        if (requiredTicket) {
            requiredTicket["seatNum"] = updateValues["seatNum"] ? updateValues["seatNum"] : requiredTicket["seatNum"];
            requiredTicket["flightNum"] = updateValues["flightNum"] ? updateValues["flightNum"] : requiredTicket["flightNum"];
            requiredTicket["departure"] = updateValues["departure"] ? updateValues["departure"] : requiredTicket["departure"];
            requiredTicket["arival"] = updateValues["arival"] ? updateValues["arival"] : requiredTicket["arival"];
            requiredTicket["travelingDate"] = updateValues["travelingDate"] ? updateValues["travelingDate"] : requiredTicket["travelingDate"];
            return requiredTicket;
        }
        else {
            console.log("The required flight is not found");
            return null;
        }

    }
    

    
}

module.exports = {flights};