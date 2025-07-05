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
bookRouter.get("/books", allBooks);
// /api/books/:bookId
bookRouter.get("/:bookId", bookbyID);

// /api/books/:bookId

bookRouter.put("/edit-book/:bookId", updateBook);

// /api/books/:bookId
bookRouter.delete("/books/:bookId", deleteBook);







export default bookRouter;
