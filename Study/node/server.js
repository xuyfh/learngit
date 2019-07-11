const http = require('http');
const fs = require('fs');
const url = require('url');

http.createServer((req, res)=>{
    let pathname = url.parse(req.url).pathname;
    console.log("Request for" + pathname + " received.");
    fs.readFile(pathname.substr(1), (err, data)=>{
        if(err){
            console.log(err.stack);
            res.writeHead(404, {'Content-type': 'text/html'});
        } else {
            res.writeHead(200, {'Content-type': 'text/html'});
            res.write(data.toString());
        }
        res.end();
    });
}).listen(8082);

console.log('Server running at http://127.0.0.1:8082/');
