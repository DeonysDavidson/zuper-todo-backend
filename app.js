const cors = require("cors");
const express = require("express");
const todoRouter = require("./routes/todoRoute");
const usersRouter = require("./routes/usersRoute");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/todos", todoRouter);
app.use("/api/v1/users", usersRouter);

module.exports = app;
