import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/database.js";
import userRoute from './routes/userRoute.js';
import messageRoute from  "./routes/messageRoute.js"
import cookieParser from "cookie-parser";
import cors from "cors";
import { app,server } from "./Socket/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
const corsOption = {
  origin: 'http://localhost:5173',
  credentials: true
};
app.use(cors(corsOption));

//whenever we are using router then to use that route we have to use app.use we can say middleware way
app.use("/api/v1/user",userRoute);
app.use("/api/v1/message",messageRoute)


server.listen(PORT,()=>{
  connectDb();
  console.log(`server started at port ${PORT}`)
})