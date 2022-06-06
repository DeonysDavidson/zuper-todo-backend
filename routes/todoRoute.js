const express = require("express");
const todoController = require("../controllers/todoControllers");

const router = express.Router();

router
  .route("/")
  .get(todoController.getToDoHandler)
  .post(todoController.postTodoHandler);
router.route("/:id").put(todoController.putTodoHandler);

module.exports = router;
