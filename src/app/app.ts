
import dotenv from "dotenv";
dotenv.config();
import express, { Application ,Request,Response,NextFunction} from 'express';
const app: Application=express();


import { bookRouter } from "../controllers/book.controller";
import { borrowRouter } from "../controllers/borrow.controller";


// middleware
app.use(express.json());


// book
app.use('/api', bookRouter)
app.use('/api', borrowRouter)



// books-collection LIbraryDB

app.get('/',async (req,res)=>{

    res.send('<h1>Library api server running</h1>')

})



export default app;






