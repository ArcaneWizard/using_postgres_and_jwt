
//secure storage
require('dotenv').config();
process.env["NODE_CONFIG_DIR"] = "./client/config";

const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const auth = require("./../client/src/middleware/auth");

//middleware     
app.use(cors());
app.use(express.json());

//ROUTES//
app.use('/api/users', require('./../client/src/routes/api/users'));
app.use('/api/auth', require('./../client/src/routes/api/auth'));

//create a todo  
app.post("/todos", auth, async (req, res) => {
    try {

        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *", [description]
        );

        res.json(newTodo);

    } catch (err) {
        console.error(err.message);
    }
});

//get all todos
app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo ORDER BY todo_id");
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get a todo
app.get("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//update a todo
app.put("/todos/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        console.log(description);
        await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2",
            [description, id]
        );

        res.json("Todo was updated");
    } catch (err) {
        console.error(err.message);
    }
});

//delete a todo
app.delete("/todos/:id", auth, (req, res) => {
    try {
        const { id } = req.params;
        pool.query("DELETE FROM todo WHERE todo_id = $1", [id]).then(
            console.log("deleted"),
            res.json(`Deleted ${id}`));
    } catch (err) {
        console.error(err.message);
    }
});


app.listen(5000, () => {
    console.log("server has started on port 5000");
})