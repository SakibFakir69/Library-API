import type { Request, Response, RequestHandler } from "express";

import { Book } from "../models/book.model";
import { z } from "zod";

const bookpostValidationZod = z.object({
  title: z.string(),
  author: z.string(),
  genre: z.enum([
    "FICTION",
    "NON_FICTION",
    "SCIENCE",
    "HISTORY",
    "BIOGRAPHY",
    "FANTASY",
  ]),
  isbn: z.string(),
  description: z.string(),
  copies: z.number().min(1, "Copies must be a positive number"),
  available: z.boolean().default(true),
});

export const createBook: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const zodValidation = bookpostValidationZod.safeParse(req.body);

    if (!zodValidation.success) {
      res.status(404).json({
        message: "Validation failed",

        success: false,
        error: zodValidation.error.errors,
      });
    } else {
      // post saved

      const newBook = await new Book(zodValidation.data);
      await newBook.save();

      res.status(201).json({
        success: true,
        message: "Book created successfully",
        data: newBook,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Book creation failed",
    });
  }
};

// GET

export const allBooks: RequestHandler = async (req: Request, res: Response) => {
  try {
    const filter = req.query.filter as string;
    /// book?filter="data";
    const sortBy = (req.query.sortBy as string) || "createdAt";
    // book?filter="data"&sortBy="data";
    const sort = req.query.sort === "desc" ? 1 : -1;

    const limit = parseInt(req.query.limit as string) || 10;

    const books = await Book.find()
      .sort({ [sortBy]: sort })
      .limit(limit);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Book data fetch to  failed",
    });
  }
};

// // . Get Book by ID

export const bookbyID: RequestHandler = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const foundBook = await Book.findById({ _id: bookId });

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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Book retrieved failed",
      error: error.message,
    });
  }
};

// // PUT /api/books/:bookId

export const updateBook: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const bookId = req.params.bookId as string;
    const body = req.body;
    const updateDoc = await Book.findByIdAndUpdate(bookId, body, {
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Book updated failed",
      error: error.message,
    });
  }
};

// // DELETE /api/books/:bookId

export const deleteBook: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const bookId = req.params.bookId;
    const bookIdDelete = await Book.findByIdAndDelete(bookId);
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Book deleted failed",
      error: error.message,
    });
  }
};
