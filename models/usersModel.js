const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "First name is mandatory"],
    trim: true,
  },

  last_name: {
    type: String,
    required: [true, "Last name is missing"],
    trim: true,
  },
  created_at: {
    type: Date,
  },
  assined_tasks: {
    type: [String],
    default: [],
  },
});

usersSchema.set("timestamps", true);

const User = mongoose.model("User", usersSchema);

module.exports = User;
