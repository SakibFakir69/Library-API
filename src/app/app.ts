
import dotenv from "dotenv";
dotenv.config();
import express, { Application ,Request,Response,NextFunction} from 'express';
const app: Application=express();




app.use((req:Request, res:Response,next:NextFunction)=>
{
    console.log("first middleware run", req.method);
    next();
})

// middleware
app.use(express.json());






// books-collection LIbraryDB

app.get('/',async (req,res)=>{

    res.send('<h1>Library api server running</h1>')

})



export default app;






