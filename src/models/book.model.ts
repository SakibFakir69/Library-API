import { BookInterface } from './../interfaces/book.interface';
import mongoose from "mongoose";


const { Schema } = mongoose;



const bookSchema = new Schema<BookInterface>({

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
},{
  versionKey:false
});


export const Book = mongoose.model("books-collection",bookSchema);