const http = require("http");
const ws = require("ws");
const fs = require("fs");
const path = require('path');
const Max = require('max-api');

const host = '127.0.0.1';
const httpPort = 8000;
const wsPort = 8001;

Max.post(`Loaded the ${path.basename(__filename)} script`);

const requestListener = function (req, res) {
  if (req.method == "GET" && req.url == "/") {
    res.writeHead(200, {"Content-type": "text/html"});
    fs.readFile("index.html", function(err, data){
      res.end(data);
    });
  } else if (req.method == "GET" && req.url == "/icon.png") {
    res.writeHead(200, {"Content-type": "image/png"});
    fs.readFile("icon.png", function(err, data){
      res.end(data);
    });
  } else {
    Max.post("Not found: " + req.url);
    res.writeHead(404, {"Content-type": "text/html"});
    res.end("<html><head></head><body><i>Not found!</i></body></html>");  
  }
};

// Start webserver
const server = http.createServer(requestListener);
server.listen(httpPort, () => {
  console.log(`Server is running on http://${host}:${httpPort}`);
});

// Start websocket
const wss = new ws.WebSocketServer({ port: wsPort });

wss.on('connection', function connection(wsConnection) {
  wsConnection.on('error', console.error);

  wsConnection.on('message', function message(data) {
    console.log('received: %s', data);
  });

  Max.addHandler(Max.MESSAGE_TYPES.LIST, (...msg) => {
    wsConnection.send(msg[0] + ";" + msg[1]);
  });
});

Max.addHandler(Max.MESSAGE_TYPES.LIST, (...msg) => {
});
