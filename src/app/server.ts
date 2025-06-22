import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import app from "./app";

const port = process.env.PORT || 5000;
const URI = process.env.MONGODB_URI;

let server;

async function main() {
  if (!URI) {
    return "Enter Your mongoDB uri";
  }

  try {
    await mongoose
      .connect(URI)
      .then(() => console.log("Connected to MongoDB"))
      .catch((err) => console.error("MongoDB connection error:", err));

    server = app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
    console.log("connected to DB");
  } catch (error: any) {
    console.error(error.message);
  }
}

main();
