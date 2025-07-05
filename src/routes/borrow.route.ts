
import express from 'express';

const borrowRouter =express.Router();

import { borrowaBook, borrowedbookssummary } from '../controllers/borrow.controller';



// POST /api/borrow

borrowRouter.post('/borrow/:bookId',borrowaBook);

// GET /api/borrow

borrowRouter.get('/borrow-summary',borrowedbookssummary)




export default borrowRouter;


