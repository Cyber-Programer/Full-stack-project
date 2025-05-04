const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["ongoing", "collaborative", "pending", "done"],
      default: "pending",
    },
    category: {
      type: String,
      enum: [
        "arts and carts",
        "nature",
        "family",
        "sports",
        "friends",
        "meditation",
        "others",
      ],
      default: "others",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
