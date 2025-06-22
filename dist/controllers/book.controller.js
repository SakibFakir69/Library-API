"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.bookbyID = exports.allBooks = exports.createBook = void 0;
const book_model_1 = require("../models/book.model");
const zod_1 = require("zod");
const bookpostValidationZod = zod_1.z.object({
    title: zod_1.z.string(),
    author: zod_1.z.string(),
    genre: zod_1.z.enum([
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
    ]),
    isbn: zod_1.z.string(),
    description: zod_1.z.string(),
    copies: zod_1.z.number().min(1, "Copies must be a positive number"),
    available: zod_1.z.boolean().default(true),
});
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const zodValidation = bookpostValidationZod.safeParse(req.body);
        if (!zodValidation.success) {
            res.status(404).json({
                message: "Validation failed",
                success: false,
                error: zodValidation.error.errors,
            });
        }
        else {
            // post saved
            const newBook = yield new book_model_1.Book(zodValidation.data);
            yield newBook.save();
            res.status(201).json({
                success: true,
                message: "Book created successfully",
                data: newBook,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Book creation failed",
        });
    }
});
exports.createBook = createBook;
// GET
const allBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = req.query.filter;
        /// book?filter="data";
        const sortBy = req.query.sortBy || "createdAt";
        // book?filter="data"&sortBy="data";
        const sort = req.query.sort === "desc" ? 1 : -1;
        const limit = parseInt(req.query.limit) || 10;
        const books = yield book_model_1.Book.find()
            .sort({ [sortBy]: sort })
            .limit(limit);
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Book data fetch to  failed",
        });
    }
});
exports.allBooks = allBooks;
// // . Get Book by ID
const bookbyID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const foundBook = yield book_model_1.Book.findById({ _id: bookId });
        if (!foundBook) {
            res.status(404).json({
                success: false,
                message: "Book retrieved failed",
            });
        }
        //
        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data: foundBook,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Book retrieved failed",
            error: error.message,
        });
    }
});
exports.bookbyID = bookbyID;
// // PUT /api/books/:bookId
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const body = req.body;
        const updateDoc = yield book_model_1.Book.findByIdAndUpdate(bookId, body, {
            new: true,
        });
        if (!updateDoc) {
            res.status(404).json({
                success: false,
                message: "Book updated failed",
            });
        }
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: updateDoc,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Book updated failed",
            error: error.message,
        });
    }
});
exports.updateBook = updateBook;
// // DELETE /api/books/:bookId
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const bookIdDelete = yield book_model_1.Book.findByIdAndDelete(bookId);
        console.log(bookIdDelete);
        if (!bookIdDelete) {
            res.status(500).json({
                success: false,
                message: "Book deleted failed",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Book deleted failed",
            error: error.message,
        });
    }
});
exports.deleteBook = deleteBook;
