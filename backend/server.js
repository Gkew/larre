const bestSqlite3 = require("best-sqlite3");
const express = require("express");
const API = require("./api");
const cors = require("cors");
const port = 4000;
const dbPath = "../databas/database-14-maj.sqlite3";

async function start() {
  const dataBase = await bestSqlite3.connect(dbPath);
  const app = express();

  app.use(express.json(), cors({ origin: "http://localhost:3000" }));
  app.use(express.static("dist"));
  API(app, dataBase);
  app.listen(port, () =>
    console.log("Server is listening on http://localhost:" + port)
  );
}

start();
