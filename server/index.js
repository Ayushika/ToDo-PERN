/** @format */

const express = require("express");
const cors = require("cors");
const pool = require("./connection");

const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//ROUTES

//create a todo
app.post("/createtodo", async (req, res) => {
  try {
    const { description } = req.body;

    const newtodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description],
    );
    res.json(newtodo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//get all

app.post("/todo", async (req, res) => {
  try {
    const todo = await pool.query("SELECT * FROM todo");
    res.json(todo.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//get a todo

app.get("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const gettodo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(gettodo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//update todo

app.put("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updatetodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id],
    );

    res.json("Updated");
  } catch (error) {
    console.error(error.message);
  }
});

//delete a todo
app.delete("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletetodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json("Deleted to do");
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(5000, () => console.log("Server started on 5000"));
