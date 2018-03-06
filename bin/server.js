const fs = require('fs-extra');
var http = require('http');
const  qs= require('querystring');
const path=require('path');
const url = require('url');
const def=require('../config');

var servers=http.createServer(function (req, res){
    let pathname=url.parse(req.url).pathname
    const cw=path.join(process.cwd(),def.dir,pathname);
    if(fs.existsSync(cw)){
        console.log("本地读取成功:"+cw);
        fs.readFile(cw,function (err,data) {
            res.writeHead(200);
            res.write(data);
            res.end();
        });
    }else{
        console.log("文件读取失败："+cw);
        res.writeHead(404);
        res.end();
    }
});
function server(info){
    servers.listen(info.port,info.host,function(){
        console.log('本地开发：'+`${info.host}:${info.port}`);
    });

}
module.exports = server;