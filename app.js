const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const todoRoutes = require("./routers/todoRoutes");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/todos", todoRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("mongoDB connected"))
  .catch((err) => console.log("mongoDB Connection error", err));

app.listen(port, () => {
  console.log("App is listening at PORT 5000...");
});
