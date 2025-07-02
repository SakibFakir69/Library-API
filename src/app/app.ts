
import dotenv from "dotenv";
dotenv.config();

import express, { Application ,Request,Response,NextFunction} from 'express';
const app:Application=express();
import cors from 'cors'

import bookRouter from "../routes/book.route";
import borrowRouter from "../routes/borrow.route";


// middleware
app.use(express.json());

// cors 

app.use(cors());


// book
app.use('/api/books', bookRouter)
app.use('/api/borrow', borrowRouter)



// books-collection LIbraryDB

app.get('/', (req,res)=>{

    res.send('Library api server running')

})



export default app;






