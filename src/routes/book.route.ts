import express from "express";

import {
  createBook,
  allBooks,
  bookbyID,
  updateBook,
  deleteBook,
} from "../controllers/book.controller";
// router
const bookRouter = express.Router();

// POST /api/books
bookRouter.post("/create-book", createBook);
// GET /api/books
bookRouter.get("/books ", allBooks);
// /api/books/:bookId
bookRouter.get("/edit-book/:bookId", bookbyID);

// /api/books/:bookId

bookRouter.put("/:bookId", updateBook);

// /api/books/:bookId
bookRouter.delete("/:bookId", deleteBook);







export default bookRouter;
