import express, { Request, RequestHandler, Response } from "express";
import { z } from "zod";
export const borrowRouter = express.Router();

import { Borrow } from "../models/borrow.model";
import { Book } from "../models/book.model";

// add zod

const borrowzodValidation = z.object({
    // book: z.string(),
  quantity: z.number().int().positive(),
  dueDate: z.string().refine(
    (val) => {
      const date = new Date(val);
      return !isNaN(date.getTime()) && date > new Date();
    },
    {
      message:
        "Must be a valid future date in ISO format (YYYY-MM-DD or YYYY-MM-DDTHH:MM:SSZ)",
    }
  ),
});

export const borrowaBook: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const data = borrowzodValidation.safeParse(req.body);

    const {bookId} = req.params;

    if (!data.success) {
      res.status(400).json({
        success: false,
        message: "validation failed",
        error: data.error.format(),
      });
      return;
    }

    const { dueDate, quantity } = data.data;

    const foundedBook = await Book.findById(bookId);
    if (!foundedBook) {
      res.status(400).json({
        success: false,
        message: "book not found",
      });
      return;
    }

    await foundedBook.functionLogic(quantity);

    const borrowData = await new Borrow(data.data);
    await borrowData.save();

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrowData,
    });
  } catch (error:any) {
 
    res.status(500).json({
      success: false,
      message: "Book borrowed failed",
      error: error.message
    });
  }
};

// GET /api/borrow

export const borrowedbookssummary: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const data = await Borrow.aggregate([
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Borrowed books summary retrieved failed",
      error: error.message,
    });
  }
};
