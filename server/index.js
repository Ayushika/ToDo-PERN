/** @format */

import express from "express";
import cors from "cors";

const app = express();

//middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(5000, () => console.log("Server started on 5000"));
