/** @format */

const express = require("express");
const cors = require("cors");
const pool = require("./connection");

const app = express();

//middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(5000, () => console.log("Server started on 5000"));
