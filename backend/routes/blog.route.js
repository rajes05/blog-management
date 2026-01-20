import express from 'express';
import { getAllUser } from '../controllers/blog.controller.js';
const blogRouter = express.Router();

blogRouter.get('/get',getAllUser)

export default blogRouter;