import mongoose, { Schema } from "mongoose";
import { ref } from "process";
import { Book } from "./book.model";

const borrowSchema = new Schema(
  {
    book: {
      type: Schema.Types.ObjectId,

      required: true,
      ref: "Book",
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "quantity must be a positive number"],
    },
    dueDate: { type: Date, required: true },
  },
  {
    timestamps: true,
    versionKey:false
  }
);



export const Borrow = mongoose.model("Borrow", borrowSchema);



