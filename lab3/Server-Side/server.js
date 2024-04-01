
const fs = require("fs");
const express = require("express");
const app = express();
const PORT = process.env.PORT||7000;
const path = require("path");
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
let allClients=[];



app.get("/main.html", (req, res)=>{
    res.sendFile(path.join(__dirname, "../Client-side/Pages/main.html"));
})
app.get("/welcome.html", (req, res)=>{
    res.sendFile(path.join(__dirname, "../Client-side/Pages/welcome.html"));
})

app.get("/showClients.html", (req, res) => {
    fs.readFile("../clients.json", "utf8", (err, data) => {
      if (err) {
        console.error("Error reading JSON file:", err);
        return res.status(500).send("Internal Server Error");
      }
  
      clientsData = JSON.parse(data);
  
      let table = `<table border="1">
      <tr>
          <th>Name</th>
          <th>Mobile</th>
          <th>Email</th>
          <th>Address</th>
      </tr>`;
  
      clientsData.forEach((client) => {
        table += `<tr>
          <td>${client.username}</td>
          <td>${client.phone}</td>
          <td>${client.email}</td>
          <td>${client.address}</td>
      </tr>`;
      });
  
      table += "</table>";
  

      fs.readFile(path.join(__dirname, "../Client-side/Pages/showClients.html"), "utf8", (err, htmlData) => {
        if (err) {
          console.error("Error reading HTML file:", err);
          return res.status(500).send("Internal Server Error");
        }
  
        const modifiedHTML = htmlData.replace("{table}", table);
        res.send(modifiedHTML);
      });
    });
  });

app.get("/Styles/style1.css", (req, res)=>{
    res.sendFile(path.join(__dirname, "../Client-side/Styles/style1.css"));
})
app.get("/Styles/style2.css", (req, res)=>{
    res.sendFile(path.join(__dirname, "../Client-side/Styles/style2.css"));
})
app.get("/Styles/style3.css", (req, res)=>{
    res.sendFile(path.join(__dirname, "../Client-side/Styles/style3.css"));
})
app.get("/Scripts/script1.js", (req, res)=>{
    res.sendFile(path.join(__dirname, "../Client-side/Scripts/script1.js"));
})
app.get("/Icons/favicon.ico", (req, res)=>{
    res.sendFile(path.join(__dirname, "../Client-side/Icons/favicon.ico"));
})


app.post("/welcome.html", (req, res) => {
    fs.readFile(path.join(__dirname, "../Client-side/Pages/welcome.html"), "utf8", 
    (err, data) => {
      if (err) {
        console.error("Error reading template file:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
  
      const { username, phone, email, address } = req.body;
      let modifiedHTML = data
        .replace("{username}", username)
        .replace("{phone}", phone)
        .replace("{email}", email)
        .replace("{address}", address);

      allClients.push(req.body);

      fs.writeFileSync("../clients.json", JSON.stringify(allClients, null, 2));

    res.send(modifiedHTML);
    })
})

app.all("*",(req,res)=>{
    res.send("Please Check ur URL!!")
})

app.listen(PORT, ()=>{console.log("http://localhost:"+PORT)});