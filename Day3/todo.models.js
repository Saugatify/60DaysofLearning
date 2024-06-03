import { timeStamp } from "console";
import mongoose from "mongoose";
const todoSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    complete: {
      type: String,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    subTodos: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"Subtodo"
    },
  },

  {
    timeStamps: true,
  }
);

export const Todo = mongoose.model("Todo", todoSchema);
