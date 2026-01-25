import express from 'express'
import { createBlog, deleteBlog, getAllBlogs, getAutherBlogs, updateBlog } from '../../controllers/blog.controller.js';
import authenticateToken from '../../middlewares/authenticateToken.js';
import { validate } from '../../middlewares/validation.js';
import { createBlogSchema } from './blog.schema.js';

const blogRouter = express.Router(); 

blogRouter.post('/create-blog',authenticateToken, validate(createBlogSchema) ,createBlog)
blogRouter.get('/get-all-blogs',authenticateToken ,getAllBlogs)
blogRouter.get('/get-auther-blogs', authenticateToken, getAutherBlogs)
blogRouter.put('/update-blog/:blogId', authenticateToken,validate(createBlogSchema), updateBlog)
blogRouter.delete('/delete-blog/:blogId', authenticateToken, deleteBlog)

export default blogRouter;