import mongoose from "mongoose";

const todoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Todo title is required!"],
    },
    description: {
      type: String,
      required: [true, "Todo description is required!"],
      maxLength: [35, "Description cannot be more than 35 characters"],
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
