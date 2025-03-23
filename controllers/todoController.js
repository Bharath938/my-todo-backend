const Todo = require("../model/todoModel");

const getTodos = async (req, res) => {
  const { userId, username } = req.user;
  try {
    const todos = await Todo.find({ userId });

    res.status(200).json({ todos, username });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTodo = async (req, res) => {
  try {
    const todo = req.body;

    const newTodo = new Todo({ userId: req.user.userId, ...todo });
    await newTodo.save();

    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const todoUpdate = async (req, res) => {
  const { userId } = req.user;
  try {
    const { id } = req.params;
    const findTodo = await Todo.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    const todos = await Todo.find({ userId });

    res.status(200).json(todos);
  } catch (error) {
    console.log(error);
  }
};

const todoDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete({ _id: id });

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getTodos,
  createTodo,
  todoUpdate,
  todoDelete,
};
