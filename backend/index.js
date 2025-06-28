import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import todoModel from "./routes/todo.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.post("/create", (req, res) => {
  todoModel
    .create({ task: req.body.task })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.get("/get", (req, res) => {
  todoModel
    .find({})
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  todoModel
    .findByIdAndUpdate({ _id: id }, { done: true })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  todoModel
    .findByIdAndDelete({ _id: id })
    .then((todo) => res.json(todo))
    .catch((err) => res.json(err));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
