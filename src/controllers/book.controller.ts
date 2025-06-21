import express, { Request, Response } from "express";

import { z } from "zod";

import { Book } from "../models/book.model";
export const bookRouter = express.Router();

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
  copies: z.number().min(0, "Copies must be a positive number"),
  available: z.boolean().default(true),
});

bookRouter.post("/books", async (req, res) => {
  try {
    const zodValidation = bookpostValidationZod.safeParse(req.body);
    if (!zodValidation.success) {
      return res.status(404).json({
        message: "Validation failed",

        success: false,
        error: zodValidation.error.errors,
      });
    }

    // post saved

    const newBook = await new Book(zodValidation.data);
    await newBook.save();

    return res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: newBook,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Book creation failed",
    });
  }
});

// GET

bookRouter.get("/books", async (req: Request, res: Response) => {
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

    return res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Book data fetch to  failed",
    });
  }
});

// . Get Book by ID

bookRouter.get(
  "/books/:bookId",
  async (req: Request<{ bookId: string }>, res: Response) => {
    try {
      const bookId = req.params.bookId;
      const bookFind = await Book.findById({ _id: bookId });

      if (!bookFind) {
        return res.status(404).json({
          success: false,
          message: "Book retrieved failed",
        });
      }

      //
      return res.status(200).json({
        success: true,
        message: "Book retrieved successfully",
        data: bookFind,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: "Book retrieved failed",
        error: error.message,
      });
    }
  }
);

// PUT /api/books/:bookId

bookRouter.put(
  "/books/:bookId",
  async (req: Request<{ bookId: string }>, res: Response) => {
    try {
      const bookId = req.params.bookId as string;
      const body = req.body;
      const updateDoc = await Book.findByIdAndUpdate(  bookId, body,{
        new:true,
      } );
      if (!updateDoc) {
        return res.status(404).json({
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
      return res.status(500).json({
        success: false,
        message: "Book updated failed",
        error: error.message,
      });
    }
  }
);










// DELETE /api/books/:bookId



bookRouter.delete('/books/:bookId', async(req:Request<{bookId:string}>, res:Response)=>{

  try{

    const bookId = req.params.bookId;
    const bookIdDelete = await Book.findByIdAndDelete(bookId);
    console.log(bookIdDelete);

    if(!bookIdDelete){
      return res.status(500).json({
        "success": false,
  "message": "Book deleted failed",
        
      })
    }

    return res.status(200).json({
      "success": true,
  "message": "Book deleted successfully",
  data:null

    })

  






  }catch(error:any){
    return res.status(500).json({
      success:false,
       "message": "Book deleted failed",
       error: error.message


    })


  }

})





