
const port = 3000;
const http = require("http");
const httpStatus = require("http-status-codes");
const fs = require("fs");
const app = http.createServer();

app.on("request", (req, res) => {
    var body = [];
    
    req.on("data", (bodyData) => {
        body.push(bodyData);
    });
    req.on("end", () => {
        body = Buffer.concat(body).toString();
        console.log("Request body");
    });
    res.writeHead(httpStatus.StatusCodes.OK, {
        "Content-Type": "text/html",
    });

    let url = req.url;
    if (url.indexOf(".html") !== -1) {
        res.writeHead(httpStatus.StatusCodes.OK, {
            "Content-Type": "text/html",
        });
        console.log(url)
        customReadFile(`./views${url}`,res);
    }else if (url.indexOf(".js") !== -1) {
        res.writeHead(httpStatus.StatusCodes.OK, {
            "Content-Type": "text/javascript",
        });
        customReadFile(`./public/js${url}`,res);
    }else if (url.indexOf(".png") !== -1) {
        res.writeHead(httpStatus.StatusCodes.OK, {
            "Content-Type": "image/png",
        });
        customReadFile(`./public/images${url}`,res);
    }else{
        sendErrorResponse(res);
    }
    
    
});

 app.listen(port);
 console.log("server is listening");

 const getJSONString = (obj) => {
     return JSON.stringify(obj, null, 2);
 }
 const getViewUrl = (url) => {
     return `views${url}.html`;
 }
 const sendErrorResponse = (res) => {
    res.writeHead(httpStatus.StatusCodes.OK, {
        "Content-Type": "text/html",
    });
    res.write("<h1>file not found </h1>");
    res.end();
 }

 const customReadFile = (file_path, res) => {
   
    if (fs.existsSync(file_path)) {
         fs.readFile(file_path, (error,data) => {
             if (error) {
                 console.log(error);
                 sendErrorResponse(res);
                 return;
             }
             res.write(data);
             res.end();
         });
     }else{
         sendErrorResponse(res);
     }
 }