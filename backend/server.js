import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import authRouter from './routes/auth/auth.route.js';
import errorHandler from './middlewares/errorHandler.js';
import blogRouter from './routes/blog/blog.route.js';


dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

//middlewares
app.use(express.json());

// router-level middlewares
app.get('/', (req, res)=>{
    res.send("Server is running!");
})

app.use('/api/auth',authRouter);
app.use('/api/blog',blogRouter)

//error-handling middleware
app.use(errorHandler);


//start server
connectDB().then(()=>{
    app.listen(port, ()=>{
        console.log(`Server is running on: http://localhost:${port}`);
    })   
})


