import axios from "axios";
import express from "express";
import request from 'request'
import { buildAcnhApiUrl, HttpMethods } from "./services/buildApiUrl";
import { makeApiCall } from "./services/makeApiCall";

const PORT = 4242;

const server = express();

server.get("/", async (req, res) => {
  res.send("Hello from the Express TypeScript server!");
});

server.listen(PORT, () => {
  console.log("Express TypeScript Server is running...");
});

/**
 * Test call using the wrapper function makeApiCall
 */
server.get('/makeApiCall', async (req, res) => {
  const requestUrl = 'http://acnhapi.com/v1/fish/1';
  const response = await makeApiCall(requestUrl);
  console.log(JSON.stringify(response));
  res.send(response);
})

/**
 * Test call using 'axios'
 */
server.get('/testAxiosCall', async (req, res) => {
  const requestUrl = 'http://acnhapi.com/v1/fish/1';
  let response = (await axios.get(requestUrl)).data;
  console.log(JSON.stringify(response));
  res.send(response);
})

/** 
 * Test call using 'request'
 */
server.get('/testRequestCall', async (req, res) => {
  const requestUrl = 'http://acnhapi.com/v1/fish/1';
  request(
    {
      url: requestUrl,
      method: 'GET',
      json: {},
    },
    (err, response, body) => {
      if (response.statusCode === 200) {
        console.log(body);
        res.send(body);
      } else {
        console.log(err);
        res.send(`An error occurred! See console for details.`)
      }
    }
  );

})