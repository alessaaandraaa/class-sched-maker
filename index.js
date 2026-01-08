import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

dotenv.config();
const port = 3000;

const app = express();

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Connected to DB");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => {
    console.log("Failed to connect.");
  });
