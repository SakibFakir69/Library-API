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
bookRouter.post("/", createBook);
// GET /api/books
bookRouter.get("/", allBooks);
// /api/books/:bookId
bookRouter.get("/:bookId", bookbyID);

// /api/books/:bookId

bookRouter.put("/:bookId", updateBook);

// /api/books/:bookId
bookRouter.delete("/:bookId", deleteBook);







export default bookRouter;
