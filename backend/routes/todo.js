import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
  task: String,
  done: {
    type: Boolean,
    default: false,
  },
});

const todoModel = mongoose.model("newTodos", todoSchema);

export default todoModel;
