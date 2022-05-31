const bestSqlite3 = require("best-sqlite3");
const express = require("express");
const API = require("./api");
const cors = require("cors");
const app = express();
const path = require("path");

const port = 4000;
const dbPath = "../databas/database-14-maj.sqlite3";

async function start() {
  const dataBase = await bestSqlite3.connect(dbPath);

  app.use(express.json());
  app.use(cors());
  //app.use(express.static("build"));

  API(app, dataBase);
  app.listen(port, () =>
    console.log("Server is listening on http://localhost:" + port)
  );
}

start();
