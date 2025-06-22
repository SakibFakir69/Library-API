"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("../controllers/book.controller");
// router
const bookRouter = express_1.default.Router();
// POST /api/books
bookRouter.post("/", book_controller_1.createBook);
// GET /api/books
bookRouter.get("/", book_controller_1.allBooks);
// /api/books/:bookId
bookRouter.get("/:bookId", book_controller_1.bookbyID);
// /api/books/:bookId
bookRouter.put("/:bookId", book_controller_1.updateBook);
// /api/books/:bookId
bookRouter.delete("/:bookId", book_controller_1.deleteBook);
exports.default = bookRouter;
