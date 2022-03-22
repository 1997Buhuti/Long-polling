const express = require("express");

const LIMIT = 10;
const DELAY = 3000;

const app = express();

const connections = [];

app.get("/date", (req, res, next) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Transfer-Encoding", "chunked");

  connections.push(res);
});

let tick = 0;

setTimeout(function run() {
  console.log(tick);
  if (++tick > LIMIT) {
    connections.map((res) => {
      res.write("END\n");
      res.end();
    });
    connections = [];
    tick = 0;
  }
  connections.map((res, i) => {
    let date = new Date().toLocaleString();
    res.write(`data: ${date}\n\n`);
  });
  setTimeout(run, DELAY);
}, DELAY);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
