import { BookInterface } from "./../interfaces/book.interface";
import mongoose, { get } from "mongoose";

const { Schema } = mongoose;

const bookSchema = new Schema<BookInterface>(
  {
    title: { type: String, required: [true, "Mandatory the book’s title"] },

    author: { type: String, required: true },

    genre: {
      type: String,
      enum: {
        values: [
          "FICTION",
          "NON_FICTION",
          "SCIENCE",
          "HISTORY",
          "BIOGRAPHY",
          "FANTASY",
        ],
      },
      required: true,
    },
    isbn: { type: String, unique: true, required: true },

    description: { type: String, required: true },

    copies: {
      type: Number,
      required: true,
      min: [0, "Copies must be a positive number"],
    },

    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

bookSchema.pre("save", function (next) {
  if (this.copies < 0) {
    next(new Error("Copies cannot be negative"));
  }
  next();
});

// use middleware if copies<0 error

bookSchema.methods.functionLogic = async function (quantity: number) {
  if (this.copies < quantity) {
    throw new Error("Not enough copies available");
  }
  this.copies -= quantity; //1

  if (this.copies <= 0) {
    this.available = false;
  }

  await this.save(); // 4
};

export const Book = mongoose.model<BookInterface>(
  "Book",
  bookSchema
);
