const http = require('http');
const querystring = require('querystring');
const url = require('url');
//引入mongodb模块，获得客户端对象
const MongoClient = require('mongodb').MongoClient;

http.createServer((req, res)=>{
    req.on('data', (data)=>{
        let newData = url.parse(data.toString());
        let newData1 = querystring.parse(newData.path);
        
        //连接字符串
        var DB_CONN_STR = 'mongodb://localhost:27017/rum';    

        //定义函数表达式，用于操作数据库并返回结果
        var insertData = function(db, callback) {  
            //获得指定的集合 
            var collection = db.collection('users');
            //插入数据
            var data = newData1;
            collection.insert(data, function(err, result) { 
                //如果存在错误
                if(err)
                {
                    console.log('Error:'+ err);
                    return;
                } 
                //调用传入的回调方法，将操作结果返回
                callback(result);
            });
        }

        //使用客户端连接数据，并指定完成时的回调方法
        MongoClient.connect(DB_CONN_STR, function(err, db) {
            console.log("连接成功！");
            //执行插入数据操作，调用自定义方法
            insertData(db, function(result) {
                //显示结果
                console.log(result);
                //关闭数据库
                db.close();
            });
        });
    });
    res.writeHead(200, {
        'Content-Type': 'text/plain;charset=utf-8','Access-Control-Allow-Origin':'*'
    });
    res.end();
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');