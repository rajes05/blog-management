import express from 'express'
import { createBlog, getAllBlogs } from '../controllers/blog.controller.js';
import authenticateToken from '../middlewares/authenticateToken.js';

const blogRouter = express.Router(); 

blogRouter.post('/create-blog',authenticateToken,createBlog)
blogRouter.get('/get-all-blogs', getAllBlogs)

export default blogRouter;