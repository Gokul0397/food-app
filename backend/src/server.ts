import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from "cors";
import foodRouter from "./routers/food.router";
import userRouter from "./routers/user.router";
import { dbConnect } from './configs/database.config';
import orderRouter from './routers/order.router';
dbConnect();
const app= express();
app.use(express.json());
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

//used to handle to get req from frontend

app.use("/api/foods",foodRouter)
app.use("/api/users",userRouter)
app.use("/api/orders",orderRouter)

const port = 5000; 
//used to listen server port
app.listen( port , ()=>{
    console.log("website served on http://localhost:" + port);
})
