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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowedbookssummary = exports.borrowaBook = exports.borrowRouter = void 0;
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
exports.borrowRouter = express_1.default.Router();
const borrow_model_1 = require("../models/borrow.model");
const book_model_1 = require("../models/book.model");
// add zod
const borrowzodValidation = zod_1.z.object({
    book: zod_1.z.string(),
    quantity: zod_1.z.number().int().positive(),
    dueDate: zod_1.z.string().refine((val) => {
        const date = new Date(val);
        return !isNaN(date.getTime()) && date > new Date();
    }, {
        message: "Must be a valid future date in ISO format (YYYY-MM-DD or YYYY-MM-DDTHH:MM:SSZ)",
    }),
});
const borrowaBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = borrowzodValidation.safeParse(req.body);
        if (!data.success) {
            res.status(400).json({
                success: false,
                message: "validation failed",
                error: data.error.format(),
            });
            return;
        }
        const { dueDate, quantity, book } = data.data;
        const foundedBook = yield book_model_1.Book.findById(book);
        if (!foundedBook) {
            res.status(400).json({
                success: false,
                message: "book not founded",
            });
            return;
        }
        yield foundedBook.functionLogic(quantity);
        const borrowData = yield new borrow_model_1.Borrow(data.data);
        yield borrowData.save();
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrowData,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Book borrowed failed",
        });
    }
});
exports.borrowaBook = borrowaBook;
// GET /api/borrow
const borrowedbookssummary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield borrow_model_1.Borrow.aggregate([
            // stage - 1
            { $group: { _id: "$book", totalQuantity: { $sum: "$quantity" } } },
            // stage -2
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookinfo",
                },
            },
            // stage - 3
            { $unwind: "$bookinfo" },
            // stage- 4
            {
                $project: {
                    _id: false,
                    book: { title: "$bookinfo.title", isbn: "$bookinfo.isbn" },
                    totalQuantity: "$totalQuantity",
                },
            },
        ]);
        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: data,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Borrowed books summary retrieved failed",
            error: error.message,
        });
    }
});
exports.borrowedbookssummary = borrowedbookssummary;
