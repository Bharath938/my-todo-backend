const express = require("express");
const {
  createTodo,
  getTodos,
  todoUpdate,
  todoDelete,
} = require("../controllers/todoController");

const router = express.Router();

router.get("/", getTodos);
router.post("/", createTodo);
router.patch("/:id", todoUpdate);
router.delete("/:id", todoDelete);

module.exports = router;
