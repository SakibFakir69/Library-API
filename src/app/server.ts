
import dotenv from 'dotenv'
dotenv.config();
import mongoose from "mongoose";
import app from "./app";

const port = process.env.PORT;
const URI = process.env.MONGODB_URI;

let server;


async function main(){

    if(!URI)
    {
        return "Enter Your mongoDB uri";
    }

    try{
        await mongoose.connect(URI)

        server=app.listen(port, ()=>{
            console.log(`http://localhost:${port}`)

        })
    console.log("connected to DB")
    }catch(error:any){
        console.error(error.message)

    }






}

main();



