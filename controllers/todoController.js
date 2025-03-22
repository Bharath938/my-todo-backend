const Todo = require("../model/todoModel");

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({});

    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTodo = async (req, res) => {
  try {
    const todo = req.body;

    const newTodo = new Todo(todo);
    await newTodo.save();

    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const todoUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { todo, completed } = req.body;
    console.log(req.body);
    console.log(id);
    const findTodo = await Todo.findByIdAndUpdate(
      { _id: id },
      { todo, completed },
      { new: true }
    );
    const todos = await Todo.find({});

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
