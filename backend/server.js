import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import blogRouter from './routes/blog.route.js';


dotenv.config();
const port = process.env.PORT || 5000;
const app = express();

//middlewares
app.use(express.json())

// router-level middlewares
app.get('/', (req, res)=>{
    res.send("Server is running!");
})

app.use('/api/blog',blogRouter);


//start server
connectDB().then(()=>{
    app.listen(port, ()=>{
        console.log(`Server is running on: http://localhost:${port}`);
    })   
})


