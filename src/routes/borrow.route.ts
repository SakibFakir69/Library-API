
import express from 'express';

const borrowRouter =express.Router();

import { borrowaBook, borrowedbookssummary } from '../controllers/borrow.controller';



// POST /api/borrow

borrowRouter.post('/',borrowaBook);

// GET /api/borrow

borrowRouter.get('/',borrowedbookssummary)




export default borrowRouter;


