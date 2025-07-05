
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

const allowedOrigins = ['http://localhost:5173','https://magical-kangaroo-1871da.netlify.app/']; // Add more as needed

const corsOptions = {
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Optional, only if you're using cookies
};

app.use(cors(corsOptions));

// book
app.use('/api', bookRouter)
app.use('/api/borrow', borrowRouter)



// books-collection LIbraryDB

app.get('/', (req,res)=>{

    res.send('Library api server running')

})



export default app;






