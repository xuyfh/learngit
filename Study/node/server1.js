const http = require('http');
const fs = require('fs');
const querystring = require('querystring');
const url = require('url');

http.createServer((req, res)=>{
    req.on('data', (data)=>{
        let newData = url.parse(data.toString());
        console.log(newData.path);
        fs.writeFile('database.txt', JSON.stringify(querystring.parse(newData.path)), ()=>{
            console.log("success!")
        })
    });
    res.writeHead(200, {
        'Content-Type': 'text/plain;charset=utf-8','Access-Control-Allow-Origin':'*'
    });
    res.end();
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');
