import express from "express";

const server = express();

server.get("/", (req, res) => {
  res.send("Hello from the Express TypeScript server!");
});
server.listen(4242, () => {
  console.log("Express TypeScript Server is running...");
});
