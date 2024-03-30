const http = require('http');
const fs = require('fs');
http
    .createServer((req, res)=>{
        if(req.url != '/favicon.ico'){
            const url=req.url.split('/');
            const operation = url[1];
            if(operation == 'add'){
                var sum=0;
                for(var i=2; i<url.length; i++){
                    sum += parseInt(url[i]);
                    fs.appendFileSync('data.txt',url[i]);
                    if(i<url.length-1){
                        fs.appendFileSync('data.txt','+');
                    }
                    else{
                        fs.appendFileSync('data.txt','=');
                    }
                }
                fs.appendFileSync('data.txt',sum.toString() + '\n');
                res.write(sum.toString());
            }else if(operation == 'sub'){
                var sub=parseInt(url[2]);
                fs.appendFileSync('data.txt',url[2] + '-');
                for(var i=3; i<url.length; i++){
                    sub -= parseInt(url[i]);
                    fs.appendFileSync('data.txt',url[i]);
                    if(i<url.length-1){
                        fs.appendFileSync('data.txt','-');
                    }
                    else{
                        fs.appendFileSync('data.txt','=');
                    }
                }
                fs.appendFileSync('data.txt',sub.toString() + '\n');
                res.write(sub.toString());
            }else if(operation == 'mul'){
                var mul=1;
                for(var i=2; i<url.length; i++){
                    mul *= parseInt(url[i]);
                    fs.appendFileSync('data.txt',url[i]);
                    if(i<url.length-1){
                        fs.appendFileSync('data.txt','*');
                    }
                    else{
                        fs.appendFileSync('data.txt','=');
                    }
                }
                fs.appendFileSync('data.txt',mul.toString() + '\n');
                res.write(mul.toString());
            }else if(operation =='div'){
                var div=parseInt(url[2]);
                fs.appendFileSync('data.txt',url[2] + '/');
                for(var i=3; i<url.length; i++){
                    div /= parseInt(url[i]);
                    fs.appendFileSync('data.txt',url[i]);
                    if(i<url.length-1){
                        fs.appendFileSync('data.txt','/');
                    }
                    else{
                        fs.appendFileSync('data.txt','=');
                    }
                }
                fs.appendFileSync('data.txt',div.toString() + '\n');
                res.write(div.toString());
            }
        }
        res.end();
    })
    .listen(7000)