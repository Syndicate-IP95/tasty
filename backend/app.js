"use strict";

require("dotenv/config");
const { pool } = require("./db/database");
const http = require("http");
const { headers } = require("./utils/headers/headers");
const Router = require("./routes/router");

const server = http.createServer(async (req, res) => {

  if (req.method === "OPTIONS") {
    res.writeHead(204, headers);
    res.end();
    return;
  }

  const router = new Router(req.url, req.method);
  router.usage(req, res);
});


server.listen(process.env.PORT, () => {
  console.log(`server running`);
});
