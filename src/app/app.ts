
import dotenv from "dotenv";
dotenv.config();

import express, { Application ,Request,Response,NextFunction} from 'express';
const app:Application=express();


import bookRouter from "../routes/book.route";
import borrowRouter from "../routes/borrow.route";


// middleware
app.use(express.json());


// book
app.use('/api/books', bookRouter)
app.use('/api/borrow', borrowRouter)



// books-collection LIbraryDB

app.get('/', (req,res)=>{

    res.send('Library api server running')

})



export default app;






