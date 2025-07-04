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

// save

bookSchema.post("save", async function (doc, next) {
  console.log(doc.title);
  
  next();
});

// bookSchema.pre("save", function (next) {
//   if (this.copies <= 0) {
//     return next(new Error("Copies cannot be zero or negative"));
//   }
//   next(); 
// });


// use middleware if copies<0 error

bookSchema.methods.functionLogic = async function (quantity: number) {
  console.log(quantity);
  if (this.copies < quantity) {
    throw new Error("Not enough copies available");
  }
  this.copies-= quantity; //1
  console.log(quantity, this.copies,"copies")

  if (this.copies <= 0) {
    this.available = false;
  } else {
    this.available = true; 
  }
  console.log(this.available)

  await this.save(); // 4
};

export const Book = mongoose.model<BookInterface>("Book", bookSchema);


