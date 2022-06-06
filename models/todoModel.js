const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Todo title is required"],
  },

  description: {
    type: String,
    required: [true, "Todo description is required"],
  },

  assigned_to: {
    type: String,
  },

  is_done: {
    type: Boolean,
    default: false,
  },

  is_deleted: {
    type: Boolean,
    default: false,
  },
});

todoSchema.set("timestamps", true);

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
