const express = require("express");
const request = require("request");

const server = express();

const apiOptions = {
  server: "http://acnhapi.com/",
};
const requestOptions = {
  url: "http://acnhapi.com/v1/fish",
  method: "GET",
  json: {
    fishID: 1,
  },
};

server.get("/", (req, res) => {
  request(
    {
      url: "http://acnhapi.com/v1/fish/1",
      method: "GET",
      json: {},
    },
    (err, response, body) => {
      if (response.statusCode === 200) {
        console.log(body);
      }
    }
  );
  res.send("Hello Express");
});

server.listen(4242, () => {
  console.log("Express Server is running...");
});

/*
const http = require("http");

const httpRequestListener = (req, res) => {
  console.log(req.url);
  // req, res are streams!
  console.dir(req, { depth: 0 }); // only print first level of properties for the object 'req'
  console.dir(res, { depth: 0 }); // only print first level of properties for the object 'res'

  res.end("Hello Node\n");
};

const httpServer = http.createServer();
httpServer.on("request", httpRequestListener);
httpServer.listen(4242, () => {
  console.log("Server is running...");
});
*/
