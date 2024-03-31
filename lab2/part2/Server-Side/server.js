//Launch Server ==> req[URL - Method]
const http = require('http');
const fs = require('fs');
//#region Reading Files
var HomeHTML = "";
fs.readFile("../lab2/part2/Client-side/Pages/main.html","utf-8",(err,data)=>{
    if(err){
        console.log("Error Occured")
    }else{
        HomeHTML = data;
    }
})
var WelcomeHTML = fs.readFileSync("../lab2/part2/Client-side/Pages/welcome.html","utf-8");
var Style1CSS = fs.readFileSync("../lab2/part2/Client-side/Styles/style1.css","utf-8");
var ScriptJs = fs.readFileSync("../lab2/part2/Client-side/Scripts/script1.js","utf-8");
var Style2CSS = fs.readFileSync("../lab2/part2/Client-side/Styles/style2.css","utf-8");
var FavIcon1ico = fs.readFileSync("../lab2/part2/Client-side/Icons/favicon.ico");
//#endregion

http.createServer((req, res)=>{
    //#region GET
    if(req.method == "GET"){
        switch(req.url){
            case "/":
            case "/main.html":
            case "/Pages/main.html":
            case "/Client-side/Pages/main.html":
                res.setHeader("Content-Type","text/html");
                res.write(HomeHTML)
            break;
            case "/style1.css":
            case "/Styles/style1.css":
            case "/Client-side/Styles/style1.css":
                res.setHeader("Content-Type","text/css");
                res.write(Style1CSS);
            break;
            case "/style2.css":
            case "/Styles/style2.css":
            case "/Client-side/Styles/style2.css":
                    res.setHeader("Content-Type","text/css");
                    res.write(Style2CSS);
            break;
            case "/script1.js":
                case "/Scripts/script1.js":
                case "/Client-Side/Scripts/script1.js":
                    res.setHeader("Content-Type","text/javascript");
                    res.write(ScriptJs);
                break;
            case "/favicon.ico":
            case "/Icons/favicon.ico":
            case "/Client-side/Icons/favicon.ico":
                res.setHeader("Content-Type","image/vnd.microsoft.icon");
                res.write(FavIcon1ico);
            break;
            default:
                if(req.url.includes("profile.html")){
                    res.setHeader("Content-Type","text/html");
                    res.write(ProfileHTML)
                }
                else
                    res.write("Invalid URL !!")
            break;
        }
        res.end()
    }
    //#endregion
    //#region POST
    else if(req.method == "POST"){
        let username = "";
        let phone = "";
        let email = "";
        let address = "";
        req.on("data", (data)=>{
            let userData = data.toString();
            username = userData.split("&")[0].split("=")[1];
            phone = userData.split("&")[1].split("=")[1];
            address = userData.split("&")[2].split("=")[1];
            email = userData.split("&")[3].split("=")[1];
            email = email.replace("%40","@");
        })
        req.on("end", ()=>{
            res.setHeader("Content-Type","text/html");
            let File = WelcomeHTML.replace("{username}",username).replace("{phone}",phone).replace("{email}",email).replace("{address}",address);
            res.write(File);
            res.end();
        })
        req.on("error", ()=>{console.log("Error")})
        req.on("close", ()=>{console.log("Closed")})
    }
    //#endregion
    //#region Default
    else{
        res.end("Please Check ur Method [GET- POST]")
    }
    //#endregion
}).listen(7000,()=>{console.log("http://localhost:7000")})