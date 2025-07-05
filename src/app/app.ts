
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

const allowedOrigins = ['http://localhost:5173','https://magical-kangaroo-1871da.netlify.app']; 



app.use(cors({
  origin:['http://localhost:5173','https://magical-kangaroo-1871da.netlify.app']
}));

// book
app.use('/api', bookRouter)
app.use('/api/borrow', borrowRouter)



// books-collection LIbraryDB

app.get('/', (req,res)=>{

    res.send('Library api server running')

})



export default app;






