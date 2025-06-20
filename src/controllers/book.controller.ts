

import express,{Request,Response} from 'express'

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

bookRouter.post("/books",async (req, res) => {

  try {
    const zodValidation =  bookpostValidationZod.safeParse(req.body);
    if (!zodValidation.success) {
      return res.status(404).json({
        message: "Validation failed",

        success: false,
        error: zodValidation.error.errors
      });
    }

    // post saved

    const newBook = await new Book(zodValidation.data);
    await newBook.save();

    return res.status(201).json({
      success:true,
      message:"Book created successfully",
      data:newBook


      

    })
    




  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Book creation failed",
    });
  }
});



